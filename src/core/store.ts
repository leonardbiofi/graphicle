import { GraphData } from "./types";

export type AppState = {} & GraphData;

export class GraphicleStore {
  private _state: AppState;

  constructor(initialState?: Partial<AppState>) {
    this._state = {
      nodes: [],
      edges: [],

      ...initialState,
    };
  }

  get state() {
    return this._state;
  }

  setState(nextState: Partial<AppState>) {
    this._state = { ...this.state, ...nextState };
  }
}
