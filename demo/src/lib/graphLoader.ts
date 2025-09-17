import { getGraphicle } from "@/components/GraphicleProvider";
import { GraphData, LayoutContext, D3Force, createView } from "@graphicle/base";
import { useGraphicleStore } from "@/store/graphicleStore";
import { createColorPicker } from "./color";
import { ObservableStyle } from "@/features/graphicle/observableStyle";
import { circleStyle } from "@/features/graphicle/shapes/circle";
import { arrowLineStyle } from "@/features/graphicle/lines/arrowLine";
import { shapeFactory } from "@/features/graphicle/shapes/factory";
import { lineFactory } from "@/features/graphicle/lines/factory";

const colorPicker = createColorPicker();

export const graphLoader = ({ nodes, edges }: GraphData) => {
  const graphicle = getGraphicle();
  if (!graphicle) throw new Error("Graphicle instance is not initialized");

  // Layout the nodes by default
  // TODO: Allow user to choose if he want to have it layouted or not
  const layoutContext = new LayoutContext(new D3Force());
  const positionNodes = layoutContext.runLayout({ nodes, edges });

  const nextNodes = [...positionNodes];
  const nextEdges = [...edges];

  // Define the view here
  const nodeTypes = [...new Set(nextNodes.map((n) => n.type))].sort();
  const edgeTypes = [...new Set(nextEdges.map((eds) => eds.type))].sort();

  const nodeMap = nodeTypes.reduce<Record<string, any>>((acc, curr) => {
    const style = new ObservableStyle({
      ...circleStyle,
      fillColor: colorPicker(),
    });

    acc[curr] = shapeFactory["circle"](style);

    return acc;
  }, {});

  const edgeMap = edgeTypes.reduce<Record<string, any>>((acc, curr) => {
    const style = new ObservableStyle({
      ...arrowLineStyle,
    });

    acc[curr] = lineFactory["arrowLine"](style);

    return acc;
  }, {});

  // Set the view prior to initialize node is more efficient because it will render empty arrays
  const view = createView("custom", nodeMap, edgeMap);
  graphicle.renderer?.viewRegistry.register(view);
  graphicle.renderer?.switchView("custom");

  // Layout the nodes because they might have no position
  useGraphicleStore.setState(() => ({
    nodes: nextNodes,
    edges: nextEdges,
  }));

  //   graphicle.viewport?.fitView();
};
