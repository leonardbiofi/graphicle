import { Viewport } from "pixi-viewport";
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
import { D3Force, LayoutContext } from "../layout";
import type { ConfigCustomNodeAndEdge } from "./types";

import DefaultNode from "./nodes/default";

export enum Layers {
  GROUPS = "groups",
  NODES = "nodes",
  EDGES = "edges",
  DRAWING = "drawing",
}

type RendererOptions = ConfigCustomNodeAndEdge;

export default class GraphicleRenderer {
  viewport: Viewport;
  nodeIdToNodeGfx: Map<NodeId, NodeGfx>;
  edgeIdToEdgeGfx: Map<EdgeId, EdgeGfx>;

  options: RendererOptions;
  constructor(
    viewport: Viewport,
    { nodes, edges }: GraphData,
    options: RendererOptions
  ) {
    this.viewport = viewport;
    this.nodeIdToNodeGfx = new Map();
    this.edgeIdToEdgeGfx = new Map();

    this.options = options;
    const layout = new LayoutContext(new D3Force());

    // TODO: Allow user to choose the layouting strategies
    // Maybe don't run a layout on initilization
    const positionedNodes = layout.runLayout({ nodes, edges });
    this.initializeLayers();
    this.initializeNodes(positionedNodes);
    this.initializeEdges(edges);
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
  initializeEdges(_edges: Edge[]) {
    // const layer = this.getLayer(Layers.EDGES);
    // layer.removeChildren();
    // const edgeIdGfxPairs: [EdgeId, EdgeGfx][] = edges.map((edge) => {
    //   const srcnodeGfx = this.nodeIdToNodeGfx.get(edge.source);
    //   const tgtnodeGfx = this.nodeIdToNodeGfx.get(edge.target);
    //   if (!srcnodeGfx || !tgtnodeGfx)
    //     throw new Error("Fatal: Source or target Graphics undefined.");
    //   const edgeGfx = this.addEdge(edge, srcnodeGfx, tgtnodeGfx);
    //   layer.addChild(edgeGfx);
    //   return [edge.id, edgeGfx];
    // });
    // this.edgeIdToEdgeGfx = new Map(edgeIdGfxPairs);
  }

  addNode(node: Node): NodeGfx {
    let customNode = this.options.customNodes[node.type];
    if (!customNode) {
      console.warn("Unknown node type falling back to default");
      customNode = new DefaultNode(node);
    }

    return customNode;
  }

  // addEdge(edge: Edge, sourceGfx: NodeGfx, targetGfx: NodeGfx): EdgeGfx {}
}
