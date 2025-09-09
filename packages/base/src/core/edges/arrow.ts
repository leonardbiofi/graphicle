import { Sprite, Assets } from "pixi.js";
import arrowSVG from "./arrow.svg?url";

export default class ArrowSprite extends Sprite {
  constructor() {
    super();
    Assets.load(arrowSVG).then((texture) => {
      this.texture = texture;
    });
  }
}
