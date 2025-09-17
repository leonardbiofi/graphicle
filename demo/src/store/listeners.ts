import { deepEqual } from "fast-equals";
import type { Change } from "@graphicle/base";
// export type DiffArraysResults<T> = {
//   added: T[];
//   removed: T[];
//   changed: T[];
//   unchanged: T[];
// };
export const diffArrays = <T, K extends keyof T>(
  prevArray: T[],
  nextArray: T[],
  key: K
): Change<T>[] => {
  //   const added = [];
  //   const removed = [];
  //   const changed = [];
  //   const unchanged = [];

  const changes: Change<T>[] = [];

  const prevMap = new Map<T[K], T>(prevArray.map((obj) => [obj[key], obj]));
  const nextMap = new Map<T[K], T>(nextArray.map((obj) => [obj[key], obj]));

  // Compare objects in prevArray to nextArray
  for (const [id, prevObj] of prevMap) {
    const nextObj = nextMap.get(id);

    if (!nextObj) {
      // Object was removed
      changes.push({ type: "remove", id: id as string });
      //   removed.push(prevObj);
    } else if (prevObj !== nextObj && !deepEqual(prevObj, nextObj)) {
      changes.push({
        type: "update",
        id: id as string,
        changes: { ...nextObj },
      });
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
