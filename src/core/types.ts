import { Container } from "pixi.js";
import { XYPosition } from "../layout/type";
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
