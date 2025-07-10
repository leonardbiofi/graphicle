// import { Container } from "pixi.js";
import { BaseNode } from "./nodes/base";
import BaseEdge from "./edges/base";

export type NodeId = string;
export type EdgeId = string;

export type Node = {
  id: NodeId;
  type: string;
  position: XYPosition;
  selected: boolean;
  data?: any;
};
export type Edge = {
  id: EdgeId;
  type: string;
  source: string;
  target: string;
  data?: any;
};

export type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export type NodeGfx = BaseNode;
export type EdgeGfx = BaseEdge;
type BaseNodeConstructor = new (node: Node) => BaseNode;
type BaseEdgeConstructor = new (edge: Edge) => BaseEdge;

export type CustomNodesIndex = Record<string, BaseNodeConstructor>;
export type CustomEdgesIndex = Record<string, BaseEdgeConstructor>;

export type ConfigCustomNodeAndEdge = {
  customNodes: CustomNodesIndex;
  customEdges: CustomEdgesIndex;
};

/** Geometry types */
export type XYPosition = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Rect = Dimensions & XYPosition;
