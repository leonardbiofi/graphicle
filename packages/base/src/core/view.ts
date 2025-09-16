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
  handlers?: Partial<Handlers>; // User can redefine some specific handlers at the level of view. View handlers takes precedence over General handlers
}

// /**
//  * The Context defines the interface of interest to clients.
//  */
// export class ViewContext {
//   /**
//    * @type {View} The Context maintains a reference to one of the Layouting Strategy
//    * objects. The Context does not know the concrete class of a strategy. It
//    * should work with all strategies via the Strategy interface.
//    */
//   private view: GraphicleView;

//   /**
//    * Usually, the Context accepts a view through the constructor, but also
//    * provides a setter to change it at runtime.
//    */
//   constructor(view: GraphicleView) {
//     this.view = view;
//   }

//   public setView(view: GraphicleView) {
//     this.view = view;
//   }

//   public getView(): GraphicleView {
//     return this.view;
//   }
// }

// export class View implements GraphicleView {
//   name: string;
//   nodesIndex: CustomNodesIndex;
//   edgesIndex: CustomEdgesIndex;

//   constructor(
//     name: string,
//     nodesIndex: CustomNodesIndex,
//     edgesIndex: CustomEdgesIndex
//   ) {
//     this.name = name;
//     this.nodesIndex = nodesIndex;
//     this.edgesIndex = edgesIndex;
//   }

//   //   setNodesType(index: CustomNodesIndex) {}
//   //   setEdgesType(index: CustomEdgesIndex) {}
// }

import BaseNode from "./nodes/base";
import BaseEdge from "./edges/base";
import DefaultNode from "./nodes/default";
import StraightEdge from "./edges/straight";

type Constructor<T = any> = new (...args: any[]) => T;

export type NodeMapBase = {
  default: Constructor;
  [key: string]: Constructor;
};

export type EdgeMapBase = {
  default: Constructor;
  [key: string]: Constructor;
};

export type View<NK extends string, EK extends string> = {
  name: string;
  nodeMap: { default: typeof BaseNode } & Record<NK, Constructor>;
  edgeMap: { default: typeof BaseEdge } & Record<EK, Constructor>;
};

/**
 * View registry
 */
export class ViewRegistry {
  private views = new Map<string, View<any, any>>();
  private currentView: View<any, any> | null = null;

  constructor() {
    // Register a default view on creation

    const defaultView = createView(
      "default",
      { default: DefaultNode },
      { default: StraightEdge }
    );
    this.register(defaultView);
  }

  /**
   * Register a new view into the registry
   *
   * @param view
   * @param options - Register view Option {select: boolean}
   * @returns
   */
  register<NK extends string, EK extends string>(
    view: View<NK, EK>,
    options: { select: boolean } = { select: true }
  ): ViewRegistry {
    this.views.set(view.name, view);

    // options to select on register
    if (options.select) this.setCurrentView(view.name);

    return this;
  }

  // registerView(view: View): void {
  //     this.views.set(view.name, view);
  // }

  setCurrentView(name: string): void {
    const view = this.views.get(name);
    if (!view) throw new Error(`View "${name}" not found in the registry`);
    this.currentView = view;
  }

  getCurrentView<NK extends string, EK extends string>(): View<NK, EK> {
    if (!this.currentView) {
      throw new Error("No view selected");
    }
    return this.currentView as View<NK, EK>;
  }

  createNode<NK extends string, K extends NK = NK>(
    type: K,
    ...args: ConstructorParameters<View<NK, any>["nodeMap"][K]>
  ): any {
    const view = this.getCurrentView<NK, any>();

    if (!view.nodeMap[type]) return;
    // console.warn("Unknown Node type falling back to default");

    const Cls = view.nodeMap[type] ?? view.nodeMap.default;
    return new Cls(...args);
  }

  createEdge<EK extends string, K extends EK = EK>(
    type: K,
    ...args: ConstructorParameters<View<any, EK>["edgeMap"][K]>
  ): any {
    const view = this.getCurrentView<any, EK>();

    if (!view.edgeMap[type]) return;
    // console.warn("Unknown Edge type falling back to default");

    const Cls = view.edgeMap[type] ?? view.edgeMap.default;
    return new Cls(...args);
  }

  // createNode(type: string, nodeData: Node) {
  //     const view = this.getCurrentView();
  //     return createNodeWithFallback(view.nodeMap, type, nodeData);
  // }

  // createEdge(type: string, edgeData: Edge) {
  //     const view = this.getCurrentView();
  //     return createEdgeWithFallback(view.edgeMap, type, edgeData);
  // }
}

/**
 * Helper function to create a View with keys inferred
 */
export function createView<NK extends string, EK extends string>(
  name: string,
  nMap: Record<NK, Constructor>,
  eMap: Record<EK, Constructor>
): View<NK, EK> {
  // You can enforce that 'default' key exists here if you want

  const nodeMap = { default: DefaultNode, ...nMap };
  const edgeMap = { default: StraightEdge, ...eMap };

  return { name, nodeMap, edgeMap };
}
