import { assertEquals } from "./deps.ts";
import { decrIdent, incrIdent, trace } from "./logger.ts";
import { reverseMapParams } from "./params.ts";
import {
  BandType,
  Color,
  Param,
  ParamFlag,
  Resource,
  ResourceType,
  SIGN_SIZE,
  SIGN_STRING,
  Watchface,
} from "./types.ts";

interface WritableParam {
  id: number;
  value?: bigint;
  children?: WritableParam[];
}

class Writer extends Array<number> {
  writeCString(str: string) {
    this.push(...new TextEncoder().encode(str), 0);
    return str.length + 1;
  }

  writeUint32LE(value: number) {
    this.push(
      value & 0xff,
      (value >> 8) & 0xff,
      (value >> 16) & 0xff,
      (value >> 24) & 0xff,
    );
    return 4;
  }

  writeUint16LE(value: number) {
    this.push(
      value & 0xff,
      (value >> 8) & 0xff,
    );
    return 2;
  }

  writeHeader(paramSize: number, band: BandType) {
    trace("Writing Header");
    if (band === BandType.BAND_4) {
      const written = this.writeCString(SIGN_STRING);
      for (let i = 0; i < (SIGN_SIZE - written); i++) this.push(0xFF);
    } else if (band === BandType.BAND_6 || band === BandType.BAND_5) {
      // deno-fmt-ignore
      const header = new Uint8Array([
        0x55, 0x49, 0x48, 0x48, 0x01, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        // bytes followed by 0x01 have
        // this format in band 5:
        // 11 0D 3D 00 3D 00 and four random bytes?
        // below format in band 6:
        //    |---------| <-       random?     -> |--------|
        0x01, 0xE4, 0x99, 0x3E, 0x00, 0x3E, 0x00, 0xD1, 0xAF, 0x00, 0x00, 
        // first four bytes in this line
        // are 1F 22 11 00 in case of Band 6
        //  or E0 7F 05 00 in case of Band 5 
        0x1F, 0x22, 0x11, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF,
      ]);

      if (band === BandType.BAND_5) {
        header.set([0x11, 0x0D, 0x3D, 0x00, 0x3D, 0x00], 12);
        const randomBytes = new Uint8Array(4);
        crypto.getRandomValues(randomBytes);
        header.set(randomBytes, 18);
        header.set([0xE0, 0x7F, 0x05, 0x00], 22);
      } else if (band === BandType.BAND_6) {
        const randomBytes1 = new Uint8Array(2);
        const randomBytes2 = new Uint8Array(2);
        crypto.getRandomValues(randomBytes1);
        crypto.getRandomValues(randomBytes2);
        header.set(randomBytes1, 12);
        header.set(randomBytes2, 18);
      }

      this.push(...header);
    } else throw new Error(`Invalid Band Type: ${band}`);
    trace("  Band:", BandType[band]);
    this.writeUint32LE(band);
    trace("  Param Size:", paramSize);
    this.writeUint32LE(paramSize);
  }

  writeParam({ id, value, children }: WritableParam) {
    trace("Write Param, curent offset:", this.length);
    trace("  ID:", id);
    trace("  Value:", value);
    const flags = children && children.length
      ? ParamFlag.HAS_CHILDREN
      : ParamFlag.NONE;
    const rawID = (id << 3) | flags;
    trace("  Raw ID:", rawID);

    this.push(rawID);
    let size = 1;

    if (children && children.length) {
      const cw = new Writer();
      trace("Writing Children");
      incrIdent();
      let childsize = 0;
      for (const child of children) {
        childsize += cw.writeParam(child);
      }
      decrIdent();
      trace("Written Children! Size:", size);
      size += this.writeParamValue(BigInt(childsize));
      this.push(...cw);
      size += childsize;
    } else if (value !== undefined) {
      const valsize = this.writeParamValue(value);
      size += valsize;
      trace("  Value Size:", valsize);
    } else {
      throw new Error("Invalid param " + Deno.inspect({ id, value, children }));
    }

    return size;
  }

  writeParamValue(value: bigint) {
    let size = 0;
    let byte;

    while (value >= 128n) {
      byte = Number(((value & 0x7Fn) | 0x80n));
      this.push(byte);
      size++;
      value >>= 7n;
    }

    byte = Number(value & 0x7Fn);
    this.push(byte);
    size++;

    return size;
  }

