// import {
//   forceSimulation,
//   forceLink,
//   forceCenter,
//   forceManyBody,
//   forceCollide,
// } from "d3-force";
// // import dagre from "@dagrejs/dagre";
// import type { XYPosition } from "./type";

import { Handlers } from "./eventHandlers";
import { CustomEdgesIndex, CustomNodesIndex } from "./types";

// type LayoutedData = Record<string, XYPosition>;

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
export interface GraphicleView {
  name: string;
  nodesIndex: CustomNodesIndex; // Index of node type and node graphic
  edgesIndex: CustomEdgesIndex; // Index of edge type and edge graphic
  //   setNodesType: (index: CustomNodesIndex) => void;
  //   setEdgesType: (index: CustomEdgesIndex) => void;
  handlers?: Partial<Handlers>; // User can redefine some specific handlers at the level of view. View handlers takes precedence over General handlers
}

/**
 * The Context defines the interface of interest to clients.
 */
export class ViewContext {
  /**
   * @type {View} The Context maintains a reference to one of the Layouting Strategy
   * objects. The Context does not know the concrete class of a strategy. It
   * should work with all strategies via the Strategy interface.
   */
  private view: GraphicleView;

  /**
   * Usually, the Context accepts a view through the constructor, but also
   * provides a setter to change it at runtime.
   */
  constructor(view: GraphicleView) {
    this.view = view;
  }

  public setView(view: GraphicleView) {
    this.view = view;
  }

  public getView(): GraphicleView {
    return this.view;
  }
}

export class View implements GraphicleView {
  name: string;
  nodesIndex: CustomNodesIndex;
  edgesIndex: CustomEdgesIndex;

  constructor(
    name: string,
    nodesIndex: CustomNodesIndex,
    edgesIndex: CustomEdgesIndex
  ) {
    this.name = name;
    this.nodesIndex = nodesIndex;
    this.edgesIndex = edgesIndex;
  }

  //   setNodesType(index: CustomNodesIndex) {}
  //   setEdgesType(index: CustomEdgesIndex) {}
}

// /**
//  * Dagre Layouting Strategy
//  */
// export class Dagre implements LayoutStrategy {
//   direction: "TB";
//   dagreGraph: any;

//   constructor(direction: "TB" = "TB") {
//     this.direction = direction;
//     this.dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(
//       () => ({})
//     );
//   }

//   public doLayout(data: GraphData): LayoutedData {
//     const { nodes, edges } = data;

//     // Keep track where the nodes were positions before layout
//     const { x, y } = getNodesBounds(nodes);

//     this.dagreGraph.setGraph({ rankdir: this.direction });

//     nodes.forEach((node) => {
//       this.dagreGraph.setNode(node.id, {
//         width: node.width || 150,
//         height: node.height || 100,
//       });
//     });

//     edges.forEach((edge) => {
//       this.dagreGraph.setEdge(edge.source, edge.target);
//     });

//     dagre.layout(this.dagreGraph);

//     nodes.map((node) => this.dagreGraph.node(node.id));

//     // Format the layouted node for the getNodesBound function
//     const layoutedNodes = nodes.map((node) => {
//       const nodeWithPosition = this.dagreGraph.node(node.id);
//       return {
//         id: node.id,
//         position: {
//           x: nodeWithPosition.x - nodeWithPosition.width / 2,
//           y: nodeWithPosition.y - nodeWithPosition.height / 2,
//         },
//       };
//     });
//     // Get the new bounds to be able to recenter the nodes
//     const { x: nextX, y: nextY } = getNodesBounds(layoutedNodes);

//     const dx = nextX - x;
//     const dy = nextY - y;

//     // Compute the new positions for updates to the store
//     const positions = Object.fromEntries(
//       nodes.map((node) => {
//         const nodeWithPosition = this.dagreGraph.node(node.id);
//         return [
//           node.id,
//           {
//             x: nodeWithPosition.x - nodeWithPosition.width / 2 - dx,
//             y: nodeWithPosition.y - nodeWithPosition.height / 2 - dy,
//           },
//         ];
//       })
//     );

//     return positions;
//   }
// }
