/** @jsx h */
import { App } from "../components/App.tsx";
import { Editor } from "../components/Editor.tsx";
import { h } from "../deps.ts";

export function Index() {
  return (
    <App title="Watchface Editor">
      <Editor />
    </App>
  );
}