  writeResource(res: Resource) {
    trace("Write Resource");
    let size = 0;

    // Sign
    this.push(...new TextEncoder().encode("BM"));
    size += 2;

    // Unknown
    this.push(100, 0);
    size += 2;

    size += this.writeUint16LE(res.width);
    size += this.writeUint16LE(res.height);

    trace("  Width:", res.width);
    trace("  Height:", res.height);

    const { type, bits, palette, transparency } = this.getResourceInfo(
      res.data,
      res.height,
      res.width,
    );

    size += this.writeUint16LE(res.width * bits / 8);
    size += this.writeUint16LE(bits);
    size += this.writeUint16LE(palette?.length ?? 0);
    size += this.writeUint16LE(transparency);

    trace("  Bits:", bits);
    trace("  Palette:", palette?.length ?? 0);
    trace("  Transparency:", transparency);

    if (palette && palette.length) {
      for (const _ in palette) {
        const i = Number(_);
        const c = palette[i];
        this.push(c.r, c.g, c.b, 0);
        size += 4;
      }
    }

    switch (type) {
      case ResourceType.BIT_8:
        for (let i = 0; i < res.data.length; i += 4) {
          this.push(res.data[i]);
          size++;
        }
        break;

      case ResourceType.BIT_16:
        for (let i = 0; i < res.data.length; i += 4) {
          const r = res.data[i];
          const g = res.data[i + 1];
          const b = res.data[i + 2];

          const b1 = r >> 3 << 3;
          const b2 = g >> 2 << 2;
          const b3 = b >> 3 << 3;
          const byte1 = (((b3 >> 3) & 0x1F) << 3) | ((b2 >> 5) & 7);
          const byte2 = (b2 << 3) | ((b1 >> 3) & 0x1);

          this.push(byte1, byte2);
          size += 2;
        }
        break;

      case ResourceType.BIT_24:
        for (let i = 0; i < res.data.length; i += 4) {
          const r = res.data[i];
          const g = res.data[i + 1];
          const b = res.data[i + 2];
          const a = res.data[i + 3];

          this.push(255 - a);

          const byte1 = (b & 0xF8) | (g & 0xE0) >> 5;
          const byte2 = ((g & 0x1C) << 3) | ((r & 0xF8) >> 3);

          this.push(byte1, byte2);
          size += 3;
        }
        break;

      case ResourceType.BIT_32:
        for (let i = 0; i < res.data.length; i += 4) {
          const r = res.data[i];
          const g = res.data[i + 1];
          const b = res.data[i + 2];
          const a = res.data[i + 3];

          this.push(255 - a, r, g, b);
          size += 4;
        }
        break;

      case ResourceType.PALETTE:
        for (let i = 0; i < res.data.length; i += 4) {
          let r = res.data[i];
          let g = res.data[i + 1];
          let b = res.data[i + 2];
          const a = res.data[i + 3];

          const paletteIndex = palette!.findIndex((e) =>
            e.r === r && e.g === g && e.b === b && e.a === a
          );

          assertEquals(paletteIndex > -1, true);
          this.push(paletteIndex);
          size++;
        }
        break;
    }

    return size;
  }

