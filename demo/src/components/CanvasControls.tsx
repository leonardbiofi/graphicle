import {
  ScanSearch,
  Plus,
  Minus,
  Camera,
  Check,
  RefreshCw,
} from "lucide-react";
import { RefObject } from "react";
import { Graphicle } from "@graphicle/base";
import { useState, useEffect } from "react";
import { useGraphicleStore } from "@/store/graphicleStore";
import { useForceLayoutStore } from "@/store/layoutStore";
import { useViewStore } from "@/store/viewStore";
interface CanvasControlProps {
  graphicleRef: RefObject<Graphicle | null>;
}

export default function CanvasControls({ graphicleRef }: CanvasControlProps) {
  // const setNodes = useGraphicleStore((state) => state.setNodes);
  // const nodes = useGraphicleStore((state) => state.nodes);
  const [screenShot, setScreenShot] = useState(false);
  const setNodes = useGraphicleStore((state) => state.setNodes);
  const setEdges = useGraphicleStore((state) => state.setEdges);
  const setActive = useForceLayoutStore((state) => state.setActive);

  const setNodeAssignments = useViewStore((state) => state.setNodeAssignments);
  const setEdgeAssignments = useViewStore((state) => state.setEdgeAssignments);

  // const handleSelectAll = () => {
  //   const nextNodes = nodes.map((n) => ({ ...n, selected: true }));

  //   setNodes(nextNodes);
  // };

  useEffect(() => {
    if (screenShot) setTimeout(() => setScreenShot(false), 1500);

    return () => {};
  }, [screenShot]);

  if (!graphicleRef.current) return;
  return (
    <div className="absolute bottom-0 left-0 m-5 text-zinc-400 bg-zinc-900 p-2 rounded-lg z-10">
      <ul className="flex flex-col gap-2 justify-center items-center">
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => {
            const answer = confirm("Reset the graph. Are you sure ? ");
            if (!answer) return;
            setActive(false);
            setNodes([]);
            setEdges([]);
            setNodeAssignments({});
            setEdgeAssignments({});
          }}
        >
          <RefreshCw />
          {screenShot && (
            <span className=" flex items-center gap-2 absolute -top-5 left-5 bg-teal-800 dark:bg-sagedark-3 shadow px-4 py-2 text-white rounded-full text-xs font-medium shadow-purple-10 animate-up-fade">
              Clipboard <Check size={12} />
            </span>
          )}
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => {
            graphicleRef.current?.viewport
              ?.screenShot(
                { mode: "clipboard", flash: true },
                { clearColor: "#3f3f46", resolution: 2 }
              )
              .then(() => {
                setScreenShot(true);
              });
          }}
        >
          <Camera />
          {screenShot && (
            <span className=" flex items-center gap-2 absolute -top-5 left-5 bg-teal-800 dark:bg-sagedark-3 shadow px-4 py-2 text-white rounded-full text-xs font-medium shadow-purple-10 animate-up-fade">
              Clipboard <Check size={12} />
            </span>
          )}
        </li>
        {/* <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => handleSelectAll()}
        >
          <TextSelect />
        </li> */}
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicleRef.current?.viewport?.zoomIn()}
        >
          <Plus />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicleRef.current?.viewport?.zoomOut()}
        >
          <Minus />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicleRef.current?.viewport?.fitView()}
        >
          <ScanSearch />
        </li>
      </ul>
    </div>
  );
}
