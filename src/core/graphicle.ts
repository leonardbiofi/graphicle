import { Application, Renderer } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { GraphicleStore, AppState } from "./store";
import GraphicleRenderer from "./renderer";
import { ConfigCustomNodeAndEdge } from "./types";
import EventDispatcher from "./dispatcher";
import EventHandlers from "./eventHandlers";
import GraphicleContext from "./context";

interface GraphicleOptions {
  backgroundAlpha: number;
}

// Values by default Graphicle Options
const defaultGraphicleOptions = {
  backgroundAlpha: 0,
  customNodes: {},
  customEdges: {},
};

class Graphicle {
  private _app: Application | null;
  private viewport: Viewport | null;

  protected renderer: GraphicleRenderer | null;
  protected eventDispatcher: EventDispatcher;
  protected eventHandlers: EventHandlers;
  protected _context: GraphicleContext | null;
  store: GraphicleStore;
  options: GraphicleOptions & ConfigCustomNodeAndEdge;
  constructor(
    initialState?: AppState,
    options?: GraphicleOptions & ConfigCustomNodeAndEdge
  ) {
    this._app = null;
    this.viewport = null;
    this.renderer = null;
    this._context = null;
    this.eventDispatcher = new EventDispatcher();
    this.eventHandlers = new EventHandlers();
    this.store = new GraphicleStore(initialState);
    this.options = { ...defaultGraphicleOptions, ...options };
  }

  async mount(wrapper: HTMLElement) {
    if (!wrapper) throw new Error("Could not find the container element");
    // Get wrapper width and height
    const SCREEN_WIDTH = wrapper.offsetWidth;
    const SCREEN_HEIGHT = wrapper.offsetHeight;
    const WORLD_HEIGHT = 1000;
    const WORLD_WIDTH = 1000;
    // Create a PixiJS application.
    this._app = new Application<Renderer<HTMLCanvasElement>>();

    // Intialize the application.
    await this._app.init({
      // background: 'black',
      //   backgroundAlpha: 0, // transparent background
      backgroundAlpha: this.options.backgroundAlpha,
      resizeTo: wrapper,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });

    this._app.stage.eventMode = "static";

    // create viewport
    this.viewport = new Viewport({
      screenWidth: SCREEN_WIDTH,
      screenHeight: SCREEN_HEIGHT,
      worldWidth: WORLD_WIDTH,
      worldHeight: WORLD_HEIGHT,

      events: this._app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    // activate plugins
    this.viewport.drag({}).pinch({}).wheel({}).decelerate({});

    // add the viewport to the stage
    this._app.stage.addChild(this.viewport);

    // Initialize the renderer
    this.renderer = new GraphicleRenderer(
      this.viewport,
      {
        nodes: this.store.state.nodes,
        edges: this.store.state.edges,
      },
      {
        customNodes: this.options.customNodes,
        customEdges: this.options.customEdges,
      }
    );

    // Mount the app into the wrapper
    wrapper.appendChild(this._app.canvas);

    // Inject the context inside all the clients
    this.injectContext();

    return this;
  }

  injectContext() {
    // Create the Graphicle Context
    this._context = new GraphicleContext(
      this.eventDispatcher!,
      this.renderer!,
      this.viewport!,
      this.app!
    );

    this.eventHandlers.setContext(this.context);

    /** Inject the context in all nodes */
    const nodeGfx = Array.from(this.context.renderer.nodeIdToNodeGfx.values());

    nodeGfx.forEach((g) => {
      g.setContext(this.context!);
    });
  }

  /** Getters */
  get app() {
    return this._app;
  }
  get context() {
    return this._context!;
  }
}

export { Graphicle };
