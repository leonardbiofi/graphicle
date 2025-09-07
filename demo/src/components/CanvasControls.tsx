import { Graphicle } from "@graphicle/base";
import { RefObject } from "react";
import { ScanSearch, Plus, Minus } from "lucide-react";
interface CanvasControlProps {
  graphicleRef: RefObject<Graphicle>;
}

export default function CanvasControls({ graphicleRef }: CanvasControlProps) {
  return (
    <div className="absolute bottom-0 left-0 m-5 text-zinc-400 bg-zinc-900 p-2 rounded-lg">
      <ul className="flex flex-col gap-2 justify-center items-center">
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicleRef.current.viewport?.zoomIn()}
        >
          <Plus />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicleRef.current.viewport?.zoomOut()}
        >
          <Minus />
        </li>
        <li
          className="cursor-pointer hover:text-teal-600"
          onClick={() => graphicleRef.current.viewport?.fitView()}
        >
          <ScanSearch />
        </li>
      </ul>
    </div>
  );
}
