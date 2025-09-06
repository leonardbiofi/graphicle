import { createGraphicle, Graphicle } from "@graphicle/base";
import { useEffect, useRef } from "react";
interface CanvasWrapperProps {
  nodes: [];
  edges: [];
}

export default function CanvasWrapper({ nodes, edges }: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicleRef = useRef<Graphicle>(null);
  const initializeRef = useRef<boolean>(false);
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
    <div
      id="graphicle"
      ref={containerRef}
      className="w-[calc(100vw_-_368px)]"
    ></div>
  );
}
