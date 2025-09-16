import { BaseNode, type Node, Pixi, Label } from "@graphicle/base";
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

  renderLabel() {
    const { showLabel, radius } = this.styleStore.get();

    const text = this.node.data.label;
    if (!text) return;

    /** Get the dimensions */
    // const bounds = this.getBounds();
    // const maxWidth = bounds.width * 0.9;

    let label = this.getChildByLabel("label") as Label;
    if (!label) {
      const textStyle = new Pixi.TextStyle({
        stroke: { width: 0.5, color: "#ffffff" },
        fill: "#ffffff",
        fontSize: 14,

        align: "center",
      });
      label = new Label(text, textStyle);
      label.label = "label";
      label.anchor.set(0.5);
      label.resolution = 5;

      // label.text = truncateTextToFit(text, textStyle, maxWidth);
      const circle = this.getChildByLabel("circle") as Pixi.Graphics;
      if (!circle) return;
      const circleCenter = {
        x: circle.x + circle.width / 2,
        y: circle.y + circle.height / 2,
      };
      label.position.set(
        circleCenter.x + radius - this.width / 2,
        circleCenter.y + radius + label.height / 2
      );

      this.addChild(label);
    }
    label.visible = showLabel;
  }
  getCenter() {
    const circle = this.getChildByLabel("circle") as Pixi.Graphics;

    const circleCenter = {
      x: circle.x + circle.width / 2,
      y: circle.y + circle.height / 2,
    };

    return {
      x: this.x + circleCenter.x,
      y: this.y + circleCenter.y,
    };
  }
}

export const circleStyle = {
  showLabel: true,
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
