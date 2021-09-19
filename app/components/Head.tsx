/** @jsx h */
import { h } from "../deps.ts";

export interface HeadProps {
  title: string;
}

export function Head({ title }: HeadProps) {
  return (
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
  );
}
