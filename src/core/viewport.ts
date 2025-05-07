import { Viewport } from "pixi-viewport";
import type { EventSystem } from "pixi.js";

interface GraphicleViewportInterface {
  screenWidth: number;
  screenHeight: number;
  worldWidth: number;
  worldHeight: number;
  events: EventSystem;
}
export default class GraphicleViewport extends Viewport {
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
  }

  pauseViewport() {
    this.pause = true;
  }
  unpauseViewport() {
    this.pause = false;
  }
}
