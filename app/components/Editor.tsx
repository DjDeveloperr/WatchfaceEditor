/** @jsx h */
import { h } from "../deps.ts";
import { Explorer } from "./Explorer.tsx";
import { Renderer } from "./Renderer.tsx";
import { Resources } from "./Resources.tsx";

export function Editor() {
  return (
    <div id="editor">
      <Explorer />
      <Renderer />
      <Resources />
    </div>
  );
}
