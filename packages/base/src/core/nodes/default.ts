import { Graphics } from "pixi.js";
import BaseNode from "./base";
import type { Node } from "../types";
import Label from "./label";
import { truncateTextToFit } from "../../utils/truncate";

const RADIUS = 20; // default radius size

export default class DefaultNode extends BaseNode {
  constructor(node: Node) {
    super(node); // Pass nodeData to the BaseNode constructor
    this.initGraphics();
    this.render();
  }

  initGraphics() {
    super.initGraphics();
    const circle = new Graphics();
    circle.circle(0 + RADIUS, 0 + RADIUS, RADIUS);
    circle.fill("#f4f4f5");
    circle.label = "circle";
    this.addChild(circle);
  }

  renderSelected() {
    const { selected } = this.node;
    const circle = this.getChildByLabel("circle") as Graphics;
    if (!circle) return;
    circle.clear();
    circle.circle(0 + RADIUS, 0 + RADIUS, RADIUS);
    // circle.fill("#f4f4f5");
    if (selected) circle.fill("#0084d1");
    else circle.fill("#f4f4f5");
  }
  renderLabel() {
    const text = this.node.data.label;
    if (!text) return;

    /** Get the dimensions */
    const bounds = this.getBounds();
    const maxWidth = bounds.width * 0.9;

    let label = this.getChildByLabel("label") as Label;
    if (!label) {
      label = new Label(text);
      label.label = "label";
      label.anchor.set(0.5);
      const textStyle = label.style;

      label.text = truncateTextToFit(text, textStyle, maxWidth);
      label.position.set(bounds.width / 2, bounds.height / 2);

      this.addChild(label);
    }
  }
}
