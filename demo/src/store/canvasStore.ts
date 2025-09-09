import { create } from "zustand";
import { createSelector } from "reselect";
import { Node, Edge } from "@graphicle/base";
interface CanvasStoreState {
  nodes: Node[];
  edges: Edge[];
  selectedNodes: Node[];
  selectNodes: (nodes: Node[]) => void;
  unselectNodes: (nodes: Node[]) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}
export const useCanvasStore = create<CanvasStoreState>()((set) => ({
  nodes: [],
  edges: [],
  selectedNodes: [],
  selectNodes: (nodes: Node[]) =>
    set((state) => ({ selectedNodes: [...nodes, ...state.selectedNodes] })),
  unselectNodes: (nodes: Node[]) =>
    set((state) => {
      const unselectIds = nodes.map((n) => n.id);
      const nextNodes = state.selectedNodes.filter(
        (n) => !unselectIds.includes(n.id)
      );
      return { selectedNodes: nextNodes };
    }),

  setNodes: (nodes: Node[]) => set(() => ({ nodes })),
  setEdges: (edges: Edge[]) => set(() => ({ edges })),
}));

export const selectNodeTypes = createSelector(
  (state: CanvasStoreState) => state.nodes,
  (nodes: Node[]) => {
    const nodeTypes = new Set(nodes.map((n) => n.type));
    return [...nodeTypes].sort();
  }
);

export const selectEdgeTypes = createSelector(
  (state: CanvasStoreState) => state.edges,
  (edges: Edge[]) => {
    const nodeTypes = new Set(edges.map((n) => n.type));
    return [...nodeTypes].sort();
  }
);
