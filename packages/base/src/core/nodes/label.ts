import { Text, TextStyle } from "pixi.js";

class Label extends Text {
  constructor(text: string, style?: TextStyle) {
    super({
      text,
      style: {
        fill: "black",
        fontSize: 12,
        fontFamily: "MyFont",
        ...style,
      },

      anchor: 0.5,
    });
    this.resolution = 4;
  }
}

export default Label;
