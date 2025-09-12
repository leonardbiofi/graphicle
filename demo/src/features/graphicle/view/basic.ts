import { BaseNode, createView, Pixi, type Node } from "@graphicle/base";
import { ObservableStyle } from "../observableStyle";
import { ReactiveStyleMixin } from "../mixin";

export const circleStyle = new ObservableStyle({
  fillColor: "#f4f4f5",
  lineWidth: 2,
  lineColor: 0x000000,
  radius: 20,
});

// Create a reactive subclass using the mixin
const ReactiveCircleNode = ReactiveStyleMixin(BaseNode, circleStyle);

export default class GroupOneNode extends ReactiveCircleNode {
  constructor(node: Node) {
    super(node); // Pass nodeData to the BaseNode constructor
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
    // circle.fill("#f4f4f5");
    if (selected) circle.fill("#0084d1");
    else circle.fill(fillColor);
  }
  render() {
    const style = this.styleStore.get();
    console.log("STYLE UPDATED:", style);
  }
}

export const basicView = createView("basicView", { one: GroupOneNode }, {});
