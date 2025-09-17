import { Container, Graphics, Point } from "pixi.js";
import { debounce } from "@tanstack/pacer";
import type {
  GraphData,
  Node,
  Edge,
  NodeId,
  EdgeId,
  EdgeGfx,
  NodeGfx,
  XYPosition,
} from "./types";

import GraphicleContext, { ContextClient } from "./context";
import GraphicleViewport from "./viewport";
import { ViewRegistry } from "./view";

import type { NodeChange, EdgeChange } from "./store";
import { GraphicleEventType } from "./dispatcher";
export enum Layers {
  GROUPS = "groups",
  NODES = "nodes",
  EDGES = "edges",
  DRAWING = "drawing",
}

export default class GraphicleRenderer implements ContextClient {
  viewport: GraphicleViewport;
  context: GraphicleContext | null;
  viewRegistry: ViewRegistry;
  nodeIdToNodeGfx: Map<NodeId, NodeGfx>;
  edgeIdToEdgeGfx: Map<EdgeId, EdgeGfx>;
  nodeToEdges: Map<NodeId, Set<EdgeId>>;
  protected renderRequestId: number | null; // Request render

  constructor(viewport: GraphicleViewport, { nodes, edges }: GraphData) {
    this.viewport = viewport;
    this.context = null;
    this.nodeIdToNodeGfx = new Map();
    this.edgeIdToEdgeGfx = new Map();
    this.nodeToEdges = new Map();
    this.viewRegistry = new ViewRegistry();

    this.initializeLayers();
    this.buildNodeToEdgeMap(edges);
    this.initializeNodes(nodes);
    this.initializeEdges(edges);

    // Request render
    this.renderRequestId = null;
  }
  buildNodeToEdgeMap(edges: Edge[]) {
    for (const edge of edges) {
      if (!this.nodeToEdges.has(edge.source))
        this.nodeToEdges.set(edge.source, new Set());
      if (!this.nodeToEdges.has(edge.target))
        this.nodeToEdges.set(edge.target, new Set());

      this.nodeToEdges.get(edge.source)!.add(edge.id);
      this.nodeToEdges.get(edge.target)!.add(edge.id);
    }
  }
  setContext(context: GraphicleContext) {
    this.context = context;
  }

  initializeLayers() {
    // Ordering the layers is important here
    const groupsLayer = new Container();
    groupsLayer.label = Layers.GROUPS;
    this.viewport.addChild(groupsLayer);

    const edgesLayer = new Container();
    edgesLayer.label = Layers.EDGES;
    this.viewport.addChild(edgesLayer);

    const nodesLayer = new Container();
    nodesLayer.label = Layers.NODES;
    this.viewport.addChild(nodesLayer);

    // Layer to draw anything on top
    const drawingLayer = new Container({ isRenderGroup: true });
    drawingLayer.label = Layers.DRAWING;
    this.viewport.addChild(drawingLayer);
  }

  /**
   *
   * @param Layers
   * @returns Layer
   */
  getLayer(label: Layers) {
    const layer = this.viewport.getChildByLabel(label);

    if (!layer)
      throw new Error(
        `Unknown layer label ${label}. Make sure you are passing a valid layer label `
      );
    return layer;
  }

  initializeNodes(nodes: Node[]) {
    const layer = this.getLayer(Layers.NODES);
    layer.removeChildren();

    const changes: NodeChange[] = nodes.map((node: Node) => {
      if (!node.type) node.type = "undefined";
      return { type: "add", item: node };
    });

    this.applyNodeChangesInternal(changes, false);

    // const nodeIdGfxPairs: [NodeId, NodeGfx][] = nodes.map((node) => {
    //   // Create the node
    //   const nodeGfx = this.viewRegistry.createNode(node.type, node);

    //   // Inject the context in each nodes
    //   nodeGfx.setContext(this.context);
    //   layer.addChild(nodeGfx);

    //   return [node.id, nodeGfx];
    // });

    // this.nodeIdToNodeGfx = new Map(nodeIdGfxPairs);
  }
  initializeEdges(edges: Edge[]) {
    const layer = this.getLayer(Layers.EDGES);
    layer.removeChildren();

    const changes: EdgeChange[] = edges.map((edge: Edge) => {
      if (!edge.type) edge.type = "undefined";

      return { type: "add", item: edge };
    });

    this.applyEdgeChangesInternal(changes, false);
    // const edgeIdGfxPairs: [EdgeId, EdgeGfx][] = edges.map((edge) => {
    //   const srcNodeGfx = this.nodeIdToNodeGfx.get(edge.source);
    //   const tgtNodeGfx = this.nodeIdToNodeGfx.get(edge.target);
    //   if (!srcNodeGfx || !tgtNodeGfx) {
    //     throw new Error("Fatal: Source or target Graphics undefined.");
    //   }
    //   // Create the edge

    //   const edgeGfx = this.viewRegistry.createEdge(
    //     edge.type,
    //     edge,
    //     srcNodeGfx,
    //     tgtNodeGfx
    //   );
    //   layer.addChild(edgeGfx);

    //   return [edge.id, edgeGfx];
    // });

    // this.edgeIdToEdgeGfx = new Map(edgeIdGfxPairs);
  }

