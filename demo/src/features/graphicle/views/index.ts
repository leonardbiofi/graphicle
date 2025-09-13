import { ObservableStyle } from "../observableStyle";
import { styles, view } from "./miserables";
const index = { miserables: { styles, view } } as Record<
  string,
  { styles: Record<string, ObservableStyle<any>>; view: any }
>;

export default index;
