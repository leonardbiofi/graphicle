import { Container } from "pixi.js";
import { XYPosition } from "../layout/type";

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

export type NodeGfx = Container;
export type EdgeGfx = Container;

type CustomNodesIndex = Record<string, Container>;
type CustomEdgesIndex = Record<string, Container>;
export type ConfigCustomNodeAndEdge = {
  customNodes: CustomNodesIndex;
  customEdges: CustomEdgesIndex;
};
