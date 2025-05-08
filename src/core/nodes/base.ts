import { Container } from "pixi.js";
import type { Node } from "../types";
import { XYPosition } from "../../layout/type";
import GraphicleContext from "../context";
import { GraphicleEventType } from "../dispatcher";
// const LABEL_FONT_FAMILY = ["Arial", "sans-serif"];

// const textStyle = new TextStyle({
//   fontFamily: LABEL_FONT_FAMILY,
//   fontSize: 16,
//   align: "center",
//   fill: "black",
//   fontWeight: "500",
// });

export default abstract class BaseNode extends Container {
  public node: Node;
  context: GraphicleContext | null;

  constructor(node: Node) {
    super();
    this.context = null;
    this.node = node;
    this.label = "node";
    this.initGraphics();
    this.attachEvents();
  }
  setContext(context: GraphicleContext): void {
    this.context = context;
  }
  initGraphics() {
    const { position } = this.node;
    this.x = position.x;
    this.y = position.y;
    this.alpha = 1;
    this.cursor = "grab";
    this.eventMode = "static";
    this.cullable = true;
  }

  getCenter(): XYPosition {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }
  attachLabel() {
    // const labelGfx = new Container();
    // labelGfx.x = this.width / 2;
    // labelGfx.y = this.height / 2;
    // labelGfx.label = "label";
    // const label = new BitmapText({
    //   text: this.nodeData.data.name,
    //   style: textStyle,
    // });
    // label.x = -label.width / 2;
    // label.y = -label.height / 2;
    // labelGfx.addChild(label);
    // this.addChild(labelGfx);
  }

  attachEvents() {
    this.on("pointerdown", (event) => {
      // Right click
      if (event.button === 2) {
        this.context?.eventDispatcher.emit(
          GraphicleEventType.NODE_CONTEXTMENU,
          this.node,
          event
        );
      } else {
        // Left click
        this.context?.eventDispatcher.emit(
          GraphicleEventType.NODE_POINTERDOWN,
          this.node,
          event
        );
      }
    });

    this.on("pointerup", (event) => {
      // Release click
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODE_POINTERUP,
        this.node,
        event
      );
    });

    // /** Event handlers */
    // this.on("pointerdown", (event) => {
    //   // Right click
    //   if (event.button === 2) {
    //     this.canvas.unclickNode();
    //     this.canvas.openContextMenu(event);
    //   } else {
    //     // Leftclick
    //     // Get the node from the store
    //     const node = this.canvas.nodes.find((n) => n.id === this.nodeData.id);
    //     if (!node) return;
    //     // Calculate the dx, dy vector
    //     const clickedPoint = this.canvas.viewport.toWorld(event.global);
    //     const dx = clickedPoint.x - node.position.x;
    //     const dy = clickedPoint.y - node.position.y;
    //     this.canvas.clickNode(this.canvas.getNodeById(this.nodeData.id), {
    //       dx,
    //       dy,
    //     });
    //   }
    //   return false;
    // });
    // this.on("pointerup", (event) => {
    //   if (event.button === 2) return; // Don't toggle anything if it is a right click
    //   this.canvas.toggleSelect(event.ctrlKey);
    //   this.canvas.unclickNode();
    //   event.stopPropagation();
    // });
    // this.on("pointerupoutside", () => {
    //   this.canvas.unclickNode();
    // });
  }
}
