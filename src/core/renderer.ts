import { Container } from "pixi.js";

import type {
  GraphData,
  Node,
  Edge,
  NodeId,
  EdgeId,
  EdgeGfx,
  NodeGfx,
} from "./types";
import type { ConfigCustomNodeAndEdge } from "./types";

import DefaultNode from "./nodes/default";
import StraightEdge from "./edges/straight";
import GraphicleContext, { ContextClient } from "./context";
import GraphicleViewport from "./viewport";

export enum Layers {
  GROUPS = "groups",
  NODES = "nodes",
  EDGES = "edges",
  DRAWING = "drawing",
}

type RendererOptions = ConfigCustomNodeAndEdge;

export default class GraphicleRenderer implements ContextClient {
  viewport: GraphicleViewport;
  context: GraphicleContext | null;
  nodeIdToNodeGfx: Map<NodeId, NodeGfx>;
  edgeIdToEdgeGfx: Map<EdgeId, EdgeGfx>;

  options: RendererOptions; // Rendering options
  protected renderRequestId: number | null; // Request render

  constructor(
    viewport: GraphicleViewport,
    { nodes, edges }: GraphData,
    options: RendererOptions
  ) {
    this.viewport = viewport;
    this.context = null;
    this.nodeIdToNodeGfx = new Map();
    this.edgeIdToEdgeGfx = new Map();

    this.options = options;

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

  getLayer(label: Layers) {
    const layer = this.viewport.getChildByLabel(label);

    console.log(label, layer);
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
      const nodeGfx = this.addNode(node);
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
      const edgeGfx = this.addEdge(edge, srcNodeGfx, tgtNodeGfx);
      layer.addChild(edgeGfx);

      return [edge.id, edgeGfx];
    });

    this.edgeIdToEdgeGfx = new Map(edgeIdGfxPairs);
  }

  addNode(node: Node): NodeGfx {
    let customNode = this.options.customNodes[node.type];
    if (!customNode) {
      console.warn("Unknown node type falling back to default");
      customNode = new DefaultNode(node);
    }

    return customNode;
  }

  addEdge(edge: Edge, sourceGfx: NodeGfx, targetGfx: NodeGfx): EdgeGfx {
    let customEdge = this.options.customEdges[edge.type];
    if (!customEdge) {
      console.warn("Unknown edge type falling back to straight");
      customEdge = new StraightEdge(edge, sourceGfx, targetGfx);
    }

    return customEdge;
  }
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

  updateSelectedNodes() {
    const nodes = this.context?.store.getNodes();

    nodes?.forEach((node: Node) => {
      // Get the graphical node and update its position
      const nodeGfx = this.nodeIdToNodeGfx.get(node.id);
      if (!nodeGfx) return;

      if (node.selected) nodeGfx.tint = "red";
      else {
        nodeGfx.tint = "gray";
      }
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
    if (!nextNodes) return;

    this.context?.store.updateNodes(nextNodes);
  }
  setSelectNode(node: Node, value: boolean) {
    this.context?.store.updateNodes([{ ...node, selected: value }]);
  }
  requestRender() {
    if (this.renderRequestId) return;
    this.renderRequestId = window.requestAnimationFrame(() => {
      this.context?.app.render();
      this.renderRequestId = null;
    });
  }
}
