import { useCanvasStore } from "@/store/canvasStore";
import NodeInfo from "./NodeInfo";

export default function CanvasRightPanel() {
  const selectedNodes = useCanvasStore((state) => state.selectedNodes);

  return (
    <div>
      <h3 className="text-white mb-2 text-sm font-bold border-b-zinc-700 border-b pb-2 w-full">
        Node Info
      </h3>
      {selectedNodes.length > 0 && <NodeInfo node={selectedNodes[0]} />}
    </div>
  );
}
