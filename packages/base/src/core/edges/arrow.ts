import { Sprite, Assets } from "pixi.js";
import arrowSVG from "./arrow.svg?url";
const texture = await Assets.load(arrowSVG);

export default class ArrowSprite extends Sprite {
  constructor() {
    super(texture);
  }
}
