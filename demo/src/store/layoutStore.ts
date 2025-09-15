import { create } from "zustand";

export interface ForceLayoutState {
  active: boolean;
  setActive: (value: boolean) => void;
}
export const useForceLayoutStore = create<ForceLayoutState>()((set) => ({
  active: false,
  setActive: (value: boolean) => set(() => ({ active: value })),
}));
