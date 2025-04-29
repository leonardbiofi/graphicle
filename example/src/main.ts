import "./style.css";
import { Graphicle } from "@graphicle";

import { nodes, edges } from "./data";

const nextEdges = edges.map((e) => ({
  id: `${e.source}_${e.target}`,
  ...e,
}));

(async () => {
  const graphicleWrapper = document.getElementById("graphicle");
  if (!graphicleWrapper) return;

  /** Create the Graphicle here */
  const graphicle = new Graphicle({ nodes: nodes, edges: nextEdges });

  /** Mount the graphical canvas to the page */
  await graphicle.mount(graphicleWrapper);
})();
