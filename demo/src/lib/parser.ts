import type { GraphData, Node } from "@graphicle/base";

type EdgeType = {
  id: string;
  source: string;
  target: string;
  type: string;
};

type GraphJSON = {
  nodes: Node[];
  edges: EdgeType[];
};

const parseFile = (file: File, parseFn: Function): Promise<GraphJSON> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = await parseFn(event.target?.result as string);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

/**
 *
 * @param data
 * @returns
 */
const parseGraphicleJson = (data: string): Promise<GraphJSON> =>
  new Promise((resolve, reject) => {
    try {
      const json = JSON.parse(data);
      resolve(json);
    } catch (err) {
      reject(err);
    }
  });

const parseGraphMLToJSON = (graphml: string): Promise<GraphData> =>
  new Promise((resolve, reject) => {
    try {
      // console.log("graphml", graphml);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(graphml, "application/xml");

      const nodeElements = xmlDoc.getElementsByTagName("node");
      const edgeElements = xmlDoc.getElementsByTagName("edge");

      const nodes: Node[] = [];
      const edges: EdgeType[] = [];

      const getNodeType = (element: Element): string => {
        const typeData = element.querySelector('data[key="type"]');
        return typeData?.textContent?.trim() || "unknown";
      };

      const getNodeLabel = (element: Element): string => {
        const labelData = element.querySelector('data[key="label"]');
        return labelData?.textContent?.trim() || "";
      };

      for (const nodeElement of Array.from(nodeElements)) {
        const id = nodeElement.getAttribute("id") || "";
        nodes.push({
          id,
          type: getNodeType(nodeElement),
          data: {
            label: getNodeLabel(nodeElement),
          },
          // @ts-expect-error FIXME: typescript error
          position: { x: undefined, y: undefined },
          selected: false,
        });
      }

      const getEdgeType = (element: Element): string => {
        const typeData = element.querySelector('data[key="type"]');
        return typeData?.textContent?.trim() || "unknown";
      };

      for (const edgeElement of Array.from(edgeElements)) {
        // const id = edgeElement.getAttribute("id") || "";
        const source = edgeElement.getAttribute("source") || "";
        const target = edgeElement.getAttribute("target") || "";
        edges.push({
          id: `${source}_${target}`,
          source,
          target,
          type: getEdgeType(edgeElement),
        });
      }

      resolve({ nodes, edges });
    } catch (err) {
      reject(err);
    }
  });

const parseSIFFileToJson = async (sif: string): Promise<GraphData> => {
  const usesTab = sif.includes("\t");
  // If tabs exist anywhere, use tab delimiter. Otherwise, use spaces.
  const delimiter = usesTab ? "\t" : /\s+/;

  const nodesMap = new Map(); // name → { id, name }
  const edgesMap = new Map(); // key “source|target|type” → edge object

  function ensureNode(name: string) {
    if (!nodesMap.has(name)) {
      nodesMap.set(name, { id: name, data: { label: name } });
    }
    return nodesMap.get(name);
  }

  const lines = sif.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") continue;

    // Split by tab (if using tab), else by spaces
    const parts = usesTab ? line.split("\t") : line.split(delimiter);
    // console.log(parts);

    if (parts.length === 1) {
      // Just a node name, no edges
      const nodeName = parts[0];
      ensureNode(nodeName);
      continue;
    }

    // At least 3 parts: source, relationship, target(s)
    const sourceName = parts[0];
    const relType = parts[1];
    const targetNames = parts[2].split(" ");

    const sourceNode = ensureNode(sourceName);

    for (const tname of targetNames) {
      const targetNode = ensureNode(tname);

      // Edge key to dedupe: allow same source/target only if different type
      const edgeKey = `${sourceNode.id}|${targetNode.id}|${relType}`;

      if (!edgesMap.has(edgeKey)) {
        edgesMap.set(edgeKey, {
          id: `${sourceNode.id}_${targetNode.id}_${relType}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: relType,
          name: `${sourceNode.name} (${relType}) ${targetNode.name}`,
        });
      }
    }
  }

  const nodes = Array.from(nodesMap.values());
  const edges = Array.from(edgesMap.values());

  return { nodes, edges };
};

export default {
  json: (file: File) => parseFile(file, parseGraphicleJson),
  graphml: (file: File) => parseFile(file, parseGraphMLToJSON),
  sif: (file: File) => parseFile(file, parseSIFFileToJson),
};