  // addNode(node: Node): NodeGfx {
  //   let returnNode = null;

  //   // TODO: Fetch the customnode from the view.

  //   let CustomNode = this.options.customNodes[node.type];
  //   if (!CustomNode) {
  //     console.warn("Unknown node type falling back to default");
  //     returnNode = new DefaultNode(node);
  //   } else {
  //     returnNode = new CustomNode(node);
  //   }
  //   // @ts-ignore FIXME:
  //   return returnNode;
  // }

  // addEdge(edge: Edge, sourceGfx: NodeGfx, targetGfx: NodeGfx): EdgeGfx {
  //   let returnEdge = null;

  //   // TODO: Fetch the customedge from the view.
  //   let customEdge = this.options.customEdges[edge.type];
  //   if (!customEdge) {
  //     console.warn("Unknown edge type falling back to straight");
  //     returnEdge = new StraightEdge(edge, sourceGfx, targetGfx);
  //   }

  //   // @ts-ignore FIXME:
  //   return returnEdge;
  // }
  // updateNodesPosition(nodes: Node[]) {
  //   this.context?.store.updateNodes(nodes, true);

  //   // Render nodes
  //   nodes.forEach((node: Node) => {
  //     // Get the graphical node and update its position
  //     const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
  //     if (!nodeGfx) return;
  //     nodeGfx.node = node;
  //     nodeGfx.x = node.position.x;
  //     nodeGfx.y = node.position.y;
  //     nodeGfx.cursor = "grabbing";

  //     // Get all edges connected to that node
  //     // const edges = [...this.edgeIdToEdgeGfx.values()].filter(
  //     //   (eds) => eds?.edge.target === node.id || eds?.edge.source === node.id
  //     // );

  //     [...this.edgeIdToEdgeGfx.values()].forEach((eds) => {
  //       // Only if edge is connected to that node
  //       if (eds?.edge.target === node.id || eds?.edge.source === node.id) {
  //         // Update line
  //         eds.srcNodeGfx = this.nodeIdToNodeGfx.get(eds.edge.source)!;
  //         eds.tgtNodeGfx = this.nodeIdToNodeGfx.get(eds.edge.target)!;
  //         eds.updatePosition();
  //       }
  //     });
  //   });
  //   this.requestRender();
  // }

