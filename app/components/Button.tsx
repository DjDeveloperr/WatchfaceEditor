/** @jsx h */
import { h } from "../deps.ts";

export function Button(
  { icon, iconOnly, label }: {
    iconOnly?: boolean;
    label: string;
    icon?: string;
  },
) {
  return (
    <div class="button" title={label}>
      {icon && <img class="icon" src={icon} alt={label} />}
      {!iconOnly && <span class="label">{label}</span>}
    </div>
  );
}
