import { Edge, NodeGfx } from "../types";
import BaseEdge from "./base";
import { Sprite, Texture, Graphics } from "pixi.js";
export default class StraightEdge extends BaseEdge {
  constructor(edge: Edge, srcNodeGfx: NodeGfx, tgtNodeGfx: NodeGfx) {
    super(edge, srcNodeGfx, tgtNodeGfx);
    // this.rotation = 0;
    // this.height = 0; // length
  }

  initGraphics(): void {
    super.initGraphics();
    // @ts-ignore
    const sourceNodeCenter = this.srcNodeGfx.getCenter();
    // @ts-ignore
    const targetNodeCenter = this.tgtNodeGfx.getCenter();

    this.x = sourceNodeCenter.x;
    this.y = sourceNodeCenter.y;
    // this.x = (sourceNodeCenter.x + targetNodeCenter.x) / 2;
    // this.y = (sourceNodeCenter.y + targetNodeCenter.y) / 2;

    // this.rotation = -Math.atan2(
    //   targetNodeCenter.x - sourceNodeCenter.x,
    //   targetNodeCenter.y - sourceNodeCenter.y
    // );

    // this.height = Math.hypot(
    //   targetNodeCenter.x - sourceNodeCenter.x,
    //   targetNodeCenter.y - sourceNodeCenter.y
    // );
    // const line = new Sprite(Texture.WHITE);
    // line.label = "line";
    // line.anchor.set(0.5);
    // line.width = 3;
    // line.tint = "red";
    const line = new Graphics()
      .moveTo(0, 0)
      .lineTo(targetNodeCenter.x - this.x, targetNodeCenter.y - this.y)
      .stroke({ color: 0xff0000, width: 3 });
    this.addChild(line);
  }
}
