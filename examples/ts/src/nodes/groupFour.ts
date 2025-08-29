import { Pixi, BaseNode, type Node } from "@graphicle/base";

const RADIUS = 20;

export class GroupFourNode extends BaseNode {
  constructor(node: Node) {
    super(node);
  }

  initGraphics() {
    super.initGraphics();
    const circle = new Pixi.Graphics()
      .circle(0 + RADIUS, 0 + RADIUS, RADIUS)
      .fill("yellow");
    circle.label = "shape";

    this.width = RADIUS * 2;
    this.height = RADIUS * 2;
    this.addChild(circle);

    super.attachLabel();
  }

  //   override getCenter(): XYPosition {
  //     return { x: 0, y: 0 };
  //   }
}
