import { create } from "zustand";

export interface ExampleStoreState {
  name: string;
  setName: (name: string) => void;
}
export const useExampleStore = create<ExampleStoreState>()((set) => ({
  name: "",
  setName: (value: string) => set(() => ({ name: value })),
}));
