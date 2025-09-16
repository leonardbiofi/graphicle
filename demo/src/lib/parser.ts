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

      console.log("NODES:", nodes, "edges:", edges);

      resolve({ nodes, edges });
    } catch (err) {
      reject(err);
    }
  });

export default {
  json: (file: File) => parseFile(file, parseGraphicleJson),
  graphml: (file: File) => parseFile(file, parseGraphMLToJSON),
};
