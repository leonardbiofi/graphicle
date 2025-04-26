import "./style.css";
import { Graphicle } from "@graphicle";

import { nodes, edges } from "./data";

(async () => {
  const graphicleWrapper = document.getElementById("graphicle");
  if (!graphicleWrapper) return;

  /** Create the Graphicle here */
  const graphicle = new Graphicle({ nodes, edges });

  /** Mount the graphical canvas to the page */
  await graphicle.mount(graphicleWrapper);
})();
