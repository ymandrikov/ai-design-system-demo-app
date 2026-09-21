import { createCn } from "cn/config";

// Teach the merger the additional semantic size names.
export const cn = createCn({
  extend: {
    theme: {
      text: ["md"],
      spacing: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "control",
        "icon",
        "badge",
        "table-header",
        "option",
      ],
      container: ["dialog", "page-narrow", "page-wide", "table"],
    },
  },
});