  updateSelectedNodes(nodes: Node[]) {
    nodes?.forEach((node: Node) => {
      // Get the graphical node and update its selection
      const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
      if (!nodeGfx) return;
      nodeGfx.node = node;
      // FIXME: Maybe implement a default behaviour that can be overriden ?
      if (node.selected) nodeGfx.alpha = 0.4;
      else {
        nodeGfx.alpha = 1;
      }
    });
  }
  updateNodeCursor(node: Node, cursor: "grab" | "grabbing") {
    const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
    if (!nodeGfx) return;
    nodeGfx.cursor = cursor;
    this.requestRender();
  }
  unselectAllNodes() {
    const nodes = this.context!.store.getNodes();

    const changes: NodeChange[] = nodes?.map((n) => ({
      type: "update",
      id: n.id,
      changes: { selected: false },
    }));
    // const nextNodes = this.context?.store.getNodes().map((n) => ({
    //   ...n,
    //   selected: false,
    // }));
    this.applyNodeChangesInternal(changes);

    // this.context?.eventDispatcher.emit(
    //   GraphicleEventType.NODES_UNSELECT,
    //   [],
    //   null
    // );
    // if (!nextNodes) return;

    // this.context?.store.updateNodes(nextNodes, true);
    // this.updateSelectedNodes(nextNodes);
    // this.requestRender();
  }
  updateRectangleSelect(pos1: XYPosition, pos2: XYPosition) {
    const layer = this.getLayer(Layers.DRAWING);
    layer?.removeChildren();
    const rectangle = new Graphics()
      .moveTo(pos1.x, pos1.y)
      .lineTo(pos2.x, pos1.y)
      .lineTo(pos2.x, pos2.y)
      .lineTo(pos1.x, pos2.y)
      .lineTo(pos1.x, pos1.y)
      .fill(0x3333dd);
    rectangle.label = "rectangleSelect";
    rectangle.alpha = 0.2;
    rectangle.stroke({ width: 3, color: 0x3333dd });
    layer?.addChild(rectangle);
  }
  updateRectangleSelectStop() {
    const layer = this.getLayer(Layers.DRAWING);
    const rectangle = layer.getChildByLabel("rectangleSelect");
    if (rectangle) {
      const nodes = this.context?.store.getNodes();
      if (!nodes) return;
      // nodes.forEach((node) => {
      //   const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
      //   if (!nodeGfx) return;
      //   const { x, y } = nodeGfx.getCenter();
      //   // @ts-expect-error it does have containsPoint FIXME:
      //   const contains = rectangle.containsPoint(new Point(x, y));
      //   this.setSelectNode(node, contains);
      //   // node.selected = contains;
      // });

      const changes: NodeChange[] = nodes.map((node) => {
        const nodeGfx = this.nodeIdToNodeGfx.get(node.id)!;
        const { x, y } = nodeGfx.getCenter();
        // @ts-expect-error it does have containsPoint FIXME:
        const contains = rectangle.containsPoint(new Point(x, y));
        return { type: "update", id: node.id, changes: { selected: contains } };
        // this.setSelectNode(node, contains);
      });

      this.applyNodeChangesInternal(changes);
      // nodes.forEach((node) => {
      //   const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
      //   if (!nodeGfx) return;
      //   const { x, y } = nodeGfx.getCenter();
      //   // @ts-expect-error it does have containsPoint FIXME:
      //   const contains = rectangle.containsPoint(new Point(x, y));
      //   this.setSelectNode(node, contains);
      //   // node.selected = contains;
      // });

      // this.context?.store.updateNodes(nodes, true);
      // this.updateSelectedNodes(nodes);
      rectangle?.destroy({ context: false });
    }
  }

  requestRender() {
    if (this.renderRequestId) return;
    this.renderRequestId = window.requestAnimationFrame(() => {
      this.context?.app.render();
      this.renderRequestId = null;
    });
  }

  switchView(viewName?: string) {
    if (!this.context) return;
    // Remove all existing nodes
    const nodelayer = this.getLayer(Layers.NODES);
    nodelayer.removeChildren();
    const edgeLayer = this.getLayer(Layers.EDGES);
    edgeLayer.removeChildren();

    // Set the current view
    this.viewRegistry.setCurrentView(viewName ?? "default");

    // Define changes
    const nodeChanges: NodeChange[] = this.context?.store
      .getNodes()
      .map((node: Node) => {
        if (!node.type) node.type = "undefined";
        return { type: "add", item: node };
      });
    const edgeChanges: EdgeChange[] = this.context?.store
      .getEdges()
      .map((edge: Edge) => {
        if (!edge.type) edge.type = "undefined";

        return { type: "add", item: edge };
      });

    // Rerender everything
    this.renderNodeChanges(nodeChanges);
    this.renderEdgeChanges(edgeChanges);
  }

