import { FederatedPointerEvent } from "pixi.js";
import GraphicleContext, { ContextClient } from "./context";
import { GraphicleEventType } from "./dispatcher";
import type { Node, XYPosition } from "./types";
import type { NodeChange } from "./store";
export default class EventHandlers implements ContextClient {
  context!: GraphicleContext | null;

  handlers: Handlers;
  options: EventHandlersOptions;
  emitNodeDrag: (event: FederatedPointerEvent) => void;
  protected _isDragging: Boolean;
  constructor(handlers: Handlers, options: EventHandlersOptions) {
    this.context = null;
    this.handlers = handlers;
    this.options = options;
    this.emitNodeDrag = () => {};
    this._isDragging = false;
  }

  setContext(context: GraphicleContext): void {
    this.context = context;
    this.registerUserCallbacks();
    this.registerInternalCallbacks();
  }

  registerUserCallbacks() {
    if (!this.handlers) return;

    if (!this.context)
      throw new Error(
        "Context must be initialized before callback registration"
      );

    for (const [eventType, callbackName] of Object.entries(
      eventToCallbackMap
    ) as [GraphicleEventType, keyof Handlers][]) {
      const callback = this.handlers[callbackName];
      if (callback) {
        this.context?.eventDispatcher.on<
          any,
          FederatedPointerEvent | undefined
        >(eventType, (payload, event) => {
          callback(this.context!, payload, event);
        });
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
    >(GraphicleEventType.NODE_DRAG, this.onNodeDrag.bind(this), {
      throttle: 100,
    });
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
    this.context?.eventDispatcher.on(
      GraphicleEventType.NODE_CLICK,
      this.onNodeClick.bind(this)
    );
    this.context?.eventDispatcher.on(
      GraphicleEventType.RECTANGLESELECT_START,
      this.onRectangleSelectStart.bind(this)
    );
    this.context?.eventDispatcher.on(
      GraphicleEventType.RECTANGLESELECT_STOP,
      this.onRectangleSelectStop.bind(this)
    );
    this.context?.eventDispatcher.on(
      GraphicleEventType.RECTANGLESELECT_DRAW,
      this.onRectangleSelectDraw.bind(this)
    );
  }
  unregisterUserCallbacks() {
    for (const [eventType, callbackName] of Object.entries(
      eventToCallbackMap
    ) as [GraphicleEventType, keyof Handlers][]) {
      const callback = this.handlers[callbackName];
      if (callback) {
        this.context?.eventDispatcher.off(eventType, (payload, event) => {
          callback(this.context!, payload, event);
        });
      }
    }
  }

  /**
   * Determine which nodes needs to be selected on node base on the arguments
   * @param clickedNode
   * @param ctrlKey
   */
  determineSelectedNodes(
    clickedNode: Node,
    ctrlKey: boolean,
    actionType: "click" | "drag"
  ) {
    if (actionType === "click") {
      if (!ctrlKey) this.context?.renderer.unselectAllNodes();
      const previousState = clickedNode.selected;
      this.context?.renderer.applyNodeChangesInternal([
        {
          type: "update",
          id: clickedNode.id,
          changes: { selected: !previousState },
        },
      ]);
      // this.context!.renderer.setSelectNode(clickedNode, !previousState);
    } else if (actionType === "drag") {
      const multipleSelect = this.context!.store.getSelectedNodes().length > 1;

      if (!multipleSelect) {
        this.context?.renderer.unselectAllNodes();
      }

      this.context?.renderer.applyNodeChangesInternal([
        {
          type: "update",
          id: clickedNode.id,
          changes: { selected: this.options.selectOnDrag },
        },
      ]);
      // this.context!.renderer.setSelectNode(
      //   clickedNode,
      //   this.options.selectOnDrag
      // );
    } else throw new Error("Unknown action type, only click|drag are accepted");
  }

  /**
   *
   * @param _payload
   * @param _event
   */
  onNodeDragEnd(payload: Node, _event?: FederatedPointerEvent) {
    this._isDragging = false;

    // Reset the cursor to 'grab'
    this.context?.renderer.updateNodeCursor(payload);
  }
  onNodeDragStart(payload: Node, event?: FederatedPointerEvent) {
    if (!this.context || !event) return;

    this._isDragging = true;
    // Select the node if the option selectOnDrag is set to true
    // Unselect other nodes if there is no multiselect
    this.determineSelectedNodes(payload, event.ctrlKey, "drag");
    this._isDragging = true;
  }
  onNodeClick(payload: Node, _event?: FederatedPointerEvent) {
    this.context?.store.setNodeClicked(payload);
  }
  stopNodeDrag() {
    this.context?.app.stage.off("pointermove", this.emitNodeDrag);

    if (this._isDragging)
      this.context?.eventDispatcher.emit(GraphicleEventType.NODE_DRAGEND, {});
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
    if (!this._isDragging) {
      this.context.eventDispatcher.emit(
        GraphicleEventType.NODE_DRAGSTART,
        clickedNode,
        event
      );
      return;
    }

    // Get the coordinate of the destination point
    const point = this.context.viewport.toWorld(event?.global);

    // Original position
    const first = {
      x: clickedNode.position.x,
      y: clickedNode.position.y,
    };
    const dx = translation?.dx || 0;
    const dy = translation?.dy || 0;

    // Destination position
    const next = {
      x: point.x - dx,
      y: point.y - dy,
    };

    // Move the node with new position
    const t = { x: next.x - first.x, y: next.y - first.y };

    clickedNode.position = { x: next.x, y: next.y };

    const selectedNodes = this.context.store.getSelectedNodes();
    const multipleSelect = selectedNodes.length > 1;
    // console.log("SELECTEDNODES:", selectedNodes, multipleSelect);
    // const multipleSelect =
    //   this.context.store.getNodes().filter((n) => n.selected).length > 1;
    // Get all the other selected nodes and update their position relative to the one being dragged
    // const nextNodes = selectedNodes.map((n) => {
    //   if (
    //     n.selected &&
    //     n.id !== clickedNode.id &&
    //     multipleSelect &&
    //     (clickedNode.selected || event.ctrlKey)
    //   ) {
    //     return {
    //       ...n,
    //       position: {
    //         x: n.position.x + t.x,
    //         y: n.position.y + t.y,
    //       },
    //       // selected: true,
    //     };
    //   } else if (n.id === clickedNode.id)
    //     return {
    //       ...n,
    //       position: { x: next.x, y: next.y },
    //       // selected: this.options.selectOnDrag,
    //     };
    //   else return { ...n };
    // });

    const nextNodes: NodeChange[] = selectedNodes.map((n) => {
      if (
        n.selected &&
        n.id !== clickedNode.id &&
        multipleSelect &&
        (clickedNode.selected || event.ctrlKey)
      ) {
        return {
          type: "update",
          id: n.id,
          changes: {
            position: {
              x: n.position.x + t.x,
              y: n.position.y + t.y,
            },
          },
        };
      }
      if (n.id === clickedNode.id)
        return {
          type: "update",
          id: n.id,
          changes: {
            position: { x: next.x, y: next.y },
          },
        };
    });
    // Render the node
    this.context.renderer.applyNodeChangesInternal(nextNodes);
    // this.context.renderer.updateNodesPosition(nextNodes);
    // this.context.renderer.updateSelectedNodes(nextNodes);
  }

  /**
   *
   * @param payload
   * @param event
   * @returns
   */
  onNodePointerDown(payload: Node, event?: FederatedPointerEvent) {
    if (!event) return;
    this._isDragging = false;
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
    this.emitNodeDrag = emitNodeDrag.bind(this);
    // const throttleNodeDrag = throttle(emitNodeDrag.bind(this), 0);

    //register and enable node dragging
    this.context?.app.stage.on("pointermove", this.emitNodeDrag, {
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
    // const draggedNode = this.context?.store.state.nodeDrag;
    // const previousState = payload.selected;
    if (!this._isDragging) {
      this.determineSelectedNodes(payload, !!event?.ctrlKey, "click");
      // if (!event?.ctrlKey) {
      //   this.context?.renderer.unselectAllNodes();

      //   this.context.renderer.setSelectNode(payload, !previousState);
      // } else {
      //   this.context.renderer.setSelectNode(payload, !previousState);
      // }
    }
    this._isDragging = false;
    // this.stopNodeDrag();
  }
  onAppPointerUp(_payload: Node, _event?: FederatedPointerEvent) {
    // If no node was dragged unselect all
    const nodeDragged = this._isDragging;
    const viewportDragged = this.context?.viewport.dragged;
    const nodeClicked = this.context?.store.state.nodeClicked;
    const rectangleSelect = this.context?.viewport.rectangleSelect;
    if (!nodeDragged && !viewportDragged && !nodeClicked && !rectangleSelect) {
      this.context?.renderer.unselectAllNodes();
      this.context?.store.setNodeClicked(null);
    }
    // Stop the node dragging
    this.stopNodeDrag();
  }

  onRectangleSelectStart(payload: XYPosition, _event?: FederatedPointerEvent) {
    this.context?.viewport.pauseViewport();
    const emitRectangleDraw = (event: FederatedPointerEvent) => {
      this.context?.eventDispatcher.emit(
        GraphicleEventType.RECTANGLESELECT_DRAW,
        payload,
        event
      );
    };
    this.context?.app.stage.on("pointermove", emitRectangleDraw.bind(this), {
      passive: true,
    });
  }
  onRectangleSelectStop(_payload: XYPosition, _event?: FederatedPointerEvent) {
    this.context?.app.stage.off("pointermove");
    this.context?.renderer.updateRectangleSelectStop();
    this.context?.viewport.unpauseViewport();
  }
  onRectangleSelectDraw(payload: XYPosition, event?: FederatedPointerEvent) {
    if (!event) return;

    // enable viewport dragging
    this.context?.viewport.pauseViewport();

    const pos1 = payload;
    const pos2 = this.context?.viewport.toWorld(event.global)!;

    this.context?.renderer.updateRectangleSelect(pos1, pos2);
  }
}

export interface EventHandlersOptions {
  selectOnDrag: boolean;
}

export interface Handlers {
  onNodeClick?: (
    context: GraphicleContext,
    node: Node,
    event: FederatedPointerEvent | undefined
  ) => void;
  onNodeDrag?: (
    context: GraphicleContext,
    info: { node: Node; translation: { dx: number; dy: number } },
    event: FederatedPointerEvent | undefined
  ) => void;
  onNodeHover?: (
    context: GraphicleContext,
    node: Node,
    event: FederatedPointerEvent | undefined
  ) => void;
  onNodesUnselect?: (context: GraphicleContext, nodes: Node[]) => void;
  onNodesSelect?: (context: GraphicleContext, nodes: Node[]) => void;
}

const eventToCallbackMap: Record<any, keyof Handlers | undefined> = {
  [GraphicleEventType.NODE_CLICK]: "onNodeClick",
  [GraphicleEventType.NODE_DRAG]: "onNodeDrag",
  [GraphicleEventType.NODE_HOVER]: "onNodeHover",
  [GraphicleEventType.NODES_UNSELECT]: "onNodesUnselect",
  [GraphicleEventType.NODES_SELECT]: "onNodesSelect",
};
