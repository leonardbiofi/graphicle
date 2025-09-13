import { BaseNode, type Node, Pixi } from "@graphicle/base";
import { ObservableStyle } from "../observableStyle";
import { ReactiveStyleMixin } from "../mixin";

class CircleNode extends BaseNode {
  styleStore!: ObservableStyle<any>; // Will be injected later

  constructor(node: Node) {
    super(node); // Pass nodeData to the BaseNode constructor
    // this.initGraphics();
    // this.render();
  }

  initGraphics() {
    super.initGraphics();
    const circle = new Pixi.Graphics();
    const { radius, fillColor } = this.styleStore.get();
    circle.circle(0 + radius, 0 + radius, radius);
    circle.fill(fillColor);
    circle.label = "circle";
    this.addChild(circle);
  }

  renderSelected() {
    const { selected } = this.node;
    const circle = this.getChildByLabel("circle") as Pixi.Graphics;
    const { radius, fillColor } = this.styleStore.get();
    if (!circle) return;
    circle.clear();
    circle.circle(0 + radius, 0 + radius, radius);
    if (selected) circle.fill("#0084d1");
    else circle.fill(fillColor);
  }
}

export const circleStyle = {
  fillColor: "#f4f4f5",
  lineWidth: 2,
  lineColor: 0x000000,
  radius: 20,
};

export function createCircleNodeClass<TStyle extends object>(
  style: ObservableStyle<TStyle>
) {
  return ReactiveStyleMixin(CircleNode, style);
}
