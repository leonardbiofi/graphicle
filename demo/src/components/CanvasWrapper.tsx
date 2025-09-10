import { createGraphicle, Graphicle } from "@graphicle/base";
import { RefObject, useEffect, useRef } from "react";
import CanvasControls from "./CanvasControls";
import { useCanvasStore } from "@/store/canvasStore";
import CanvasRightPanel from "./CanvasRightPanel";

interface CanvasWrapperProps {}

export default function CanvasWrapper({}: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicleRef = useRef<Graphicle>(null);
  const initializeRef = useRef<boolean>(false);
  const nodes = useCanvasStore((state) => state.nodes);
  const edges = useCanvasStore((state) => state.edges);
  const selectNodes = useCanvasStore((state) => state.selectNodes);
  const unselectNodes = useCanvasStore((state) => state.unselectNodes);

  useEffect(() => {
    const mountGraphicle = async () => {
      if (!containerRef.current) return;
      initializeRef.current = true;
      graphicleRef.current = await createGraphicle({
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
      initializeRef.current = false;
    };
    if (!graphicleRef.current && !initializeRef.current) mountGraphicle();

    return () => {
      if (graphicleRef.current) {
        graphicleRef.current.destroy();
        graphicleRef.current = null;
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [nodes, edges]);

  return (
    <div className="w-[calc(100vw_-_368px)] relative">
      <div id="graphicle" ref={containerRef} className="w-full h-full"></div>
      <CanvasControls graphicleRef={graphicleRef as RefObject<Graphicle>} />
      <div className="bg-zinc-900 absolute w-[350px] top-0 right-0 px-2 py-4">
        <CanvasRightPanel />
      </div>
    </div>
  );
}
