import type { Node, NodeId, EdgeId, Edge } from "./types";

export type AppState = {
  nodes: Record<NodeId, Node>;
  edges: Record<EdgeId, Edge>;
  selectedNodes: Record<NodeId, Node>;
  // dragCandidates: { nodes: Record<NodeId, Node>; edges: Record<EdgeId, Edge> };
  nodeDrag: Node | null;
  nodeClicked: Node | null;
};

export class GraphicleStore {
  private _state: AppState;

  constructor(initialState?: { nodes: Node[]; edges: Edge[] }) {
    this._state = {
      nodeDrag: null,
      nodeClicked: null,
      nodes: {},
      edges: {},
      selectedNodes: {},
    };

    if (initialState?.nodes) {
      // TODO: Validate nodes
      const nextNodes = initialState.nodes.map((n) => ({
        ...n,
        selected: false,
      }));
      this.setNodes(nextNodes);
    }

    //TODO: Validate edges
    if (initialState?.edges) this.setEdges(initialState.edges);

    // Each node must know which edges are connected to him. Allow fastest code execution for node drag
  }

  get state() {
    return this._state;
  }
  getNodes(): Node[] {
    return Object.values(this.state.nodes);
  }
  getEdges(): Edge[] {
    return Object.values(this.state.edges);
  }
  getSelectedNodes(): Node[] {
    return Object.values(this.state.selectedNodes);
  }
  setNodes(nodes: Node[]) {
    nodes.forEach((node) => {
      this._state.nodes[node.id] = { ...node };
    });
  }
  // setSelectedNodes(nodes: Node[]) {
  //   nodes.forEach((node) => {
  //     this._state.selectedNodes[node.id] = { ...node };
  //   });
  // }
  setEdges(edges: Edge[]) {
    edges.forEach((edge) => {
      this._state.edges[edge.id] = { ...edge };
    });
  }
  setNodeDrag(payload: Node | null) {
    this.state.nodeDrag = payload;
  }
  setNodeClicked(payload: Node | null) {
    this.state.nodeClicked = payload;
  }
  updateNodes(nodes: Node[], refreshSelected: boolean = false) {
    nodes.forEach((n) => {
      // get node
      const node = this.state.nodes[n.id];
      if (node) this.state.nodes[n.id] = { ...node, ...n };
    });
    if (refreshSelected) {
      this.state.selectedNodes = {};
      this.getNodes().forEach((n) => {
        if (n.selected) this.state.selectedNodes[n.id] = { ...n };
      });
    }
  }

  setState(nextState: Partial<AppState>) {
    this._state = { ...this.state, ...nextState };
  }
}
