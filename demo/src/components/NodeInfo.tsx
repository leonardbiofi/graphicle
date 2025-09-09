import { Node } from "@graphicle/base";

export default function NodeInfo({ node }: { node: Node }) {
  return (
    <div className="text-white space-y-5">
      <div className="flex-col flex gap-1 text-xs">
        <h3 className="font-bold text-xs text-zinc-600">Id</h3>
        <span className="text-xs">{node.id}</span>
      </div>
      <section className="space-y-2">
        <h3 className="font-bold text-xs text-zinc-600">Data</h3>
        <div className="grid grid-cols-6 text-sm text-white">
          <div className="col-span-6 flex gap-4">
            <span className="font-bold text-zinc-400">Label</span>
            <span className="">{node.data.label}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
