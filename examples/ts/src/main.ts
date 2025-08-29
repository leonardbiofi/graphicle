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

const nextNodes = nodes.map((n) => {
  return { ...n, data: { label: n.id } };
});

const customNodes = {
  one: GroupOneNode,
  two: GroupTwoNode,
  three: GroupThreeNode,
  four: GroupFourNode,
};

(async () => {
  /** Grab the mounting point */
  const graphicleWrapper = document.getElementById(
    "graphicle"
  ) as HTMLDivElement;
  if (!graphicleWrapper) return;

  /** Create a simple view */
  const myView = createView("myCustomView", customNodes, {});

  /** Create the Graphicle here */
  const graphicle = await createGraphicle({
    container: graphicleWrapper,
    initialState: {
      nodes: nextNodes,
      edges: nextEdges,
    },
    options: {
      selectOnDrag: true,
      handlers: {
        onNodeClick: (n) => console.log("node Clicked", n),
        onNodesSelect: (_context, nodes) => {
          // console.log("NodeSelected:", nodes);
          // const selectedNodes = new Set(nodes.map((n) => n.id));
          // _context.store.getNodes().forEach((n) => {
          //   const nodeGfx = _context.renderer.nodeIdToNodeGfx.get(n.id);
          //   if (!nodeGfx) return;
          //   const shape = nodeGfx.getChildByLabel("shape") as Graphics;
          //   if (!shape) return;
          //   if (selectedNodes.has(n.id)) {
          //     shape.stroke({ width: 3, color: "blue" });
          //   } else {
          //     shape.stroke({ width: 0 });
          //   }
          // });
        },
      },
    },
  });

  graphicle.renderer?.viewRegistry.register(myView);
  graphicle.renderer?.switchView("myCustomView");
  // graphicle.renderer?.switchView();
})();
