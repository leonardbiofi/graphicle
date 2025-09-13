import { createView } from "@graphicle/base";
import { ObservableStyle } from "../observableStyle";
import { createCircleNodeClass } from "../shapes/circle";
import { circleStyle } from "@/features/graphicle/shapes/circle";

/** Create Styles */
export const styles = {
  one: new ObservableStyle({ ...circleStyle }),
  two: new ObservableStyle({ ...circleStyle }),
  three: new ObservableStyle({ ...circleStyle }),
};

/** Create View */
const nodeMap = {
  one: createCircleNodeClass(styles["one"]),
  two: createCircleNodeClass(styles["two"]),
  three: createCircleNodeClass(styles["three"]),
};

export const view = createView("basic", nodeMap, {});
