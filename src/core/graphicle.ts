import { Application, Renderer } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { GraphicleStore, AppState } from "./store";
interface Graphicle {}

interface GraphicleOptions {
  backgroundAlpha: number;
}

// Values by default Graphicle Options
const defaultGraphicleOptions = {
  backgroundAlpha: 0,
} satisfies GraphicleOptions;

class Graphicle implements Graphicle {
  private _app: Application | null;
  viewport: Viewport | null;
  store: GraphicleStore;
  options: GraphicleOptions;
  constructor(initialState?: AppState, options?: GraphicleOptions) {
    this._app = null;
    this.viewport = null;
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

    // Mount the app into the wrapper
    wrapper.appendChild(this._app.canvas);
    return this;
  }

  /** Getters */
  get app() {
    return this._app;
  }
}

export { Graphicle };
