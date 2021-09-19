/** @jsx h */
import { h } from "../deps.ts";
import { Head, HeadProps } from "./Head.tsx";

export interface AppProps extends HeadProps {
  children: any;
}

export function App(props: AppProps) {
  return (
    <html lang="en-US">
      <Head title={props.title} />
      <body>
        {props.children}
        <script src="/bundle.js"></script>
      </body>
    </html>
  );
}
