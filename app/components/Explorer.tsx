/** @jsx h */
import { h } from "../deps.ts";
import { Button } from "./Button.tsx";
import { Divider } from "./Divider.tsx";

export function Explorer() {
  return (
    <div id="explorer">
      <div class="file">
        <Button label="New" />
        <Button label="Open" />
        <Button label="Export" />
      </div>
      <Divider />
      <div class="project">
        <span class="bold">Project:</span>
        <span id="project-name">None</span>
        <br />
        <span class="bold">Band:</span>
        <span id="project-band">None</span>
      </div>
      <Divider />
      <div class="options">
        <span class="header bold">Options</span>
      </div>
    </div>
  );
}
