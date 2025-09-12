import { ScanSearch, Plus, Minus, TextSelect } from "lucide-react";
import { useGraphicleStore } from "@/store/graphicleStore";
import { RefObject } from "react";
import { Graphicle } from "@graphicle/base";
interface CanvasControlProps {
  graphicleRef: RefObject<Graphicle | null>;
}

export default function CanvasControls({ graphicleRef }: CanvasControlProps) {
  const setNodes = useGraphicleStore((state) => state.setNodes);
  const nodes = useGraphicleStore((state) => state.nodes);

  const handleSelectAll = () => {
    const nextNodes = nodes.map((n) => ({ ...n, selected: true }));

    setNodes(nextNodes);
  };
  if (!graphicleRef.current) return;
  return (
    <div className="absolute bottom-0 left-0 m-5 text-zinc-400 bg-zinc-900 p-2 rounded-lg z-10">
      <ul className="flex flex-col gap-2 justify-center items-center">
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => handleSelectAll()}
        >
          <TextSelect />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicle.viewport?.zoomIn()}
        >
          <Plus />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicle.viewport?.zoomOut()}
        >
          <Minus />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicle.viewport?.fitView()}
        >
          <ScanSearch />
        </li>
      </ul>
    </div>
  );
}
