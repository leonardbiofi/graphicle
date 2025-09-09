import { Edge, NodeGfx } from "../types";
import BaseEdge from "./base";
import { Sprite, Texture } from "pixi.js";
// import ArrowSprite from "./arrow";
export default class StraightEdge extends BaseEdge {
  constructor(edge: Edge, srcNodeGfx: NodeGfx, tgtNodeGfx: NodeGfx) {
    super(edge, srcNodeGfx, tgtNodeGfx);
    // this.rotation = 0;
    // this.height = 0; // length
  }

  initGraphics(): void {
    super.initGraphics();
    this.updatePosition();
  }

  attachMarkerEnd() {
    // const markerEnd = new ArrowSprite();
    // const { x: tx, y: ty } = this.tgtNodeGfx.getCenter();
    // const { x: sx, y: sy } = this.srcNodeGfx.getCenter();
    // markerEnd.x = tx - sx;
    // markerEnd.y = ty - sy;
    // markerEnd.anchor.set(0.5);
    // markerEnd.scale.set(0.4);
    // // markerEnd.rotation = -this.lineAngle.target;
    // markerEnd.label = "markerEnd";
    // this.addChild(markerEnd);
  }
  updatePosition() {
    // @ts-ignore
    const sourceNodeCenter = this.srcNodeGfx.getCenter();
    // @ts-ignore
    const targetNodeCenter = this.tgtNodeGfx.getCenter();

    // this.x = sourceNodeCenter.x;
    // this.y = sourceNodeCenter.y;
    this.x = (sourceNodeCenter.x + targetNodeCenter.x) / 2;
    this.y = (sourceNodeCenter.y + targetNodeCenter.y) / 2;

    this.rotation = -Math.atan2(
      targetNodeCenter.x - sourceNodeCenter.x,
      targetNodeCenter.y - sourceNodeCenter.y
    );

    let line = this.getChildByLabel("line") as Sprite;
    if (!line) {
      line = new Sprite(Texture.WHITE);
      line.label = "line";
      line.anchor.set(0.5);
    }
    line.width = 1;
    line.height = Math.hypot(
      targetNodeCenter.x - sourceNodeCenter.x,
      targetNodeCenter.y - sourceNodeCenter.y
    );
    // line.tint = "red";
    // const line = new Graphics()
    //   .moveTo(0, 0)
    //   .lineTo(targetNodeCenter.x - this.x, targetNodeCenter.y - this.y)
    //   .stroke({ color: 0xff0000, width: 3 });
    // line.label = "line";
    this.addChild(line);
  }
}
