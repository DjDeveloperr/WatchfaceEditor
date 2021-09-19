import { mapParams, totalParamSize } from "./params.ts";
import { decrIdent, incrIdent, trace } from "./logger.ts";
import {
  BandType,
  Color,
  Param,
  ParamFlag,
  ParamTable,
  ParsedParam,
  ParsedResource,
  ParsedWatchface,
  ResourceType,
  SIGN_SIZE,
  SIGN_STRING,
} from "./types.ts";
import { assertEquals, assertExists } from "./deps.ts";

class WatchfaceParser {
  #bin: Uint8Array;
  #view: DataView;
  #offset: number;

  constructor(bin: Uint8Array) {
    this.#bin = bin;
    this.#view = new DataView(bin.buffer);
    this.#offset = 0;
  }

  #readCString() {
    let str = "";
    let byte;
    while ((byte = this.#bin[this.#offset++]) != 0) {
      str += String.fromCharCode(byte);
    }
    return str;
  }

  parse(): ParsedWatchface {
    trace("Start Parsing");
    const header = this.parseHeader();
    trace("Parsed Header.");
    trace("  Sign:", header.sign);
    trace("  ParamSIze:", header.paramsSize);
    trace("  Band:", BandType[header.band]);

    trace("Parsing Param (Descriptor) List, Offset:", this.#offset);
    incrIdent();
    const params = this.parseParamList(BigInt(header.paramsSize));
    decrIdent();
    trace("Parsed! Offset:", this.#offset);

    const mainParam = params.find((e) => e.id === 1)!;
    const paramTableLength = mainParam.children.find((e) => e.id === 1)!.value;
    const resourceCount = mainParam.children.find((e) => e.id === 2)!.value;

    trace("Param Table Length:", paramTableLength);
    trace("Resource Count:", resourceCount);

    const table: ParamTable = {};

    const storedOffset = this.#offset;
    trace("Store Offset:", storedOffset);

    const storedBin = this.#bin;

    const tableBuffer = storedBin.subarray(
      storedOffset,
      storedOffset + Number(paramTableLength),
    );

    this.#bin = tableBuffer;
    this.#view = new DataView(
      storedBin.buffer,
      storedOffset,
      storedOffset + Number(paramTableLength),
    );
    this.#offset = 0;

    for (const param of params) {
      if (param.id === mainParam.id) continue;

      trace(
        "Parse Table of Descriptor",
        param.id,
        "and Offset:",
        this.#offset,
        " and Real:",
        storedOffset + this.#offset,
      );

      const offset = Number(param.children.find((e) => e.id === 1)!.value);
      const size = param.children.find((e) => e.id === 2)!.value;

      trace("  Offset:", offset);
      trace("  Size:", size);

      incrIdent();
      table[param.id] = this.parseParamList(size);
      decrIdent();

      trace("Parsed Table! Offset:", this.#offset);
    }

    this.#offset = storedOffset + Number(paramTableLength);
    this.#bin = storedBin;
    this.#view = new DataView(this.#bin.buffer);

    trace("Parsing Resource Offsets... Current Offset:", this.#offset);
    const resourceOffsets = [];
    for (let i = 0; i < resourceCount; i++) {
      const offset = this.#view.getUint32(this.#offset, true);
      resourceOffsets.push(offset);
      trace("Resource Offset for", i, "is", offset);
      this.#offset += 4;
    }

    const resources = [];

    trace("Parsing Resources... Offset:", this.#offset);
    let totalSize = 0;
    for (let i = 0; i < resourceCount; i++) {
      const currOffset = this.#offset;
      resources.push(this.parseResource(i));
      const size = this.#offset - currOffset;
      assertEquals(totalSize, resourceOffsets[i]);
      totalSize += size;
    }

    return {
      band: header.band,
      params: mapParams(table),
      resources,
    };
  }

  sign!: string;
  paramsSize!: number;
  band!: BandType;

  parseHeader() {
    const sign = this.#readCString();
    if (sign === "UIHH\x01") {
      // Ignore that area (in Band 5 and 6)
      this.#offset = 0x4F;
    } else {
      // It should be band 4
      assertEquals(sign, SIGN_STRING);
      const restSignAreaLength = SIGN_SIZE - (sign.length + 1);
      const restSignArea = new Uint8Array(
        this.#bin.buffer,
        this.#offset,
        restSignAreaLength,
      );
      assertEquals(restSignArea.every((v) => v === 0xFF), true);
      this.#offset += restSignAreaLength;
    }

    const band = this.#view.getUint32(this.#offset, true);
    this.#offset += 4;

    const paramsSize = this.#view.getUint32(this.#offset, true);
    this.#offset += 4;

    this.sign = sign;
    this.paramsSize = paramsSize;
    this.band = band;

    return {
      sign,
      band,
      paramsSize,
    };
  }

  parseParam(): ParsedParam {
    trace("Parse Param. Offset:", this.#offset);

    const byte = this.#bin[this.#offset++];
    trace("  Raw ID:", byte);

    const id = (byte & 0xF8) >> 3;
    if (id < 1) {
      throw new Error(
        "Invalid parameter. Offset: " + this.#offset.toString(16),
      );
    }
    trace("  ID:", id);

    const flags = byte & 7;
    trace("  Flags:", flags);

    let size = 1;
    let value = 0n;
    let i = this.#bin[this.#offset++];
    let offset = 0;
    let children: Param[] = [];

    // Value is encoded in some weird way (Idk if there's some name for that)
    // So you keep reading bytes until it's first bit is 0
    // First bit tells whether the next byte is to be included
    // in the value or not. Rest 7 bits are the value.
    while ((i & 0x80) > 0) {
      if (size > 9) throw new Error("Invalid parameter value");
      value |= BigInt(i & 0x7F) << BigInt(offset);
      i = this.#bin[this.#offset++];
      offset += 7;
      size++;
    }

    value |= BigInt(i & 0x7F) << BigInt(offset);
    size++;

    trace("  Value:", value);

    if ((flags & ParamFlag.HAS_CHILDREN) === ParamFlag.HAS_CHILDREN) {
      trace("Has Children. Parsing");
      incrIdent();
      children = this.parseParamList(value);
      decrIdent();
    }

    trace("Parsed Param! Offset:", this.#offset);

    return {
      id,
      flags,
      size,
      value,
      children,
    };
  }

  parseParamList(size: bigint) {
    const params: Param[] = [];
    let paramSizeAcum = 0n;
    while (paramSizeAcum < size) {
      const param = this.parseParam();
      params.push(param);
      paramSizeAcum += totalParamSize(param);
    }
    return params;
  }

  parseResource(id: number): ParsedResource {
    const sign = new TextDecoder().decode(
      this.#bin.subarray(this.#offset, this.#offset + 2),
    );
    assertEquals(sign, "BM");
    this.#offset += 2;

    // Skip 2
    this.#offset += 2;

    const header = this.parseResourceHeader();

    let palette: Color[] | undefined;

    if (header.paletteColors > 0) {
      palette = [];
      for (let i = 0; i < header.paletteColors; i++) {
        const r = this.#view.getUint8(this.#offset++);
        const g = this.#view.getUint8(this.#offset++);
        const b = this.#view.getUint8(this.#offset++);
        this.#offset++; // pad

        palette.push({
          r,
          g,
          b,
          a: (header.transparency > 0) && i == 0 ? 0 : 255,
        });
      }
    }

    let data: Uint8Array;

    if (header.type === ResourceType.PALETTE) {
      assertExists(palette);
      data = new Uint8Array(header.width * header.height * 4);
      trace("Start Reading Palette Image at:", this.#offset);
      for (let y = 0; y < header.height; y++) {
        for (let x = 0; x < header.width; x++) {
          const idx = this.#view.getUint8(this.#offset);
          const color = palette[idx];
          if (color === undefined) {
            throw new Error(
              `Expected palette color at index ${idx} but palette has ${palette.length} elements. Offset: ${this.#offset}, X: ${x}, Y: ${y}`,
            );
          }
          this.#offset++;
          data.set(
            [color.r, color.g, color.b, color.a],
            (y * header.width + x) * 4,
          );
        }
      }
    } else if (header.type === ResourceType.BIT_8) {
      data = new Uint8Array(header.width * header.height * 4);
      for (let y = 0; y < header.height; y++) {
        for (let x = 0; x < header.width; x++) {
          const color = this.#view.getUint8(this.#offset++);
          data.set(
            [color, color, color, 255],
            (y * header.width + x) * 4,
          );
        }
      }
    } else if (header.type === ResourceType.BIT_16) {
      data = new Uint8Array(header.width * header.height * 4);
      for (let y = 0; y < header.height; y++) {
        for (let x = 0; x < header.width; x++) {
          const first = this.#view.getUint8(this.#offset++);
          const second = this.#view.getUint8(this.#offset++);

          // GGGRRRRRBBBBBGGG
          const r = ((first & 0b11111)) << 3;
          const g = (((first >> 5 & 0b111) | (second & 0b111) << 3)) << 2;
          const b = ((second >> 3 & 31)) << 3;

          data.set(
            [r, g, b, 255],
            (y * header.width + x) * 4,
          );
        }
      }
    } else if (header.type === ResourceType.BIT_24) {
      data = new Uint8Array(header.width * header.height * 4);
      for (let y = 0; y < header.height; y++) {
        for (let x = 0; x < header.width; x++) {
          const a = this.#view.getUint8(this.#offset++);
          const first = this.#view.getUint8(this.#offset++).toString(2)
            .padStart(8, "0");
          const second = this.#view.getUint8(this.#offset++).toString(2)
            .padStart(8, "0");
          const bits = first + second;

          const b = parseInt(bits.substr(0, 5), 2) << 3;
          const g = parseInt(bits.substr(5, 6), 2) << 2;
          const r = parseInt(bits.substr(11, 5), 2) << 3;

          data.set(
            [r, g, b, 255 - a],
            (y * header.width + x) * 4,
          );
        }
      }
    } else if (header.type === ResourceType.BIT_32) {
      data = new Uint8Array(header.width * header.height * 4);
      for (let y = 0; y < header.height; y++) {
        for (let x = 0; x < header.width; x++) {
          const a = this.#view.getUint8(this.#offset++) & 0xff;
          const r = this.#view.getUint8(this.#offset++) & 0xff;
          const g = this.#view.getUint8(this.#offset++) & 0xff;
          const b = this.#view.getUint8(this.#offset++) & 0xff;

          data.set(
            [r, g, b, 255 - a],
            (y * header.width + x) * 4,
          );
        }
      }
    } else throw new Error("unreachable");

    return {
      id,
      ...header,
      palette,
      data,
    };
  }

  parseResourceHeader() {
    const width = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;

    const height = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;

    const rowLength = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;

    const bitsPerPixel = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;

    const paletteColors = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;
    assertEquals(paletteColors <= 256, true);

    const transparency = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;

    let type;
    if (paletteColors > 0) {
      type = ResourceType.PALETTE;
    } else {
      switch (bitsPerPixel) {
        case 8:
          type = ResourceType.BIT_8;
          break;

        case 16:
          type = ResourceType.BIT_16;
          break;

        case 24:
          type = ResourceType.BIT_24;
          break;

        case 32:
          type = ResourceType.BIT_32;
          break;

        default:
          throw new Error("Invalid resource type");
      }
    }

    trace("Parse Resource Header");
    trace("  Type:", type);
    trace("  Width:", width);
    trace("  Height:", height);
    trace("  Row Length:", rowLength);
    trace("  Bits Per Pixel:", bitsPerPixel);
    trace("  Palette Colors:", paletteColors);
    trace("  Transparency:", transparency);

    return {
      type,
      width,
      height,
      rowLength,
      bitsPerPixel,
      paletteColors,
      transparency,
    };
  }
}

export function parse(buffer: Uint8Array) {
  return new WatchfaceParser(buffer).parse();
}
