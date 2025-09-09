import { v4 as uuidv4 } from "uuid";
import { DOMParser } from "xmldom";

interface CustomNode {
  id: string;
  type: string;
  data: {
    label: string;
  };
}

interface CustomEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

interface CustomGraph {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

/**
 *  Parse graphml string and convert it to usual graphicle json format
 * @param graphml(string) graphml structured string to be converted
 * @returns
 */
export function parseGraphml(graphml: string): CustomGraph {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(graphml, "text/xml");

  const nodeMap: Map<string, string> = new Map(); // Original ID -> UUID
  const nodes: CustomNode[] = [];
  const edges: CustomEdge[] = [];

  const nodeElems = xmlDoc.getElementsByTagName("node");
  for (let i = 0; i < nodeElems.length; i++) {
    const nodeElem = nodeElems[i];
    const origId = nodeElem.getAttribute("id") || "";
    const dataElems = nodeElem.getElementsByTagName("data");

    let label = "";
    let type: string | undefined;

    for (let j = 0; j < dataElems.length; j++) {
      const key = dataElems[j].getAttribute("key");
      const value = dataElems[j].textContent || "";
      if (key === "label") label = value;
      if (
        key === "type" &&
        (value === "gene" || value === "biologicalProcess")
      ) {
        type = value;
      }
    }

    if (!type || !label) continue; // Skip invalid nodes

    const uuid = uuidv4();
    nodeMap.set(origId, uuid);

    nodes.push({
      id: uuid,
      type,
      data: { label },
    });
  }

  const edgeElems = xmlDoc.getElementsByTagName("edge");
  for (let i = 0; i < edgeElems.length; i++) {
    const edgeElem = edgeElems[i];
    const sourceId = edgeElem.getAttribute("source") || "";
    const targetId = edgeElem.getAttribute("target") || "";
    const dataElems = edgeElem.getElementsByTagName("data");

    let type: string | undefined;

    for (let j = 0; j < dataElems.length; j++) {
      const key = dataElems[j].getAttribute("key");
      const value = dataElems[j].textContent || "";
      if (key === "type" && (value === "promotion" || value === "inhibition")) {
        type = value;
      }
    }

    if (!type || !nodeMap.has(sourceId) || !nodeMap.has(targetId)) continue;

    const edgeId = uuidv4();
    edges.push({
      id: edgeId,
      source: nodeMap.get(sourceId)!,
      target: nodeMap.get(targetId)!,
      type,
    });
  }

  return { nodes, edges };
}
