import { create } from "zustand";
import { createSelector, lruMemoize, createSelectorCreator } from "reselect";
import { Node, Edge } from "@graphicle/base";
import { subscribeWithSelector } from "zustand/middleware";
import { diffArrays } from "./listeners";
import { getGraphicle } from "@/components/GraphicleProvider";
import { throttle } from "@tanstack/pacer";
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

useGraphicleStore.subscribe(
  (state) => state.nodes,
  (nodes, previousNodes) => {
    const graphicle = getGraphicle();
    if (!graphicle) return;
    const diffNodes = diffArrays<Node, "id">(previousNodes, nodes, "id");
    graphicle.context.renderer.applyNodeChangesInternal(diffNodes, false);
  },
  {
    equalityFn: () => false,
  }
);

useGraphicleStore.subscribe(
  (state) => state.edges,
  (edges, previousEdges) => {
    const graphicle = getGraphicle();
    if (!graphicle) return;
    const diffEdges = diffArrays<Edge, "id">(previousEdges, edges, "id");
    graphicle.context.renderer.applyEdgeChangesInternal(diffEdges, false);
  },
  {
    equalityFn: () => false,
  }
);
// const unsub3 = useGraphicleStore.subscribe(
//   (state): [Node[], Edge[]] => [state.nodes, state.edges],
//   ([nodes, edges], [previousNodes, previousEdges]) => {
//     const graphicle = getGraphicle();
//     if (!graphicle) return;

//     const diffNodes = diffArrays<Node, "id">(previousNodes, nodes, "id");
//     const diffEdges = diffArrays<Edge, "id">(previousEdges, edges, "id");
//     graphicle.context.renderer.applyNodeChangesInternal(diffNodes, false);
//     graphicle.context.renderer.applyEdgeChangesInternal(diffEdges, false); // graphicle.context.renderer.applyNodeChangesInternal(diffNodes, false);
//     // graphicle.context.renderer.applyEdgeChangesInternal(diffEdges, false);
//     // console.log("GRAPHICLE:", graphicle, diffEdges, diffNodes);
//   },
//   {
//     equalityFn: () => false,
//   }
// );

export const selectedNodes = createSelector(
  (state) => state.nodes,
  (nodes: Node[]) => {
    const selectedNodes = nodes.filter((n) => n.selected);
    return [...selectedNodes];
  }
);

function areArraysEqual(a: string[], b: string[]): boolean {
  // console.log("EQUAL:", a, b);
  if (a.length !== b.length) return false;
  if (a === b) return true;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const createSelectorShallowEqual = createSelectorCreator({
  memoize: lruMemoize,
  memoizeOptions: {
    // equalityCheck: areArraysEqual,
    resultEqualityCheck: areArraysEqual,
    // maxSize: 10,
  },
  // argsMemoize: lruMemoize,
  // argsMemoizeOptions: {
  //   equalityCheck: areArraysEqual,
  //   // resultEqualityCheck: areArraysEqual,
  //   maxSize: 10,
  // },
});
export const selectNodeTypes = createSelectorShallowEqual(
  [(state: GraphicleStoreState) => state.nodes],
  (nodes: Node[]) => {
    const nodeTypes = new Set(nodes.map((n) => n.type));
    return [...nodeTypes].sort();
  }
);

export const selectEdgeTypes = createSelectorShallowEqual(
  [(state: GraphicleStoreState) => state.edges],
  (edges: Edge[]) => {
    const edgeTypes = new Set(edges.map((eds) => eds.type));
    return [...edgeTypes].sort();
  }
);
