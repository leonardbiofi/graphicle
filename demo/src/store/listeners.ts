import { useGraphicleStore } from "./graphicleStore";
import deepEqual from "fast-deep-equal";
import type { Change, Node, Edge } from "@graphicle/base";
import { getGraphicle } from "@/components/GraphicleProvider";
// export type DiffArraysResults<T> = {
//   added: T[];
//   removed: T[];
//   changed: T[];
//   unchanged: T[];
// };
export const diffArrays = <T>(
  prevArray: T[],
  nextArray: T[],
  key = "id"
): Change<T>[] => {
  //   const added = [];
  //   const removed = [];
  //   const changed = [];
  //   const unchanged = [];

  const changes: Change<T>[] = [];

  // @ts-expect-error FIXME: fix typescript error
  const prevMap = new Map<any, T>(prevArray.map((obj) => [obj[key], obj]));
  // @ts-expect-error FIXME: fix typescript error
  const nextMap = new Map<any, T>(nextArray.map((obj) => [obj[key], obj]));

  // Compare objects in prevArray to nextArray
  for (const [id, prevObj] of prevMap) {
    const nextObj = nextMap.get(id);

    if (!nextObj) {
      // Object was removed
      changes.push({ type: "remove", id });
      //   removed.push(prevObj);
    } else if (!deepEqual(prevObj, nextObj)) {
      changes.push({ type: "update", id, changes: { ...nextObj } });
      //   console.log("Changed:", prevObj, nextObj);
      // Object was changed
      //   changed.push(nextObj);
    } else {
      continue;
      // Object is unchanged
      //   unchanged.push(prevObj);
    }
  }

  // Check for added objects in nextArray
  for (const [id, nextObj] of nextMap) {
    if (!prevMap.has(id)) {
      changes.push({ type: "add", item: { ...nextObj } });
      // Object was added
      //   added.push(nextObj);
    }
  }

  return changes;
};

const unsub3 = useGraphicleStore.subscribe(
  (state): [Node[], Edge[]] => [state.nodes, state.edges],
  ([nodes, edges], [previousNodes, previousEdges]) => {
    const diffNodes = diffArrays<Node>(previousNodes, nodes);
    const diffEdges = diffArrays<Edge>(previousEdges, edges);

    const graphicle = getGraphicle();
    if (!graphicle) return;

    graphicle.context.renderer.applyNodeChangesInternal(diffNodes, false);
    graphicle.context.renderer.applyEdgeChangesInternal(diffEdges, false);
  }
);
