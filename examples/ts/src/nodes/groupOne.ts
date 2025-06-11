import { Pixi, BaseNode, type Node } from "@graphicle/base";

const RADIUS = 20;

export class GroupOneNode extends BaseNode {
  constructor(node: Node) {
    super(node);
  }

  initGraphics() {
    super.initGraphics();
    const circle = new Pixi.Graphics()
      .circle(0 + RADIUS, 0 + RADIUS, RADIUS)
      .fill("green");
    this.width = RADIUS * 2;
    this.height = RADIUS * 2;
    this.addChild(circle);
  }

  //   override getCenter(): XYPosition {
  //     return { x: 0, y: 0 };
  //   }
}
