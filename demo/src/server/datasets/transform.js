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
      id: `${idMap.get(edge.source)}_${idMap.get(edge.target)}`,
      source: idMap.get(edge.source),
      target: idMap.get(edge.target),
      value: edge.value,
    }));

  return {
    nodes: transformedNodes,
    edges: transformedEdges,
  };
}


// Load the source JSON file
export const  convertCytoscapeData = (sourceData) => {
  const nodeIdMap = new Map();
  const nodes = [];
  const edges = [];

  // Convert nodes
  for (const node of sourceData.elements.nodes) {
    const originalId = node.data.id;
    const newId = uuidv4();

    nodeIdMap.set(originalId, newId);

    nodes.push({
      id: newId,
      type: 'one',
      data: {
        label: originalId,
      },
    });
  }

  // Convert edges
  for (const edge of sourceData.elements.edges) {
    const sourceOriginal = edge.data.source;
    const targetOriginal = edge.data.target;

    const sourceUUID = nodeIdMap.get(sourceOriginal);
    const targetUUID = nodeIdMap.get(targetOriginal);

    if (!sourceUUID || !targetUUID) {
      console.warn(`Missing node UUID for edge from ${sourceOriginal} to ${targetOriginal}`);
      continue;
    }

    edges.push({
      id: `${sourceUUID}_${targetUUID}`,
      source: sourceUUID,
      target: targetUUID,
      value: edge.data.value ?? 1,
    });
  }

  return { nodes, edges };
}

export const  convertElements = (elements) => {
  const nodeIdMap = new Map(); // Map from original ID -> UUID
  const nodes = [];
  const edges = [];

  for (const el of elements) {
    if (el.group === 'nodes') {
      const originalId = el.data.id;
      const label = el.data.name ?? originalId;
      const newId = uuidv4();

      nodeIdMap.set(originalId, newId);

      nodes.push({
        id: newId,
        type: 'one',
        data: {
          label,
        },
      });
    }
  }

  for (const el of elements) {
    if (el.group === 'edges') {
      const sourceOriginal = el.data.source;
      const targetOriginal = el.data.target;

      const sourceUUID = nodeIdMap.get(sourceOriginal);
      const targetUUID = nodeIdMap.get(targetOriginal);

      if (!sourceUUID || !targetUUID) {
        console.warn(`Skipping edge: missing node for ${sourceOriginal} → ${targetOriginal}`);
        continue;
      }

      edges.push({
        id: `${sourceUUID}_${targetUUID}`,
        source: sourceUUID,
        target: targetUUID,
        value: el.data.score ?? 1,
      });
    }
  }

  return { nodes, edges };
}

export const  convertVisData = (nodes, edges) => {
  const nodeIdMap = new Map();
  const convertedNodes = [];
  const convertedEdges = [];

  // Map nodes to UUIDs and convert
  for (const node of nodes) {
    const uuid = uuidv4();
    nodeIdMap.set(node.id, uuid);

    convertedNodes.push({
      id: uuid,
      type: 'one',
      data: {
        label: node.label,
        // Optional: you could extract Country/Team from `title` if needed
      }
    });
  }

  // Convert edges
  for (const edge of edges) {
    const fromUUID = nodeIdMap.get(edge.from);
    const toUUID = nodeIdMap.get(edge.to);

    if (!fromUUID || !toUUID) {
      console.warn(`Skipping edge from ${edge.from} to ${edge.to} - missing node`);
      continue;
    }

    convertedEdges.push({
      id: `${fromUUID}_${toUUID}`,
      source: fromUUID,
      target: toUUID,
      value: 1, // Static for now, or use something else from edge if needed
    });
  }

  return {
    nodes: convertedNodes,
    edges: convertedEdges,
  };
}