  renderNodeChanges(changes: NodeChange[]) {
    const layer = this.getLayer(Layers.NODES);

    // Perform a render or an update
    for (const change of changes) {
      if (!change) continue;

      if (change.type === "add") {
        // Add the new node to the dom
        const node = change.item;

        const nodeGfx = this.viewRegistry.createNode(node.type, node);

        // Inject the context in each nodes
        nodeGfx.setContext(this.context);
        layer.addChild(nodeGfx);
        this.nodeIdToNodeGfx.set(node.id, nodeGfx);
      } else if (change.type === "remove") {
        // Remove from dom
        const nodeGfx = this.nodeIdToNodeGfx.get(change.id)!;
        if (!nodeGfx) continue;
        nodeGfx?.destroy({ children: true });

        // Remove also the edges connected to it
        const edgeIds = this.nodeToEdges.get(change.id);
        if (!edgeIds) continue;
        for (const edgeId of edgeIds) {
          const edgeGfx = this.edgeIdToEdgeGfx.get(edgeId);
          if (!edgeGfx) continue;
          edgeGfx.destroy({ children: true });
          this.edgeIdToEdgeGfx.delete(edgeId);
        }
        // Remove the set from the map
        this.nodeToEdges.delete(change.id);
      } else if (change.type === "update") {
        // Rerender the node
        const nodeGfx = this.nodeIdToNodeGfx.get(change.id)!;
        if (!nodeGfx) continue;
        nodeGfx.node = { ...nodeGfx.node, ...change.changes };
        nodeGfx.render();

        // Rerender the edges connected to that node as well
        const edgeIds = this.nodeToEdges.get(change.id);
        if (!edgeIds) continue;
        for (const edgeId of edgeIds) {
          const edgeGfx = this.edgeIdToEdgeGfx.get(edgeId);
          if (!edgeGfx) continue;

          if (edgeGfx.edge.source === change.id) {
            edgeGfx.srcNodeGfx = this.nodeIdToNodeGfx.get(change.id)!;
          }
          if (edgeGfx.edge.target === change.id) {
            edgeGfx.tgtNodeGfx = this.nodeIdToNodeGfx.get(change.id)!;
          }

          edgeGfx.render();
        }
      }
    }
    this.requestRender();
  }
  renderEdgeChanges(changes: EdgeChange[]) {
    const layer = this.getLayer(Layers.EDGES);

    for (const change of changes) {
      if (!change) continue;
      if (change.type === "add") {
        const edge = change.item;
        const srcNodeGfx = this.nodeIdToNodeGfx.get(edge.source);
        const tgtNodeGfx = this.nodeIdToNodeGfx.get(edge.target);
        if (!srcNodeGfx || !tgtNodeGfx) {
          throw new Error("Fatal: Source or target Graphics undefined.");
        }
        // Create the edge
        const edgeGfx = this.viewRegistry.createEdge(
          edge.type,
          edge,
          srcNodeGfx,
          tgtNodeGfx
        );
        edgeGfx.render();
        layer.addChild(edgeGfx);

        this.edgeIdToEdgeGfx.set(edge.id, edgeGfx);

        const srcNodeSet = this.nodeToEdges.get(edge.source) ?? new Set();
        srcNodeSet?.add(edge.id);
        this.nodeToEdges.set(edge.source, srcNodeSet);

        const tgtNodeSet = this.nodeToEdges.get(edge.target) ?? new Set();
        tgtNodeSet.add(edge.id);
        this.nodeToEdges.set(edge.target, tgtNodeSet);

        // edgeGfx.setContext(this.context);
      } else if (change.type === "remove") {
        // Unmount the edge from the DOM
        const edgeGfx = this.edgeIdToEdgeGfx.get(change.id);
        if (!edgeGfx) continue;

        const sourceSet = this.nodeToEdges.get(edgeGfx.edge.source);
        const targetSet = this.nodeToEdges.get(edgeGfx.edge.target);

        if (sourceSet && sourceSet.has(change.id)) sourceSet.delete(change.id);
        if (targetSet && targetSet.has(change.id)) targetSet.delete(change.id);
        edgeGfx.destroy({ children: true });

        this.edgeIdToEdgeGfx.delete(change.id);
      } else if (change.type === "update") {
        // TODO: To be implemented
      }
    }
  }

  applyNodeChangesInternal(changes: NodeChange[], notify = true) {
    this.context?.store.applyNodeChanges(changes);

    if (notify)
      // Emit the event when the state is upated internally. Important to sync data with external store
      this.debouncedNodesNotif();

    this.renderNodeChanges(changes);
  }
  debouncedNodesNotif = debounce(
    () => {
      // Emit the event when the state is upated internally. Important to sync data with external store
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODES_UPDATE,
        this.context.store.getNodes()
      );
    },
    { trailing: true, leading: true, wait: 400 }
  );
  debouncedEdgeNotif = debounce(
    () => {
      // Emit the event when the state is upated internally. Important to sync data with external store
      this.context?.eventDispatcher.emit(
        GraphicleEventType.EDGES_UPDATE,
        this.context.store.getEdges()
      );
    },
    { trailing: true, leading: true, wait: 400 }
  );
  applyEdgeChangesInternal(changes: EdgeChange[], notify = true) {
    this.context?.store.applyEdgeChanges(changes);

    if (notify)
      // Emit the event when the state is upated internally. Important to sync data with external store
      this.debouncedEdgeNotif();

    this.renderEdgeChanges(changes);
  }
}
