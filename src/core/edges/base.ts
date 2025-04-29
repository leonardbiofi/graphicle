import { Container, Graphics } from "pixi.js";

import type { XYPosition } from "../../layout/type";
import { Edge, NodeGfx } from "../types";
// const LABEL_FONT_FAMILY = ["Arial", "sans-serif"];

// const textStyle = new TextStyle({
//   fontFamily: LABEL_FONT_FAMILY,
//   fontSize: 8,
//   align: "center",
//   fill: "black",
// });

// const EDGE_WIDTH = 3;
export default class BaseEdge extends Container {
  line: Graphics;
  srcNodeGfx: NodeGfx; // Source node
  tgtNodeGfx: NodeGfx; // Target node
  edge: Edge; // Edge Data

  /** State */
  //   sourcePoint: XYPosition;
  //   targetPoint: XYPosition;
  midCurve: XYPosition;
  //   angleSource: number;
  //   angleTarget: number;
  //   lineAngle: {
  //     source: number;
  //     target: number;
  //   };
  constructor(edge: Edge, srcNodeGfx: NodeGfx, tgtNodeGfx: NodeGfx) {
    super();
    this.edge = edge;
    this.srcNodeGfx = srcNodeGfx;
    this.tgtNodeGfx = tgtNodeGfx;
    this.midCurve = { x: 0, y: 0 };

    // Angle at the source and at target
    // this.angleSource = 0;
    // this.angleTarget = 0;
    // this.lineAngle = { source: 0, target: 0 };

    this.line = new Graphics();
    this.initGraphics();
  }

  initGraphics() {
    // const line = new Graphics();
    // const { x: scx, y: scy } = this.srcNodeGfx.getCenter();
    // const { x: tcx, y: tcy } = this.tgtNodeGfx.getCenter();
    // this.x = scx;
    // this.y = scy;
    this.eventMode = "static";
    this.cullable = true;
    this.interactiveChildren = false;

    // Calculate the line angle

    // line.moveTo(this.coords.isx - scx, this.coords.isy - scy).lineTo(
    //     this.coords.itx - scx,
    //     this.coords.ity - scy
    // );
    // line
    //   .moveTo(this.coords.isx - scx, this.coords.isy - scy)
    //   .bezierCurveTo(
    //     controlSourceX - scx,
    //     controlSourceY - scy,
    //     controlTargetX - scx,
    //     controlTargetY - scy,
    //     this.coords.itx - scx,
    //     this.coords.ity - scy
    //   );
    // line.label = "line";
    // line.stroke({
    //   width: EDGE_WIDTH,
    //   color: this.color,
    //   alpha: 0.8,
    // });

    // this.addChild(line);

    this.attachMarkerEnd();
    this.attachLabel();
  }
  moveRerender() {
    // const {
    //   sourceX: scx,
    //   sourceY: scy,
    //   controlSourceX,
    //   controlSourceY,
    //   controlTargetX,
    //   controlTargetY,
    //   targetX,
    //   targetY,
    //   rotationSource,
    //   rotationTarget,
    // } = this.calculateBezierControls();
    // const [x, y] = getBezierEdgeCenter({
    //   sourceX: scx,
    //   sourceY: scy,
    //   targetX: targetX,
    //   targetY: targetY,
    //   sourceControlX: controlSourceX,
    //   sourceControlY: controlSourceY,
    //   targetControlX: controlTargetX,
    //   targetControlY: controlTargetY,
    // });
    // this.midCurve = { x, y };
    // this.lineAngle = { source: rotationSource, target: rotationTarget };
    // this.x = scx;
    // this.y = scy;
    // // Update line
    // const line = this.getChildByLabel("line")!;
    // // line
    // //     ?.clear()
    // //     .moveTo(this.coords.isx - scx, this.coords.isy - scy)
    // //     .lineTo(this.coords.itx - scx, this.coords.ity - scy);
    // line
    //   ?.clear()
    //   .moveTo(this.coords.isx - scx, this.coords.isy - scy)
    //   .bezierCurveTo(
    //     controlSourceX - scx,
    //     controlSourceY - scy,
    //     controlTargetX - scx,
    //     controlTargetY - scy,
    //     this.coords.itx - scx,
    //     this.coords.ity - scy
    //   );
    // line.stroke({
    //   width: EDGE_WIDTH,
    //   color: this.color,
    //   alpha: 0.8,
    // });
    // this.addChild(line);
    // // Update marker
    // const marker = this.markerEnd;
    // marker.x = this.coords.itx - this.coords.sx;
    // marker.y = this.coords.ity - this.coords.sy;
    // marker.rotation = -this.lineAngle.target;
    // // markerEnd.rotation =
    // //     Math.atan2(
    // //         this.coords.ty - this.coords.sy,
    // //         this.coords.tx - this.coords.sx
    // //     ) +
    // //     3.14 / 2;
    // this.addChild(marker);
    // // Update coefficient label
    // const coefficientLabel = this.getChildByLabel("coefficientLabel");
    // if (coefficientLabel) {
    //   coefficientLabel.x = this.midCurve.x - this.x;
    //   coefficientLabel.y = this.midCurve.y - this.y;
    //   this.addChild(coefficientLabel);
    // }
  }
  attachMarkerEnd() {
    // const texture = this.canvas.app.renderer.generateTexture({
    //   target: arrow,
    //   resolution: 20,
    // });
    // const markerEnd = new Sprite(texture);
    // markerEnd.x = this.coords.itx - this.coords.sx;
    // markerEnd.y = this.coords.ity - this.coords.sy;
    // markerEnd.anchor.set(0.5);
    // markerEnd.scale.set(0.4);
    // markerEnd.rotation = -this.lineAngle.target;
    // markerEnd.label = "markerEnd";
    // this.addChild(markerEnd);
  }

  attachLabel() {
    // const coefficient = this.edgeData?.data?.coefficient;
    // if (!coefficient) return;
    // const coefficientLabel = new Container();
    // coefficientLabel.x = this.midCurve.x - this.x;
    // coefficientLabel.y = this.midCurve.y - this.y;
    // coefficientLabel.label = "coefficientLabel";
    // const circle = new Graphics()
    //   .circle(0, 0, 6)
    //   .fill({ color: "lightgrey", alpha: 1 });
    // coefficientLabel.addChild(circle);
    // const labelGfx = new Container();
    // labelGfx.x = 0;
    // labelGfx.y = 0;
    // const label = new BitmapText({
    //   text: coefficient,
    //   style: textStyle,
    // });
    // label.x = -label.width / 2;
    // label.y = -label.height / 2;
    // labelGfx.addChild(label);
    // coefficientLabel.addChild(labelGfx);
    // this.addChild(coefficientLabel);
  }

  getCoords() {
    // const { cx: sx, cy: sy } = this.srcNode.getCenterCoordinates();
    // const { cx: tx, cy: ty } = this.tgtNode.getCenterCoordinates();
    // const { x: isx, y: isy } = getNodeIntersection(this.srcNode, this.tgtNode);
    // const { x: itx, y: ity } = getNodeIntersection(this.tgtNode, this.srcNode);
    // return {
    //   sx,
    //   sy,
    //   tx,
    //   ty,
    //   isx,
    //   isy,
    //   itx,
    //   ity,
    // };
  }

  //   destroy() {
  //     super.destroy({ children: true });
  //   }
}
