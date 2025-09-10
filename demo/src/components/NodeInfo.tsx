import { Node } from "@graphicle/base";

export default function NodeInfo({ node }: { node: Node }) {
  return (
    <div className="text-white space-y-5">
      <section className="space-y-2">
        <div className="grid grid-cols-6 gap-2 text-sm text-white">
          <span className="col-span-1 text-zinc-500">Id</span>
          <span className="col-span-5">{node.id}</span>
          <span className="col-span-1 text-zinc-500">Label</span>
          <span className="col-span-5">{node.data.label}</span>

          <span className="col-span-1 text-zinc-500">Type</span>
          <span className="col-span-5">{node.type}</span>
        </div>
      </section>
    </div>
  );
}
