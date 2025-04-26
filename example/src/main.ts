import "./style.css";
// import { Graphicle } from "../dist/graphicle";
import { Graphicle } from "@graphicle";

(async () => {
  const graphicleWrapper = document.getElementById("graphicle");

  console.log("Wrapper:", graphicleWrapper);
  if (!graphicleWrapper) return;
  const graphicle = new Graphicle();
  await graphicle.mount(graphicleWrapper);
})();
