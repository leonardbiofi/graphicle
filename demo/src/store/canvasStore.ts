import { create } from "zustand";

interface CanvasState {
  nodes: [];
  edges: [];
  setNodes: (nodes: []) => void;
  setEdges: (edges: []) => void;
}
export const useCanvasStore = create<CanvasState>()((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes: []) => set(() => ({ nodes })),
  setEdges: (edges: []) => set(() => ({ edges })),
}));
