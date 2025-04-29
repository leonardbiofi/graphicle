import GraphicleContext, { ContextClient } from "./context";
import { GraphicleEventType } from "./dispatcher";
import type { Node } from "./types";

export default class EventHandlers implements ContextClient {
  context: GraphicleContext | null;

  constructor() {
    this.context = null;
  }

  setContext(context: GraphicleContext): void {
    this.context = context;

    this.registerInternalCallbacks();
  }

  registerInternalCallbacks() {
    this.context?.eventDispatcher.on(
      GraphicleEventType.NODE_CLICK,
      this.onNodeClick.bind(this)
    );
  }

  onNodeClick(payload: Node, _event?: MouseEvent) {
    console.log("NODE CLICKED", payload, _event);
  }
}
