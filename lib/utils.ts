import { createCn } from "cn/config";

// Register the semantic scales so text sizes cannot be mistaken for colours.
export const cn = createCn({
  extend: {
    theme: {
      text: ["s", "m", "l"],
      spacing: [
        "xs",
        "s",
        "m",
        "l",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "control-xs",
        "control-s",
        "control-m",
        "control-l",
        "icon-s",
        "icon-m",
        "icon-l",
        "badge-height",
        "table-header-height",
        "option-min-height",
      ],
      container: ["dialog-width", "page-narrow", "page-wide", "table-min-width"],
      radius: ["m"],
      shadow: ["s", "l"],
    },
  },
});
