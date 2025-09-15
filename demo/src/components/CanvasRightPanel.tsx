import { selectedNodes, useGraphicleStore } from "@/store/graphicleStore";
import NodeInfo from "./NodeInfo";
import NodeTypesInfo from "./NodeTypesInfo";
import ViewBuilder from "./ViewBuilder";
import { SwitchForceLayout } from "./SwitchForceLayout";
export default function CanvasRightPanel() {
  const nodes = useGraphicleStore(selectedNodes);

  return (
    <div className="space-y-5">
      <section>
        <h3 className="text-white mb-2 text-sm font-bold border-b-zinc-700 border-b pb-2 w-full">
          Node Info
          <SwitchForceLayout />
        </h3>
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
