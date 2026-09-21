import type { CSSProperties } from "react";
import { withDesignSystemException } from "@/lib/with-design-system-exception";

const formats = {
  dateTime: new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }),
  time: new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  }),
};

type TimeProps = {
  value: Date;
  format: "dateTime" | "time";
  showTimeZone?: boolean;
  className?: string;
  style?: CSSProperties;
};

function TimeBase({ value, format, showTimeZone = true, className, style }: TimeProps) {
  return (
    <time dateTime={value.toISOString()} className={className} style={style}>
      {formats[format].format(value)}
      {showTimeZone && " UTC"}
    </time>
  );
}

export const Time = withDesignSystemException(TimeBase);
