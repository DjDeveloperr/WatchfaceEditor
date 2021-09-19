/** @jsx h */
import { h } from "../deps.ts";
import { Divider } from "./Divider.tsx";

export function RendererOptions() {
  return (
    <div id="renderer-options">
      <span class="header">Render Options</span>
      <Divider />
    </div>
  );
}

export function RendererView() {
  return (
    <div id="renderer-view">
      <canvas id="canvas" width="152" height="486"></canvas>
    </div>
  );
}

export function Renderer() {
  return (
    <div id="renderer">
      <RendererView />
      <RendererOptions />
    </div>
  );
}
