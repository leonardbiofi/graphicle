import { Application, FederatedPointerEvent, Renderer } from "pixi.js";

import { GraphicleStore } from "./store";
import GraphicleRenderer from "./renderer";
import { ConfigCustomNodeAndEdge } from "./types";
import EventDispatcher, { GraphicleEventType } from "./dispatcher";
import EventHandlers from "./eventHandlers";
import GraphicleContext from "./context";
import GraphicleViewport from "./viewport";
import { D3Force, LayoutContext } from "../layout";
import type { Node, Edge } from "./types";
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
  private viewport: GraphicleViewport | null;

  protected renderer: GraphicleRenderer | null;
  protected eventDispatcher: EventDispatcher;
  protected eventHandlers: EventHandlers;
  protected _context: GraphicleContext | null;
  store: GraphicleStore;
  options: GraphicleOptions & ConfigCustomNodeAndEdge;
  constructor(
    initialState?: { nodes: Node[]; edges: Edge[] },
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
    this.viewport = new GraphicleViewport({
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

    //FIXME: Initialize the first layout on startup
    const layout = new LayoutContext(new D3Force());

    // TODO: Allow user to choose the layouting strategies
    // Maybe don't run a layout on initilization
    const positionedNodes = layout.runLayout({
      nodes: this.store.getNodes(),
      edges: this.store.getEdges(),
    });
    this.store.setNodes(positionedNodes);

    // Initialize the renderer
    this.renderer = new GraphicleRenderer(
      this.viewport,
      {
        nodes: this.store.getNodes(),
        edges: this.store.getEdges(),
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
    this.registerEvents();
    return this;
  }

  registerEvents() {
    const emitpointerup = (event: FederatedPointerEvent) => {
      this.context?.eventDispatcher.emit(
        GraphicleEventType.APP_POINTERUP,
        {},
        event
      );
    };
    this._app?.stage.on("pointerup", emitpointerup);
  }

  injectContext() {
    // Create the Graphicle Context
    this._context = new GraphicleContext(
      this.eventDispatcher!,
      this.renderer!,
      this.viewport!,
      this.store!,
      this.app!
    );

    this.renderer?.setContext(this.context);
    this.eventHandlers.setContext(this.context);
    this.viewport?.setContext(this.context);

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
