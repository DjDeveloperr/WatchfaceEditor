import { encodePNG } from "./deps.ts";
import { pack } from "./packer.ts";
import { parse } from "./parser.ts";
import { render } from "./render.ts";
import { BandType } from "./types.ts";

const args = [...Deno.args];

switch (args.shift()!) {
  case "unpack": {
    const bin = await Deno.readFile(args.shift()!);
    const wf = parse(bin);
    const out = args.shift()!;

    await Deno.writeTextFile(
      `${out}/meta.json`,
      JSON.stringify(
        wf.params,
        (_, v) =>
          typeof v === "bigint"
            ? String(v)
            : (typeof v === "object" && v !== null
              ? (v instanceof Map ? Object.fromEntries(v) : v)
              : v),
        2,
      ),
    );

    for (const res of wf.resources) {
      // console.log("Writing resource", res.id + "...");
      // console.log(
      //   "  Dims:",
      //   res.width + "x" + res.height,
      //   "(" + res.data.byteLength + ")",
      // );
      // console.log("  Type:", ResourceType[res.type]);
      await Deno.writeFile(
        `${out}/${res.id}.png`,
        encodePNG(res.data, res.width, res.height),
      );
    }

    console.log("Unpacked to", out + "!");
    console.log(`  Band: ${BandType[wf.band]}`);
    console.log(`  Resources: ${wf.resources.length}`);
    break;
  }

  case "repack": {
    const bin = await Deno.readFile(args.shift()!);
    const wf = parse(bin);
    const out = args.shift()!;
    const packed = pack(wf);
    /*const wf2 = */ parse(packed);
    await Deno.writeFile(out, packed);
    const size = packed.byteLength - bin.byteLength;
    console.log(
      `Repacked Watchface! ${size > -1 ? "+" : ""}${
        (size / 1024).toFixed(2)
      } KB`,
    );
    // if (size > -1) {
    //   console.log(
    //     "original",
    //     wf.resources.map((e) => `${e.id}::${ResourceType[e.type]}`),
    //   );
    //   console.log(
    //     "repack",
    //     wf2.resources.map((e) => `${e.id}::${ResourceType[e.type]}`),
    //   );
    // }
  }

  case "pack": {
    break;
  }

  case "info": {
    const bin = await Deno.readFile(args.shift()!);
    const wf = parse(bin);
    console.log("Resources: ", wf.resources.length);
    break;
  }

  case "render": {
    const bin = await Deno.readFile(args.shift()!);
    const wf = parse(bin);
    const data = render(wf);
    await Deno.writeFile(
      args.shift()!,
      encodePNG(data.data, data.width, data.height),
    );
    break;
  }

  default:
    console.log("Invalid sub command! Use help command to know more.");
    break;
}

Deno.exit(0);
