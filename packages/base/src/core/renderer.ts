import { Container, Graphics, Point } from "pixi.js";

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
import { GraphicleEventType } from "./dispatcher";

import GraphicleContext, { ContextClient } from "./context";
import GraphicleViewport from "./viewport";
import { ViewRegistry } from "./view";

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

  protected renderRequestId: number | null; // Request render

  constructor(viewport: GraphicleViewport, { nodes, edges }: GraphData) {
    this.viewport = viewport;
    this.context = null;
    this.nodeIdToNodeGfx = new Map();
    this.edgeIdToEdgeGfx = new Map();

    this.viewRegistry = new ViewRegistry();

    this.initializeLayers();
    this.initializeNodes(nodes);
    this.initializeEdges(edges);

    // Request render
    this.renderRequestId = null;
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
    const drawingLayer = new Container();
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

    const nodeIdGfxPairs: [NodeId, NodeGfx][] = nodes.map((node) => {
      // Create the node
      const nodeGfx = this.viewRegistry.createNode(node.type, node);

      // Inject the context in each nodes
      nodeGfx.setContext(this.context);
      layer.addChild(nodeGfx);

      return [node.id, nodeGfx];
    });

    this.nodeIdToNodeGfx = new Map(nodeIdGfxPairs);
  }
  initializeEdges(edges: Edge[]) {
    const layer = this.getLayer(Layers.EDGES);
    layer.removeChildren();

    const edgeIdGfxPairs: [EdgeId, EdgeGfx][] = edges.map((edge) => {
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
      layer.addChild(edgeGfx);

      return [edge.id, edgeGfx];
    });

    this.edgeIdToEdgeGfx = new Map(edgeIdGfxPairs);
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
  updateNodesPosition(nodes: Node[]) {
    this.context?.store.updateNodes(nodes);

    // Render nodes
    nodes.forEach((node: Node) => {
      // Get the graphical node and update its position
      const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
      if (!nodeGfx) return;
      nodeGfx.node = node;
      nodeGfx.x = node.position.x;
      nodeGfx.y = node.position.y;
      nodeGfx.cursor = "grabbing";

      // Get all edges connected to that node
      const edges = [...this.edgeIdToEdgeGfx.values()].filter(
        (eds) => eds?.edge.target === node.id || eds?.edge.source === node.id
      );

      edges.forEach((eds) => {
        // Update line
        eds.srcNodeGfx = this.nodeIdToNodeGfx.get(eds.edge.source)!;
        eds.tgtNodeGfx = this.nodeIdToNodeGfx.get(eds.edge.target)!;
        eds.updatePosition();
      });
      this.requestRender();
    });
  }

  updateSelectedNodes(nodes: Node[]) {
    nodes?.forEach((node: Node) => {
      // Get the graphical node and update its position
      const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
      if (!nodeGfx) return;
      nodeGfx.node = node;
      // FIXME: Maybe implement a default behaviour that can be overriden ?
      // if (node.selected) nodeGfx.alpha = 1;
      // else {
      //   nodeGfx.alpha = 0.9;
      // }
    });
  }
  updateNodeCursor(node: Node) {
    const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
    if (!nodeGfx) return;
    nodeGfx.cursor = "grab";
    this.requestRender();
  }
  unselectAllNodes() {
    const nextNodes = this.context?.store.getNodes().map((n) => ({
      ...n,
      selected: false,
    }));

    this.context?.eventDispatcher.emit(
      GraphicleEventType.NODES_UNSELECT,
      nextNodes,
      null
    );
    if (!nextNodes) return;

    this.context?.store.updateNodes(nextNodes);
    this.updateSelectedNodes(nextNodes);
    this.requestRender();
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
      nodes.forEach((node) => {
        const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
        if (!nodeGfx) return;
        const { x, y } = nodeGfx.getCenter();
        // @ts-expect-error it does have containsPoint FIXME:
        const contains = rectangle.containsPoint(new Point(x, y));
        node.selected = contains;
      });

      this.context?.store.updateNodes(nodes);
      this.updateSelectedNodes(nodes);
      rectangle?.destroy({ context: false });
    }
  }
  setSelectNode(node: Node, value: boolean) {
    if (value) {
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODES_SELECT,
        [node],
        null
      );
    } else {
      this.context?.eventDispatcher.emit(
        GraphicleEventType.NODES_UNSELECT,
        [node],
        null
      );
    }
    // const newNode = {...node, selected:value}
    node.selected = value;
    this.context?.store.updateNodes([node]);
    this.updateSelectedNodes([node]);
  }
  requestRender() {
    if (this.renderRequestId) return;
    this.renderRequestId = window.requestAnimationFrame(() => {
      this.context?.app.render();
      this.renderRequestId = null;
    });
  }

  switchView(viewName?: string) {
    this.viewRegistry.setCurrentView(viewName ?? "default");

    const nodes = this.context?.store.getNodes();
    const edges = this.context?.store.getEdges();
    if (nodes && edges) {
      this.initializeNodes(nodes);
      this.initializeEdges(edges);
      this.requestRender();
    }
  }
}
