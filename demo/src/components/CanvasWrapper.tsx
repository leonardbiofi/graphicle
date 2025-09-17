import { createGraphicle } from "@graphicle/base";
import { useEffect, useRef, useState } from "react";
import CanvasControls from "./CanvasControls";
import { useGraphicleStore } from "@/store/graphicleStore";
import CanvasRightPanel from "./CanvasRightPanel";
import { useGraphicle } from "./GraphicleProvider";
import { useForceLayout } from "@/features/graphicle/hooks";
import { SwitchForceLayout } from "./SwitchForceLayout";
interface CanvasWrapperProps {}

export default function CanvasWrapper({}: CanvasWrapperProps) {
  const dragEvents = useForceLayout();

  const containerRef = useRef<HTMLDivElement>(null);
  // const graphicleRef = useRef<Graphicle>(null);
  const { setGraphicle, graphicleRef } = useGraphicle();
  const initializeRef = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const nodes = useGraphicleStore((state) => state.nodes);
  const edges = useGraphicleStore((state) => state.edges);
  const setNodes = useGraphicleStore((state) => state.setNodes);
  const setEdges = useGraphicleStore((state) => state.setEdges);

  useEffect(() => {
    const mountGraphicle = async () => {
      if (!containerRef.current) return;

      try {
        initializeRef.current = true;
        setLoading(true);
        const graphicle = await createGraphicle({
          container: containerRef.current,
          initialState: { nodes, edges },
          options: {
            handlers: {
              onNodeClick: () => {},
              onNodeDrag: (_, { node }) => dragEvents.drag(node),
              onNodeDragStart: (_, node) => dragEvents.start(node),
              onNodeDragEnd: () => dragEvents.stop(),
              onNodesUpdate: (_, nodes) => setNodes(nodes),
              onEdgesUpdate: (_, edges) => setEdges(edges),
            },
            selectOnDrag: true,
          },
        });

        // graphicle.renderer?.viewRegistry.register(basicView);
        // graphicle.renderer?.switchView("basicView");

        setGraphicle(graphicle);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
        initializeRef.current = false;
      }
    };
    if (!graphicleRef.current && !initializeRef.current) mountGraphicle();

    return () => {
      if (graphicleRef.current) {
        graphicleRef.current.destroy();
        setGraphicle(null);
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);
  return (
    <div className="w-[calc(100vw_-_368px)] relative bg-opacity-0">
      <div id="graphicle" ref={containerRef} className="w-full h-full"></div>
      {loading && (
        <span className="text-white absolute left-1/2 top-1/2">
          Loading ...
        </span>
      )}

      <div className="absolute top-0 left-0 m-5 text-white">
        <SwitchForceLayout />
      </div>
      <CanvasControls graphicleRef={graphicleRef} />
      <div className="bg-zinc-900 absolute w-[350px] top-0 right-0 px-4 py-4">
        <CanvasRightPanel />
      </div>
    </div>
  );
}
