import { Text } from "pixi.js";

class Label extends Text {
  constructor(text: string) {
    super({
      text,
      style: {
        fill: "black",
        fontSize: 12,
        fontFamily: "MyFont",
      },

      anchor: 0.5,
    });
    this.resolution = 4;
  }
}

export default Label;
