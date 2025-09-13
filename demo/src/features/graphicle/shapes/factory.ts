import { createCircleNodeClass } from "@/features/graphicle/shapes/circle";

export const shapeFactory: Record<string, any> = {
  circle: createCircleNodeClass,
  // square: createSquareNodeClass,
};
