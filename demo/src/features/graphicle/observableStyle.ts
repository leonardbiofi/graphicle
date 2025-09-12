import { StoreApi, create } from "zustand";

export class ObservableStyle<TStyle extends object> {
  private store: StoreApi<TStyle>;

  constructor(initialStyle: TStyle) {
    this.store = create<TStyle>((_set) => initialStyle);
  }

  get(): TStyle {
    return this.store.getState();
  }

  set(partial: Partial<TStyle>) {
    this.store.setState((state) => ({ ...state, ...partial }));
  }

  subscribe(listener: (state: TStyle) => void): () => void {
    return this.store.subscribe(listener);
  }
}
