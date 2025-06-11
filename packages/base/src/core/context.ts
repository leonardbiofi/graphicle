import { Application } from "pixi.js";
import EventDispatcher from "./dispatcher";
import GraphicleRenderer from "./renderer";
import GraphicleViewport from "./viewport";
import { GraphicleStore } from "./store";

export default class GraphicleContext {
  protected _eventDispatcher: EventDispatcher;
  protected _renderer: GraphicleRenderer;
  protected _viewport: GraphicleViewport;
  protected _app: Application;
  protected _store: GraphicleStore;
  constructor(
    eventDispatcher: EventDispatcher,
    renderer: GraphicleRenderer,
    viewport: GraphicleViewport,
    store: GraphicleStore,
    app: Application
  ) {
    this._eventDispatcher = eventDispatcher;
    this._renderer = renderer;
    this._viewport = viewport;
    this._app = app;
    this._store = store;
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
  get store() {
    return this._store;
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
