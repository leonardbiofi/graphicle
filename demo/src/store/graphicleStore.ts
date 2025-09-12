import { create } from "zustand";
import { createSelector } from "reselect";
import { Node, Edge } from "@graphicle/base";
import { subscribeWithSelector } from "zustand/middleware";
import { diffArrays } from "./listeners";
import { getGraphicle } from "@/components/GraphicleProvider";
export interface GraphicleStoreState {
  nodes: Node[];
  edges: Edge[];
  selectedNodes: Node[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}
export const useGraphicleStore = create<GraphicleStoreState>()(
  subscribeWithSelector((set) => ({
    graphicle: null,
    nodes: [],
    edges: [],
    selectedNodes: [],
    setNodes: (nodes) => set(() => ({ nodes })),
    setEdges: (edges) => set(() => ({ edges })),
  }))
);

const unsub3 = useGraphicleStore.subscribe(
  (state): [Node[], Edge[]] => [state.nodes, state.edges],
  ([nodes, edges], [previousNodes, previousEdges]) => {
    const diffNodes = diffArrays<Node>(previousNodes, nodes);
    const diffEdges = diffArrays<Edge>(previousEdges, edges);

    const graphicle = getGraphicle();

    if (!graphicle) return;

    graphicle.context.renderer.applyNodeChangesInternal(diffNodes, false);
    graphicle.context.renderer.applyEdgeChangesInternal(diffEdges, false);
    // console.log("GRAPHICLE:", graphicle, diffEdges, diffNodes);
  },
  {
    equalityFn: () => false,
  }
);

export const selectedNodes = createSelector(
  (state) => state.nodes,
  (nodes: Node[]) => {
    const selectedNodes = nodes.filter((n) => n.selected);
    return [...selectedNodes];
  }
);
export const selectNodeTypes = createSelector(
  (state: GraphicleStoreState) => state.nodes,
  (nodes: Node[]) => {
    const nodeTypes = new Set(nodes.map((n) => n.type));
    return [...nodeTypes].sort();
  }
);

export const selectEdgeTypes = createSelector(
  (state: GraphicleStoreState) => state.edges,
  (edges: Edge[]) => {
    const nodeTypes = new Set(edges.map((n) => n.type));
    return [...nodeTypes].sort();
  }
);
