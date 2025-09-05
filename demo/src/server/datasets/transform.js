// transformGraph.ts

import { v4 as uuidv4 } from "uuid";

// interface InputNode {
//   id: string;
//   type: string;
// }

// interface InputEdge {
//   source: string;
//   target: string;
//   value: number;
// }

// interface OutputNode {
//   id: string; // UUID
//   type: string;
//   data: {
//     label: string;
//   };
// }

// interface OutputEdge {
//   source: string; // UUID
//   target: string; // UUID
//   value: number;
// }

// interface GraphOutput {
//   nodes: OutputNode[];
//   edges: OutputEdge[];
// }

export function transformGraph(
  nodes,
  edges
) {
  const idMap = new Map();

  // Transform nodes and generate UUIDs
  const transformedNodes = nodes.map((node) => {
    const newId = uuidv4();
    idMap.set(node.id, newId);
    return {
      id: newId,
      type: node.type,
      data: {
        label: node.id,
      },
    };
  });

  // Filter out edges with unknown nodes and transform them
  const transformedEdges = edges
    .filter((edge) => idMap.has(edge.source) && idMap.has(edge.target))
    .map((edge) => ({
      source: idMap.get(edge.source),
      target: idMap.get(edge.target),
      value: edge.value,
    }));

  return {
    nodes: transformedNodes,
    edges: transformedEdges,
  };
}
