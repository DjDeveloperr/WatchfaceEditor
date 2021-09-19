/** @jsx h */
import { h, renderToString, VNode } from "./deps.ts";
import { Index } from "./pages/index.tsx";
import { NotFound } from "./pages/not_found.tsx";

addEventListener("fetch", async (evt) => {
  const request = (evt as any).request as Request;
  const respond = (res: Response) => (evt as any).respondWith(res);

  const respondText = (text: string, ctype: string = "text/plain") =>
    respond(
      new Response(text, {
        headers: { "content-type": ctype },
      }),
    );

  const respondJSX = (element: VNode) =>
    respondText(renderToString(element), "text/html; charset=UTF-8");
  const respondCSS = (css: string) => respondText(css, "text/css");
  const respondJS = (js: string) => respondText(js, "application/javascript");

  const path = new URL(request.url).pathname;

  switch (path) {
    case "/": {
      respondJSX(<Index />);
      break;
    }

    case "/style.css": {
      respondCSS(await Deno.readTextFile("./app/static/style.css"));
      break;
    }

    case "/bundle.js": {
      respondJS(await Deno.readTextFile("./app/static/bundle.js"));
      break;
    }

    default: {
      respondJSX(<NotFound />);
      break;
    }
  }
});
