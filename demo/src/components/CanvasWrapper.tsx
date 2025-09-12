import { createGraphicle, Graphicle } from "@graphicle/base";
import { RefObject, useEffect, useRef } from "react";
import CanvasControls from "./CanvasControls";
import { useGraphicleStore } from "@/store/graphicleStore";
import CanvasRightPanel from "./CanvasRightPanel";
import { useGraphicle } from "./GraphicleProvider";
interface CanvasWrapperProps {}

export default function CanvasWrapper({}: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // const graphicleRef = useRef<Graphicle>(null);
  const { setGraphicle, graphicleRef } = useGraphicle();
  const initializeRef = useRef<boolean>(false);
  const nodes = useGraphicleStore((state) => state.nodes);
  const edges = useGraphicleStore((state) => state.edges);
  const selectNodes = useGraphicleStore((state) => state.selectNodes);
  const unselectNodes = useGraphicleStore((state) => state.unselectNodes);
  useEffect(() => {
    const mountGraphicle = async () => {
      if (!containerRef.current) return;
      initializeRef.current = true;
      const graphicle = await createGraphicle({
        container: containerRef.current,
        initialState: { nodes, edges },
        options: {
          handlers: {
            onNodeClick: () => {},
            onNodesUnselect: (_, nodes) => unselectNodes(nodes),
            onNodesSelect: (_, nodes) => selectNodes(nodes),
          },
          selectOnDrag: true,
        },
      });

      setGraphicle(graphicle);
      initializeRef.current = false;
    };
    if (!graphicleRef.current && !initializeRef.current) mountGraphicle();

    return () => {
      if (graphicleRef.current) {
        graphicleRef.current.destroy();
        setGraphicle(null);
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [nodes, edges]);

  return (
    <div className="w-[calc(100vw_-_368px)] relative">
      <div id="graphicle" ref={containerRef} className="w-full h-full"></div>
      <CanvasControls graphicleRef={graphicleRef} />
      <div className="bg-zinc-900 absolute w-[350px] top-0 right-0 px-2 py-4">
        <CanvasRightPanel />
      </div>
    </div>
  );
}
