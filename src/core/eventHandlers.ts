import { FederatedPointerEvent } from "pixi.js";
import GraphicleContext, { ContextClient } from "./context";
import { GraphicleEventType } from "./dispatcher";
import type { Node } from "./types";

export default class EventHandlers implements ContextClient {
  context!: GraphicleContext | null;

  options: EventHandlersOptions | undefined;
  constructor(options?: EventHandlersOptions) {
    this.context = null;
    this.options = options;
  }

  setContext(context: GraphicleContext): void {
    this.context = context;
    this.registerUserCallbacks();
    this.registerInternalCallbacks();
  }

  registerUserCallbacks() {
    if (!this.options) return;

    for (const [eventType, callbackName] of Object.entries(
      eventToCallbackMap
    ) as [GraphicleEventType, keyof EventHandlersOptions][]) {
      const callback = this.options[callbackName];
      if (callback) {
        this.context?.eventDispatcher.on<any, FederatedPointerEvent>(
          eventType,
          (payload, event) => {
            callback(payload, event);
          }
        );
      }
    }
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
    this.context?.eventDispatcher.on(
      GraphicleEventType.NODE_DRAGSTART,
      this.onNodeDragStart.bind(this)
    );
    this.context?.eventDispatcher.on(
      GraphicleEventType.NODE_DRAGEND,
      this.onNodeDragEnd.bind(this)
    );
  }

  /**
   *
   * @param _payload
   * @param _event
   */
  onNodeDragEnd(payload: Node, _event?: FederatedPointerEvent) {
    this.context?.store.setNodeDrag(null);

    // Reset the cursor to 'grab'
    this.context?.renderer.updateNodeCursor(payload);
  }
  onNodeDragStart(payload: Node, _event?: FederatedPointerEvent) {
    this.context?.store.setNodeDrag(payload);
  }
  stopNodeDrag() {
    this.context?.app.stage.off("pointermove");
    if (this.context?.store.state.nodeDrag)
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODE_DRAGEND,
        this.context?.store.state.nodeDrag
      );
    this.context?.viewport.unpauseViewport();
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

  /**
   *
   * @param payload
   * @param event
   * @returns
   */
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

  onNodePointerUp(payload: Node, event?: FederatedPointerEvent) {
    if (!this.context) return;

    this.context.eventDispatcher.emit(
      GraphicleEventType.NODE_CLICK,
      payload,
      event
    );

    // Check whether a node is being dragged
    const draggedNode = this.context?.store.state.nodeDrag;
    if (!draggedNode) {
      console.log("HELLO");
      const previousState = payload.selected;
      // Check if we are in a multiple select state
      const singleSelected =
        this.context.store.getNodes().filter((n) => n.selected).length === 1;
      if (singleSelected) {
        if (!event?.ctrlKey) {
          this.context?.renderer.unselectAllNodes();
          this.context.renderer.setSelectNode(payload, !previousState);
          // nodeData.selected = !previousState;
        } else {
          this.context.renderer.setSelectNode(payload, !previousState);
        }
      } else if (!singleSelected) {
        if (!event?.ctrlKey) {
          this.context?.renderer.unselectAllNodes();
          this.context.renderer.setSelectNode(payload, true);
        } else {
          this.context.renderer.setSelectNode(payload, !previousState);
        }
      }
      this.context.renderer.updateSelectedNodes();
    }
    //unregister and disable node dragging
    this.stopNodeDrag();
  }
  onAppPointerUp(_payload: Node, _event?: FederatedPointerEvent) {
    this.stopNodeDrag();
  }
}

export interface EventHandlersOptions {
  onNodeClick?: (node: Node, event: FederatedPointerEvent | undefined) => void;
  onNodeDrag?: (
    info: { node: Node; translation: { dx: number; dy: number } },
    event: FederatedPointerEvent | undefined
  ) => void;
}

const eventToCallbackMap: Record<any, keyof EventHandlersOptions | undefined> =
  {
    [GraphicleEventType.NODE_CLICK]: "onNodeClick",
    [GraphicleEventType.NODE_DRAG]: "onNodeDrag",
  };
