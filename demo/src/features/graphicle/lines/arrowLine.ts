import {
  BaseEdge,
  type Edge,
  type NodeGfx,
  ArrowSprite,
  Pixi,
} from "@graphicle/base";
import { ObservableStyle } from "../observableStyle";
import { ReactiveStyleMixin } from "../mixin";

class ArrowLineEdge extends BaseEdge {
  styleStore!: ObservableStyle<any>; // Will be injected later

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

    let line = this.getChildByLabel("line") as Pixi.Sprite;
    if (!line) {
      line = new Pixi.Sprite(Pixi.Texture.WHITE);

      line.label = "line";
      line.anchor.set(0.5);
      this.addChild(line);
    }
    const { lineWidth, tintColor } = this.styleStore.get();
    line.tint = tintColor;
    line.width = lineWidth;

    line.height = adjustedLength;

    // Render markerend
    let markerEnd = this.getChildByLabel("markerEnd") as Pixi.Sprite;

    if (!markerEnd) {
      markerEnd = new ArrowSprite();
      markerEnd.anchor.set(0.5, 0.5);
      markerEnd.scale.set(0.4);
      markerEnd.label = "markerEnd";
      this.addChild(markerEnd);
    }
    markerEnd.tint = tintColor;
    markerEnd.position.set(0, (adjustedLength - 4) / 2); // since container is centered
  }
}

export const arrowLineStyle = {
  tintColor: "#575757",
  lineWidth: 2,
};

export function createArrowLineClass<TStyle extends object>(
  style: ObservableStyle<TStyle>
) {
  return ReactiveStyleMixin(ArrowLineEdge, style);
}
