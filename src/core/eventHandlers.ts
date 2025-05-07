import { FederatedPointerEvent } from "pixi.js";
import GraphicleContext, { ContextClient } from "./context";
import { GraphicleEventType } from "./dispatcher";
import type { Node } from "./types";
import { throttle } from "underscore";
export default class EventHandlers implements ContextClient {
  context!: GraphicleContext | null;

  constructor() {
    this.context = null;
  }

  setContext(context: GraphicleContext): void {
    this.context = context;

    this.registerInternalCallbacks();
  }

  registerInternalCallbacks() {
    this.context?.eventDispatcher.on<Node, FederatedPointerEvent>(
      GraphicleEventType.NODE_POINTERDOWN,
      this.onNodePointerDown.bind(this)
    );
    this.context?.eventDispatcher.on<Node, FederatedPointerEvent>(
      GraphicleEventType.NODE_POINTERUP,
      this.onNodePointerUp.bind(this)
    );
    this.context?.eventDispatcher.on<
      { node: Node; translation: { dx: number; dy: number } },
      FederatedPointerEvent
    >(GraphicleEventType.NODE_DRAG, this.onNodeDrag.bind(this));
    this.context?.eventDispatcher.on(
      GraphicleEventType.APP_POINTERUP,
      this.onAppPointerUp.bind(this)
    );
  }
  onAppPointerUp(_payload: Node, _event?: FederatedPointerEvent) {
    this.stopNodeDrag();
  }

  onNodePointerDown(payload: Node, event?: FederatedPointerEvent) {
    if (!event) return;
    // Get the clicked position by the pointer
    const clickedPoint = this.context?.viewport.toWorld(event.global);
    if (!clickedPoint || !payload) return;

    // Calculate the dx, dy vector
    const dx = clickedPoint.x - payload.position.x;
    const dy = clickedPoint.y - payload.position.y;

    const emitNodeDrag = (event: FederatedPointerEvent) => {
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODE_DRAG,
        {
          node: payload,
          translation: { dx, dy },
        },
        event
      );
    };
    // const throttleNodeDrag = throttle(emitNodeDrag.bind(this), 0);

    //register and enable node dragging
    this.context?.app.stage.on("pointermove", emitNodeDrag.bind(this), {
      passive: true,
    });
  }

  stopNodeDrag() {
    this.context?.app.stage.off("pointermove");
    if (this.context?.store.state.nodeDrag)
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODE_DRAGEND,
        this.context?.store.state.nodeDrag
      );
    this.context?.store.setNodeDrag(null);
    this.context?.viewport.unpauseViewport();
  }
  onNodePointerUp(_payload: Node, _event?: FederatedPointerEvent) {
    if (!this.context) return;

    //unregister and disable node dragging
    this.stopNodeDrag();
  }
  onNodeDrag(
    payload: { node: Node; translation: { dx: number; dy: number } },
    event?: FederatedPointerEvent
  ) {
    if (!this.context) return;
    if (!event) return;

    // enable viewport dragging
    this.context.viewport.pauseViewport();

    // Get the clicked node
    const { node: clickedNode, translation } = payload;
    if (!this.context.store.state.nodeDrag) {
      this.context.store.setNodeDrag(clickedNode);
      this.context.eventDispatcher.emit(
        GraphicleEventType.NODE_DRAGSTART,
        clickedNode
      );
    }

    // Get the coordinate of the destination point
    const point = this.context.viewport.toWorld(event?.global);

    // Original position
    // const first = {
    //   x: clickedNode.position.x,
    //   y: clickedNode.position.y,
    // };
    const dx = translation?.dx || 0;
    const dy = translation?.dy || 0;

    // Destination position
    const next = {
      x: point.x - dx,
      y: point.y - dy,
    };

    // Move the node with new position
    const nextNode: Node = {
      ...clickedNode,
      position: { x: next.x, y: next.y },
    };

    // Render the node
    this.context.renderer.updateNodesPosition([{ ...nextNode }]);
  }
}
