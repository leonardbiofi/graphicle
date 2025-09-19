import { BaseNode, type Node, Pixi, Label } from "@graphicle/base";
import { ObservableStyle } from "../observableStyle";
import { ReactiveStyleMixin } from "../mixin";
import CircleSprite from "./circleSprite";

class CircleNode extends BaseNode {
  styleStore!: ObservableStyle<any>; // Will be injected later
  previousSelected: boolean;

  constructor(node: Node) {
    super(node); // Pass nodeData to the BaseNode constructor
    // this.initGraphics();
    // this.render();
    this.previousSelected = !!node.selected;
  }

  initGraphics() {
    super.initGraphics();
    // const circle = new Pixi.Graphics();
    const { radius, fillColor } = this.styleStore.get();
    // circle.circle(0 + radius, 0 + radius, radius);
    // circle.fill(fillColor);

    const circle = new CircleSprite();
    circle.scale.set(1);
    circle.anchor.set(0.5);
    // circle.width = radius / 2;
    // circle.height = radius / 2;
    circle.tint = fillColor;
    circle.label = "circle";
    // circle.label = "circle";
    this.addChild(circle);
  }

  renderContainer() {
    const { position } = this.node;
    this.x = position.x;
    this.y = position.y;
    const { opacity } = this.styleStore.get();

    this.alpha = opacity;
  }

  renderSelected() {
    const { selected } = this.node;
    if (this.previousSelected !== selected) {
      const circle = this.getChildByLabel("circle") as Pixi.Sprite;
      const { fillColor } = this.styleStore.get();
      if (!circle) return;
      // circle.clear();
      // circle.circle(0 + radius, 0 + radius, radius);

      if (selected) circle.tint = "#0084d1";
      else circle.tint = fillColor;
      circle.anchor.set(0.5);
    }
    this.previousSelected = selected;
  }

  renderLabel() {
    const { showLabel, radius } = this.styleStore.get();
    const text = this.node.data.label;
    if (!text) return;
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
      label.resolution = 2;
      // label.text = truncateTextToFit(text, textStyle, maxWidth);
      const circle = this.getChildByLabel("circle") as Pixi.Graphics;
      if (!circle) return;
      const circleCenter = {
        x: circle.x,
        y: circle.y,
      };
      label.position.set(
        circleCenter.x - this.width / 2,
        circleCenter.y + this.height * 2
      );
      this.addChild(label);
    }
    label.visible = showLabel;
  }
  getCenter() {
    const circle = this.getChildByLabel("circle") as Pixi.Graphics;

    const circleCenter = {
      x: circle.x,
      y: circle.y,
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
  radius: 30,
  opacity: 1,
};

export function createCircleNodeClass<TStyle extends object>(
  style: ObservableStyle<TStyle>
) {
  return ReactiveStyleMixin(CircleNode, style);
}
