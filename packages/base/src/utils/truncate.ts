import { CanvasTextMetrics, TextStyle } from "pixi.js";

export const truncateTextToFit = (
  text: string,
  style: TextStyle,
  maxWidth: number
): string => {
  const measure = (t: string) => CanvasTextMetrics.measureText(t, style).width;

  if (measure(text) <= maxWidth) return text;

  const ellipsis = "...";
  let truncated = text;

  while (truncated.length > 0) {
    truncated = truncated.slice(0, -1);
    if (measure(truncated + ellipsis) <= maxWidth) {
      return truncated + ellipsis;
    }
  }

  return ellipsis;
};
