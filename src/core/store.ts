type Node = {
  id: string;
  type: string;
  data: any;
};
type Edge = {
  id: string;
  type: string;
  source: string;
  target: string;
};

export type AppState = {
  nodes: Node[];
  edges: Edge[];
};

export class GraphicleStore {
  state: AppState;
  constructor(initialState?: Partial<AppState>) {
    this.state = {
      nodes: [],
      edges: [],

      ...initialState,
    };
  }

  getState() {
    return this.state;
  }

  setState(nextState: Partial<AppState>) {
    this.state = { ...this.state, ...nextState };
  }
}
