import { selectedNodes, useGraphicleStore } from "@/store/graphicleStore";
import NodeInfo from "./NodeInfo";
import ViewBuilder from "./ViewBuilder";
export default function CanvasRightPanel() {
  const nodes = useGraphicleStore(selectedNodes);

  return (
    <div className="space-y-5">
      <section>
        <div className="border-b-zinc-700 border-b pb-2 mb-2  w-full">
          <h3 className="text-white text-sm font-bold  ">Node Info</h3>
        </div>
        {nodes.length > 0 && <NodeInfo node={nodes[0]} />}
        {nodes.length === 0 && (
          <span className="text-zinc-400 text-xs">None selected</span>
        )}
      </section>
      <section>
        <ViewBuilder />
      </section>

      {/* <section>
        <ViewBuilder />
      </section> */}
    </div>
  );
}