  /**
   * A function that takes raw image data in format of RGBA
   * and tries to find the best suited format which takes the least space.
   *
   * Possible formats:
   * - Palette: Limited to max 256 colors and only one color with transparency
   * - 8 bit: Limited to only colors which have R = G = B and A = 255
   * - 16 bit: It limits the values of R to 0-31 and G to 0-63 and B to 0-31 and A = 255
   * - 24 bit: It limits the values of R to 0-31 and G to 0-63 and B to 0-31 and A = 0-255
   * - 32 bit: Does not limit the values of R, G, B and A.
   *
   * Format needs to be chosen based on the size each takes such that the total size
   * is as small as possible as the packed file is supposed to be uploaded on embedded
   * devices.
   */
  getResourceInfo(data: Uint8Array, height: number, width: number) {
    assertEquals(data.byteLength % 4, 0);

    const res = {
      type: ResourceType.BIT_32,
      bits: 32,
      transparency: 0,
      palette: <{
        r: number;
        g: number;
        b: number;
        a: number;
        u32: number;
        u24: number;
      }[]> [],
    };

    function addColor(r: number, g: number, b: number, a: number) {
      const u32 = (r << 24) | (g << 16) | (b << 8) | a;
      const u24 = (r << 16) | (g << 8) | b;

      const exists = res.palette.find((c) => c.u32 === u32);
      const exists24 = res.palette.find((c) => c.u24 === u24);

      const color = { r, g, b, a, u32, u24 };
      if (!exists) res.palette.push(color);

      return { exists, exists24, ...color };
    }

    for (let i = 0; i < data.byteLength; i += 4) {
      addColor(
        data[i],
        data[i + 1],
        data[i + 2],
        data[i + 3],
      );
    }

    const pixels = width * height;

    const possible = [
      {
        type: ResourceType.BIT_32,
        bits: 32,
        size: 4 * pixels,
      },
    ];

    const index = res.palette.findIndex((e) => e.a !== 0xFF);
    const bits = this.getPossibleBits(res.palette);

    if (bits.includes(8) && index < 0) {
      possible.push({
        type: ResourceType.BIT_8,
        bits: 8,
        size: pixels,
      });
    }

    if (bits.includes(16) && index < 0) {
      possible.push({
        type: ResourceType.BIT_16,
        bits: 16,
        size: pixels * 2,
      });
    }

    if (bits.includes(24) && index < 0) {
      possible.push({
        type: ResourceType.BIT_24,
        bits: 24,
        size: pixels * 3,
      });
    }

    if (
      res.palette.length <= 256 &&
      res.palette.filter((e) => e.a === 0).length <= 1
    ) {
      possible.push({
        type: ResourceType.PALETTE,
        bits: 8,
        size: (res.palette.length * 4) + pixels,
      });
    }

    possible.sort((a, b) => a.size - b.size);
    const fmt = possible[0];
    res.type = fmt.type;
    res.bits = fmt.bits;

    if (res.type === ResourceType.PALETTE) {
      if (index > -1) {
        const [color] = res.palette.splice(index, 1);
        res.palette.unshift(color);
        res.transparency = 1;
      }
    }

    return {
      type: res.type,
      bits: res.bits,
      transparency: res.transparency,
      palette: res.type === ResourceType.PALETTE
        ? res.palette.map((e) => ({
          r: e.r,
          g: e.g,
          b: e.b,
          a: e.a,
        })) as Color[]
        : undefined,
    };
  }

  getPossibleBits(colors: Color[]) {
    let bit8 = true;
    let bit16 = true;
    let bit24 = true;

    for (const color of colors) {
      if (bit8) {
        if (color.b !== color.g || color.g !== color.r) bit8 = false;
      }

      if (bit16 || bit24) {
        if (
          color.b != (color.b & 0b11111000) ||
          color.r != (color.r & 0b11111000) ||
          color.g != (color.g & 0b11111100)
        ) {
          bit16 = false;
          bit24 = false;
        }
      }
    }

    const bits = [];
    if (bit8) bits.push(8);
    if (bit16) bits.push(16);
    if (bit24) bits.push(24);

    return bits;
  }

  build() {
    return new Uint8Array(this);
  }
}

export function pack(
  { params: mappedParams, resources, band }: Watchface,
) {
  const params = reverseMapParams(mappedParams);

  const data = new Writer();

  const paramDescriptors = new Writer();
  const paramTable = new Writer();

  for (const [id, value] of Object.entries(params) as [string, Param[]][]) {
    let offset = paramTable.length;
    let size = 0;

    trace("Write Param Table for", id);
    incrIdent();
    for (const e of value) {
      const psize = paramTable.writeParam(e);
      trace("Add size", psize);
      size += psize;
    }
    decrIdent();

    trace("Write Param Desc with offset:", offset, "and size:", size);
    paramDescriptors.writeParam({
      id: Number(id),
      children: [
        { id: 1, value: BigInt(offset) },
        { id: 2, value: BigInt(size) },
      ],
    });
  }

  const mainParam = new Writer();
  trace("Write Main Param");
  incrIdent();
  mainParam.writeParam({
    id: 1,
    children: [
      { id: 1, value: BigInt(paramTable.length) },
      { id: 2, value: BigInt(resources.length) },
    ],
  });
  decrIdent();
  trace("Written!");

  data.writeHeader(mainParam.length + paramDescriptors.length, band);

  data.push(...mainParam, ...paramDescriptors);
  data.push(...paramTable);

  const resourceOffsets = new Writer();
  const res = new Writer();

  let offset = 0;
  for (const resource of resources) {
    resourceOffsets.writeUint32LE(offset);
    offset += res.writeResource(resource);
  }

  data.push(...resourceOffsets);

  const u8 = new Uint8Array(data.length + res.length);
  u8.set(data, 0);
  u8.set(res, data.length);

  return u8;
}
