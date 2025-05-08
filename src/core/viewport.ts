import { Viewport } from "pixi-viewport";
import type { EventSystem } from "pixi.js";
import GraphicleContext, { ContextClient } from "./context";
import type { Rect } from "./types";
import { getNodesBounds } from "../utils/index";
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
    this.context = null;
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

    console.log(x, y, width, height);

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
}
