import { Container } from "pixi.js";
import BaseNode from "./nodes/base";
import BaseEdge from "./edges/base";

export type NodeId = string;
export type EdgeId = string;
export type Node = {
  id: NodeId;
  type: string;
  position: XYPosition;
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

type CustomNodesIndex = Record<string, Container>;
type CustomEdgesIndex = Record<string, Container>;
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
