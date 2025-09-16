import { Viewport } from "pixi-viewport";

import type { EventSystem, FederatedPointerEvent } from "pixi.js";
import { Graphics } from "pixi.js";
import GraphicleContext, { ContextClient } from "./context";
import type { Rect } from "./types";
import { getNodesBounds } from "../utils/index";
import { GraphicleEventType } from "./dispatcher";
import { Layers } from "./renderer";
interface GraphicleViewportInterface {
  screenWidth: number;
  screenHeight: number;
  worldWidth: number;
  worldHeight: number;
  events: EventSystem;
}
export default class GraphicleViewport
  extends Viewport
  implements ContextClient
{
  context: GraphicleContext | null;
  dragged: boolean;
  rectangleSelect: boolean;
  constructor({
    screenWidth,
    screenHeight,
    worldWidth,
    worldHeight,
    events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  }: GraphicleViewportInterface) {
    super({
      screenWidth,
      screenHeight,
      worldWidth,
      worldHeight,
      events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    this.dragged = false;
    this.context = null;
    this.rectangleSelect = false;

    const onDragStart = () => {
      this.dragged = true;
    };
    const onPointerDown = (event: FederatedPointerEvent) => {
      this.dragged = false;
      this.rectangleSelect = false;
      this.on("drag-start", onDragStart.bind(this));
      this.context?.store.setNodeClicked(null);

      if (event.shiftKey) {
        this.rectangleSelect = true;
        const clickedPoint = this.toWorld(event.global);
        this.context?.eventDispatcher.emit(
          GraphicleEventType.RECTANGLESELECT_START,
          clickedPoint,
          event
        );
      }
    };

    const onPointerUp = (event: FederatedPointerEvent) => {
      this.off("drag-start");
      if (!this.dragged) {
        // console.log("ViewportClick, without dragged");
      }
      if (this.rectangleSelect) {
        this.context?.eventDispatcher.emit(
          GraphicleEventType.RECTANGLESELECT_STOP,
          {},
          event
        );
      }
    };
    this.on("pointerdown", onPointerDown.bind(this));

    this.on("pointerup", onPointerUp.bind(this));
  }
  zoomIn() {
    this.zoom(-this.worldWidth / 2, true);
  }
  zoomOut() {
    this.zoom(this.worldWidth / 2, true);
  }
  setContext(context: GraphicleContext): void {
    this.context = context;
    this.fitView();
  }
  pauseViewport() {
    this.pause = true;
  }
  unpauseViewport() {
    this.pause = false;
  }
  /** Viewport helper methods */
  fitView() {
    if (!this.context) return;
    const { x, y, width, height } = getNodesBounds([
      ...this.context?.renderer.nodeIdToNodeGfx.values(),
    ]);

    this.fitBounds(
      { x: x + width / 2, y: y + height / 2, height, width },
      { padding: 50 }
    );
  }
  /**
   * Fits the view to the given bounds
   *
   * @param bounds - the bounds ({ x: number, y: number, width: number, height: number }) to fit the view to
   */
  fitBounds({ x, y, height, width }: Rect, { padding } = { padding: 0 }) {
    this.fit(true, width + padding, height + padding);
    this.moveCenter(x, y);
  }

  /**
   * Take a screenshot of the current viewport
   */
  async screenShot(
    { mode, flash }: { mode: "download" | "clipboard"; flash: boolean } = {
      mode: "clipboard",
      flash: true,
    },
    extractOptions?: { clearColor?: string; resolution?: number }
  ) {
    if (!this.context) return;
    if (mode !== "download" && mode !== "clipboard") {
      console.error(
        "Screenshot method only accept 'download' or 'clipboard' as mode "
      );
      return;
    }
    // Get the viewport bounds
    const visibleBounds = this.getVisibleBounds();

    // Take the screenshot
    const url = await this.context.app.renderer.extract.base64({
      target: this,
      frame: visibleBounds,
      // clearColor: "#ff0000",
      ...extractOptions,
    }); // Extract only what is visible

    if (mode === "download") {
      const anchorElement = document.createElement("a");

      anchorElement.href = url;
      anchorElement.download = "screenshot";
      document.body.appendChild(anchorElement);
      anchorElement.click();
      document.body.removeChild(anchorElement);
    } else if (mode === "clipboard") {
      // Convert base64 to Blob
      const res = await fetch(url);
      const blob = await res.blob();

      // Create ClipboardItem
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });

      // Write to clipboard
      await navigator.clipboard.write([clipboardItem]);
    }
    // Draw flash rectangle
    if (flash) {
      const flashEffect = new Graphics()
        .rect(
          visibleBounds.left,
          visibleBounds.top,
          visibleBounds.width,
          visibleBounds.height
        )
        .fill("white");
      flashEffect.alpha = 0.6;
      flashEffect.label = "flash";
      this.context.renderer.getLayer(Layers.DRAWING).addChild(flashEffect);

      // Start ticker to reduce alpha value
      const tickerCallback = () => {
        flashEffect.alpha -= 0.02;
      };
      const screenShotTicker = this.context.app.ticker.add(tickerCallback);

      // Stop the ticker after timeout and take screenshot
      setTimeout(async () => {
        this.context?.renderer.getLayer(Layers.DRAWING).removeChildren();

        //  Stop animation ticker
        screenShotTicker.remove(tickerCallback);
      }, 800);
    }
  }
}
