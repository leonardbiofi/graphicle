import * as d3Chromatic from "d3-scale-chromatic";

export function createColorPicker(
  scheme: readonly string[] = d3Chromatic.schemeCategory10
) {
  let availableColors = [...scheme];

  return function pickColor() {
    if (availableColors.length === 0) {
      // Reset the pool once all colors have been picked
      availableColors = [...scheme];
    }
    // Pick a random index from the remaining colors
    const idx = Math.floor(Math.random() * availableColors.length);
    // Remove the chosen color from the pool so it won't repeat
    const color = availableColors.splice(idx, 1)[0];
    return color;
  };
}
