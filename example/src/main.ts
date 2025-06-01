import "./style.css";
import { createGraphicle } from "@graphicle";

import { nodes, edges } from "./data";
import { GroupOneNode } from "./nodes/groupOne";

const nextEdges = edges.map((e) => ({
  id: `${e.source}_${e.target}`,
  ...e,
}));

const customNodes = {
  one: GroupOneNode,
};

(async () => {
  const graphicleWrapper = document.getElementById("graphicle");
  if (!graphicleWrapper) return;

  /** Create the Graphicle here */
  const graphicle = await createGraphicle({
    container: graphicleWrapper,
    initialState: {
      nodes: nodes,
      edges: nextEdges,
    },
    options: {
      customEdges: {},
      customNodes,
      selectOnDrag: true,
      handlers: { onNodeClick: (n) => console.log("node Clicked", n) },
    },
  });

  console.log(graphicle);
})();
