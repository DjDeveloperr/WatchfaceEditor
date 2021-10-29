export let ident = 0;

export const hex = (n: number | bigint) =>
  "0x" + n.toString(16).padStart(2, "0").toUpperCase();

export const trace = (...args: any[]) =>
  globalThis.Deno?.env.get("TRACE") === "1" && console.log(
    "[Trace]" +
      "  ".repeat(ident),
    ...args.map((e) => {
      return typeof e === "number" || typeof e === "bigint"
        ? `${e} (${hex(e)})`
        : e;
    }),
  );

export const incrIdent = (by: number = 1) => ident += by;

export const decrIdent = (by: number = 1) => ident -= by;
