import { Assets, Sprite } from "pixi.js";
import filledCircle from "@/assets/circle-32.png";
// const texture = await Assets.load("./filled-circle.png");

class CircleSprite extends Sprite {
  constructor() {
    super();
    Assets.load(filledCircle).then((texture) => {
      this.texture = texture;
    });
  }
}

export default CircleSprite;
