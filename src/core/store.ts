import type { Node, NodeId, EdgeId, Edge } from "./types";

export type AppState = {
  nodes: Record<NodeId, Node>;
  edges: Record<EdgeId, Edge>;
  nodeDrag: Node | null
};

export class GraphicleStore {
  private _state: AppState;

  constructor(initialState?: Partial<AppState>) {
    this._state = {
      nodes: {},
      edges: {},
      nodeDrag: null
      ...initialState,
    };
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
  setNodeDrag(payload: Node |null) {
    this.state.nodeDrag = payload
  }
  updateNodes(nodes: Node[]) {
    nodes.forEach((n) => {
      // get node
      const node = this.state.nodes[n.id];
      if (node) this.state.nodes[n.id] = { ...node, ...n };
    });
    // this.state.nodes.map(n => )
  }

  setState(nextState: Partial<AppState>) {
    this._state = { ...this.state, ...nextState };
  }
}
