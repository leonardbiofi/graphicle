import { Edge, NodeGfx } from "../types";
import BaseEdge from "./base";
import { Sprite, Texture } from "pixi.js";
import ArrowSprite from "./arrow";
export default class StraightEdge extends BaseEdge {
  constructor(edge: Edge, srcNodeGfx: NodeGfx, tgtNodeGfx: NodeGfx) {
    super(edge, srcNodeGfx, tgtNodeGfx);
    // this.rotation = 0;
    // this.height = 0; // length
  }

  initGraphics(): void {
    super.initGraphics();
    // this.attachMarkerEnd();
  }

  render() {
    // // @ts-ignore
    // const sourceNodeCenter = this.srcNodeGfx.getCenter();
    // // @ts-ignore
    // const targetNodeCenter = this.tgtNodeGfx.getCenter();
    const { x: tx, y: ty } = this.tgtNodeGfx.getCenter();
    const { x: sx, y: sy } = this.srcNodeGfx.getCenter();
    // this.x = sourceNodeCenter.x;
    // this.y = sourceNodeCenter.y;
    this.x = (sx + tx) / 2;
    this.y = (sy + ty) / 2;
    const length = Math.hypot(tx - sx, ty - sy);
    const rotation = -Math.atan2(tx - sx, ty - sy);
    const adjustedLength = length - 20 * 2;
    this.rotation = rotation;

    let line = this.getChildByLabel("line") as Sprite;
    if (!line) {
      line = new Sprite(Texture.WHITE);
      line.tint = "grey";
      line.label = "line";
      line.anchor.set(0.5);
      this.addChild(line);
    }
    line.width = 1;
    line.height = adjustedLength;

    // Render markerend
    let markerEnd = this.getChildByLabel("markerEnd") as Sprite;

    if (!markerEnd) {
      markerEnd = new ArrowSprite();
      markerEnd.anchor.set(0.5, 0.5);
      markerEnd.scale.set(0.4);
      markerEnd.label = "markerEnd";
      this.addChild(markerEnd);
    }
    markerEnd.position.set(0, (adjustedLength - 4) / 2); // since container is centered

    // line.tint = "red";
    // const line = new Graphics()
    //   .moveTo(0, 0)
    //   .lineTo(targetNodeCenter.x - this.x, targetNodeCenter.y - this.y)
    //   .stroke({ color: 0xff0000, width: 3 });
    // line.label = "line";
  }
}
