import {
  forceSimulation,
  forceLink,
  forceCenter,
  forceManyBody,
  forceCollide,
} from "d3-force";
// import dagre from "@dagrejs/dagre";
import type { XYPosition } from "./type";
import type { GraphData, Node } from "../core/types";

type LayoutedData = Record<string, XYPosition>;

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
interface LayoutStrategy {
  doLayout(data: GraphData): LayoutedData;
}

/**
 * The Context defines the interface of interest to clients.
 */
export class LayoutContext {
  /**
   * @type {LayoutStrategy} The Context maintains a reference to one of the Layouting Strategy
   * objects. The Context does not know the concrete class of a strategy. It
   * should work with all strategies via the Strategy interface.
   */
  private strategy: LayoutStrategy;

  /**
   * Usually, the Context accepts a strategy through the constructor, but also
   * provides a setter to change it at runtime.
   */
  constructor(strategy: LayoutStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: LayoutStrategy) {
    this.strategy = strategy;
  }

  public runLayout(data: GraphData, fixedNodes?: Node[]): Node[] {
    const positions = this.strategy.doLayout(data);

    const originalNodes = fixedNodes ?? data.nodes;

    const nextNodes = originalNodes.map((n) => {
      if (positions[n.id])
        return {
          ...n,
          position: { x: positions[n.id].x, y: positions[n.id].y },
        };
      else return { ...n };
    });

    return nextNodes;
  }
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

/**
 * D3 Force Partial layouting Strategy
 */
export class D3Force implements LayoutStrategy {
  public doLayout(data: GraphData): LayoutedData {
    const nodes = data.nodes.map((n) => ({
      id: n.id,
      fx: n?.position?.x,
      fy: n?.position?.y,
      x: undefined,
      y: undefined,
    }));

    const edges = data.edges.map((eds) => ({
      id: eds.id,
      target: eds.target,
      source: eds.source,
    }));

    const iterations = 3;
    const nodeRepulsion = -100;

    forceSimulation(nodes)
      .force(
        "link",
        // @ts-expect-error - the id is present
        forceLink(edges).id((eds) => eds.id)
      )
      .force("charge", forceManyBody().strength(nodeRepulsion).distanceMin(200))
      .force("collide", forceCollide().radius(80))
      .force("center", forceCenter())
      .stop()
      .tick(iterations);

    const positions = Object.fromEntries(
      nodes.map((node) => {
        return [node.id, { x: node.x || 0, y: node.y || 0 }];
      })
    );

    return positions;
  }
}
