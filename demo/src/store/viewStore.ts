import { ObservableStyle } from "@/features/graphicle/observableStyle";
import { create } from "zustand";

type Assignment = {
  // @ts-expect-error FIXME: Typescript error
  style: ObservableStyle<T>;
  shape: string;
};
export interface ViewStoreState {
  nodeAssignments: Record<string, Assignment>;
  setNodeAssignments: (value: Record<string, Assignment>) => void;
  edgeAssignments: Record<string, Assignment>;
  setEdgeAssignments: (value: Record<string, Assignment>) => void;
}
export const useViewStore = create<ViewStoreState>()((set) => ({
  nodeAssignments: {},
  setNodeAssignments: (value) => set(() => ({ nodeAssignments: value })),
  edgeAssignments: {},
  setEdgeAssignments: (value) => set(() => ({ edgeAssignments: value })),
}));
