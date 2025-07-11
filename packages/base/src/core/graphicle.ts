import { Application, FederatedPointerEvent, Renderer } from "pixi.js";

import { GraphicleStore } from "./store";
import GraphicleRenderer from "./renderer";
import { ConfigCustomNodeAndEdge } from "./types";
import EventDispatcher, { GraphicleEventType } from "./dispatcher";
import EventHandlers, {
  type Handlers,
  type EventHandlersOptions,
} from "./eventHandlers";
import GraphicleContext from "./context";
import GraphicleViewport from "./viewport";
import { D3Force, LayoutContext } from "../layout";
import type { Node, Edge } from "./types";
import { GraphicleView, ViewContext, View } from "./view";
interface GraphicleOptions {
  customNodes?: {};
  customEdges?: {};
  backgroundAlpha?: number;
  selectOnDrag?: boolean;
  handlers: Handlers;
}

// Values by default Graphicle Options
const defaultGraphicleOptions = {
  backgroundAlpha: 0,
  selectOnDrag: true,
  handlers: {},
  // customNodes: {},
  // customEdges: {},
};

class Graphicle {
  private _app: Application | null;
  private viewport: GraphicleViewport | null;

  protected renderer: GraphicleRenderer | null;
  protected eventDispatcher: EventDispatcher;
  protected eventHandlers: EventHandlers;
  protected _context: GraphicleContext | null;
  protected viewContext: ViewContext;
  store: GraphicleStore;
  options: GraphicleOptions & EventHandlersOptions;
  constructor(
    view: GraphicleView = new View("default", {}, {}),
    initialState?: { nodes: Node[]; edges: Edge[] },
    options?: GraphicleOptions & EventHandlersOptions
  ) {
    this._app = null;
    this.viewport = null;
    this.renderer = null;
    this._context = null;
    this.options = { ...defaultGraphicleOptions, ...options };
    this.eventDispatcher = new EventDispatcher();
    this.eventHandlers = new EventHandlers(this.options.handlers, {
      selectOnDrag: this.options.selectOnDrag,
    });
    this.store = new GraphicleStore(initialState);
    this.viewContext = new ViewContext(view);
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
        customNodes: this.viewContext.getView().nodesIndex,
        customEdges: this.viewContext.getView().edgesIndex,
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

  switchView(view: GraphicleView) {
    // Read from the view and assign it to the context
    this.viewContext.setView(view);
    // Renderer needs to reinitialise the view. Reinitialise the whole renderer ?
    // The event handler needs to reassign the callbacks to override
  }

  /** Getters */
  get app() {
    return this._app;
  }
  get context() {
    return this._context!;
  }
}

interface createGraphicleProps {
  container: HTMLElement;
  initialState: { nodes: Node[]; edges: Edge[] };
  view: GraphicleView;
  options: GraphicleOptions & ConfigCustomNodeAndEdge & EventHandlersOptions;
}

/**
 * Create Graphicle factory function to quickly instantiate a graphical canvas object
 * @param HTMLElement
 * @initialState the initial store state of the graphicle
 * @options the options to customize the graphicle
 * @returns
 */
const createGraphicle = async ({
  container,
  initialState,
  view,
  options,
}: createGraphicleProps): Promise<Graphicle> => {
  const graphicle = new Graphicle(view, { ...initialState }, { ...options });

  await graphicle.mount(container);

  return graphicle;
};

export { Graphicle, createGraphicle };
