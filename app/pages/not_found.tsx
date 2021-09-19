/** @jsx h */
import { App } from "../components/App.tsx";
import { h } from "../deps.ts";

export function NotFound() {
  return (
    <App title="404 - Not Found">
      <h1>Page could not be found.</h1>
    </App>
  );
}
