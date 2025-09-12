import { useSyncExternalStore } from "react";
import { ObservableStyle } from "./observableStyle";

export function useObservableStyle<TStyle extends object>(
  styleStore: ObservableStyle<TStyle>
): TStyle {
  return useSyncExternalStore(styleStore.subscribe.bind(styleStore), () =>
    styleStore.get()
  );
}
