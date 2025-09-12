import { createContext, useContext, RefObject, createRef } from "react";
import { Graphicle } from "@graphicle/base";
import { useRef } from "react";
type GraphicleProviderProps = {
  children: React.ReactNode;
};

type GraphicleProviderState = {
  graphicleRef: RefObject<Graphicle | null>;
  setGraphicle: (graphicle: Graphicle | null) => void;
};
const initialState: GraphicleProviderState = {
  graphicleRef: createRef<Graphicle | null>(),
  setGraphicle: () => {},
};

let graphicle: Graphicle | null = null;

export const setGraphicleInstance = (instance: Graphicle | null) => {
  graphicle = instance;
};

export const getGraphicle = (): Graphicle | null => graphicle;

// Optional React context
const GraphicleContext = createContext<GraphicleProviderState>(initialState);

export function GraphicleProvider({
  children,
  ...props
}: GraphicleProviderProps) {
  const graphicleRef = useRef<Graphicle | null>(null);

  const value = {
    graphicleRef: graphicleRef,
    setGraphicle: (value: Graphicle | null) => {
      console.log("CONTEXT CALL:", value);
      setGraphicleInstance(value);
      graphicleRef.current = value;
    },
  };
  return (
    <GraphicleContext.Provider {...props} value={value}>
      {children}
    </GraphicleContext.Provider>
  );
}

export function useGraphicle(): GraphicleProviderState {
  const context = useContext(GraphicleContext);
  if (!context)
    throw new Error("useGraphicle must be used within a GraphicleProvider");
  return context;
}
