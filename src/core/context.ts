import { Application } from "pixi.js";
import EventDispatcher from "./dispatcher";
import GraphicleRenderer from "./renderer";
import { Viewport } from "pixi-viewport";

export default class GraphicleContext {
  protected _eventDispatcher: EventDispatcher;
  protected _renderer: GraphicleRenderer;
  protected _viewport: Viewport;
  protected _app: Application;
  constructor(
    eventDispatcher: EventDispatcher,
    renderer: GraphicleRenderer,
    viewport: Viewport,
    app: Application
  ) {
    this._eventDispatcher = eventDispatcher;
    this._renderer = renderer;
    this._viewport = viewport;
    this._app = app;
  }

  /** Getters */
  get eventDispatcher() {
    return this._eventDispatcher;
  }
  get viewport() {
    return this._viewport;
  }
  get app() {
    return this._app;
  }
  get renderer() {
    return this._renderer;
  }
}

export interface ContextClient {
  context: GraphicleContext | null;
  setContext(context: GraphicleContext): void;
  //   getContext(): GraphicleContext;
}

// abstract class ContextClient implements ContextClient {
//   protected context: GraphicleContext | null;

//   constructor() {
//     this.context = null;
//   }

//   public getContext() {
//     return this.context;
//   }
//   public setContext(context: GraphicleContext) {
//     this.context = context;
//   }
//   //   abstract selectContext<T>(context: GraphicleContext): T;
// }

// export { ContextClient };
