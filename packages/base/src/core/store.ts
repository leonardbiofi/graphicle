import type { Node, NodeId, EdgeId, Edge } from "./types";

export type AppState = {
  nodes: Record<NodeId, Node>;
  edges: Record<EdgeId, Edge>;
  selectedNodes: Array<Node>;
  // dragCandidates: { nodes: Record<NodeId, Node>; edges: Record<EdgeId, Edge> };
  nodeClicked: Node | null;
};

export class GraphicleStore {
  private _state: AppState;

  constructor(initialState?: { nodes: Node[]; edges: Edge[] }) {
    this._state = {
      nodeClicked: null,
      nodes: {},
      edges: {},
      selectedNodes: [],
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
    return this.state.selectedNodes;
  }
  setNodes(nodes: Node[]) {
    nodes.forEach((node) => {
      this._state.nodes[node.id] = { ...node };
    });
  }

  setEdges(edges: Edge[]) {
    edges.forEach((edge) => {
      this._state.edges[edge.id] = { ...edge };
    });
  }

  setNodeClicked(payload: Node | null) {
    this.state.nodeClicked = payload;
  }
  // updateNodes(nodes: Node[], refreshSelected: boolean = false) {
  //   nodes.forEach((n) => {
  //     // get node
  //     const node = this.state.nodes[n.id];
  //     if (node) this.state.nodes[n.id] = { ...node, ...n };
  //   });
  //   if (refreshSelected) {
  //     this.state.selectedNodes = {};
  //     this.getNodes().forEach((n) => {
  //       if (n.selected) this.state.selectedNodes[n.id] = { ...n };
  //     });
  //   }
  // }

  applyNodeChanges(changes: NodeChange[]) {
    let refreshSelected = false;
    const nextNodes = changes.reduce<Record<NodeId, Node>>(
      (nodes, change) => {
        switch (change?.type) {
          case "add":
            nodes[change.item.id] = { ...change.item };
            return nodes;
          // return [...nodes, change.item];
          case "remove":
            delete nodes[change.id];
            return nodes;
          // return nodes.filter((node) => node.id !== change.id);
          case "update":
            nodes[change.id] = { ...nodes[change.id], ...change.changes };

            // If changes includes selected then it's important to refresh the selected
            if (!refreshSelected && change.changes.hasOwnProperty("selected")) {
              refreshSelected = true;
            }

            return nodes;

          default:
            return nodes;
        }
      },
      { ...this._state.nodes }
    );

    if (refreshSelected) {
      this._state.selectedNodes = Object.values(nextNodes).filter(
        (n) => n.selected
      );
    }
    this._state.nodes = nextNodes;
  }
  applyEdgeChanges(changes: EdgeChange[]) {
    const nextEdges = changes.reduce<Record<EdgeId, Edge>>(
      (edges, change) => {
        switch (change?.type) {
          case "add":
            edges[change.item.id] = { ...change.item };
            return edges;
          // return [...edges, change.item];
          case "remove":
            delete edges[change.id];
            return edges;
          // return edges.filter((node) => node.id !== change.id);
          case "update":
            edges[change.id] = { ...edges[change.id], ...changes };
            return edges;

          default:
            return edges;
        }
      },
      { ...this._state.edges }
    );

    this._state.edges = nextEdges;
  }

  setState(nextState: Partial<AppState>) {
    this._state = { ...this.state, ...nextState };
  }
}

// DIFF SYNC SYSTEM

export type Change<T> =
  | { type: "add"; item: T }
  | { type: "remove"; id: string }
  | { type: "update"; id: string; changes: Partial<T> };

export type NodeChange = Change<Node>;
export type EdgeChange = Change<Edge>;
