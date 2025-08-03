// Helper function to initialize the graphicle instance
import { createGraphicle, createView } from "@graphicle/base";

// Custom nodes
import { nodes, edges } from "./data";
import { GroupOneNode } from "./nodes/groupOne";
import { GroupTwoNode } from "./nodes/groupTwo";
import { GroupThreeNode } from "./nodes/groupThree";
import { GroupFourNode } from "./nodes/groupFour";

// Custom edges
//TODO: too be implemented in this example

// Import style
import "./style.css";

const nextEdges = edges.map((e) => ({
  id: `${e.source}_${e.target}`,
  ...e,
}));

const customNodes = {
  one: GroupOneNode,
  two: GroupTwoNode,
  three: GroupThreeNode,
  four: GroupFourNode,
};

(async () => {
  const graphicleWrapper = document.getElementById("graphicle");
  if (!graphicleWrapper) return;

  const myView = createView("myCustomView", customNodes, {});

  /** Create the Graphicle here */
  const graphicle = await createGraphicle({
    container: graphicleWrapper,
    initialState: {
      nodes: nodes,
      edges: nextEdges,
    },
    options: {
      selectOnDrag: true,
      handlers: { onNodeClick: (n) => console.log("node Clicked", n) },
    },
  });

  graphicle.renderer?.viewRegistry.register(myView);
  graphicle.renderer?.switchView("myCustomView");
  graphicle.renderer?.switchView();
})();
