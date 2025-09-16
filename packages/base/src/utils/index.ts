/** Geometry types */
type XYPosition = {
  x: number;
  y: number;
};

type Dimensions = {
  width: number;
  height: number;
};

type Rect = Dimensions & XYPosition;
type Box = XYPosition & {
  x2: number;
  y2: number;
};

/**
 * Internal function for determining a bounding box that contains all given nodes in an array.
 * @public
 * @remarks Useful when combined with {@link getViewportForBounds} to calculate the correct transform to fit the given nodes in a viewport.
 * @param nodes - Nodes to calculate the bounds for
 * @param params.nodeOrigin - Origin of the nodes: [0, 0] - top left, [0.5, 0.5] - center
 * @returns Bounding box enclosing all nodes
 */
export const getNodesBounds = (nodes: any[]): Rect => {
  if (nodes.length === 0) return { x: 0, y: 0, width: 0, height: 0 };

  const box = nodes.reduce(
    (currBox, node) => {
      let currentNode = node;

      if (!currentNode) return {};
      const nodeBox = currentNode
        ? nodeToBox(currentNode)
        : { x: 0, y: 0, x2: 0, y2: 0 };

      return getBoundsOfBoxes(currBox, nodeBox);
    },
    { x: Infinity, y: Infinity, x2: -Infinity, y2: -Infinity }
  );
  return boxToRect(box);
};

export const rectToBox = ({ x, y, width, height }: Rect): Box => ({
  x,
  y,
  x2: x + width,
  y2: y + height,
});

export const boxToRect = ({ x, y, x2, y2 }: Box): Rect => ({
  x,
  y,
  width: x2 - x,
  height: y2 - y,
});

export const nodeToBox = (node: any, _nodeOrigin = [0, 0]): Box => {
  const { x, y } = node.position;
  const { width, height } = node;

  return {
    x,
    y,
    x2: x + width,
    y2: y + height,
  };
};

export const getBoundsOfBoxes = (box1: Box, box2: Box): Box => ({
  x: Math.min(box1.x, box2.x),
  y: Math.min(box1.y, box2.y),
  x2: Math.max(box1.x2, box2.x2),
  y2: Math.max(box1.y2, box2.y2),
});
