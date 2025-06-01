import { Graphics } from "pixi.js";
import { BaseNode } from "./base";
import type { Node } from "../types";

const RADIUS = 20; // default radius size

export default class DefaultNode extends BaseNode {
  constructor(node: Node) {
    super(node); // Pass nodeData to the BaseNode constructor
  }

  initGraphics() {
    super.initGraphics();
    const circle = new Graphics()
      .circle(0 + RADIUS, 0 + RADIUS, RADIUS)
      .fill("grey");
    this.width = RADIUS * 2;
    this.height = RADIUS * 2;
    this.addChild(circle);
    // this.attachLabel();
  }
}
