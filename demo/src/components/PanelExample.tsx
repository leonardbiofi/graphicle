import * as React from "react";
import { ChevronsUpDown, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useGraphicleStore } from "@/store/graphicleStore";

import { useMutation } from "@tanstack/react-query";
import { D3Force, LayoutContext } from "@graphicle/base";
import { getGraphicle } from "./GraphicleProvider";

import { useExampleStore } from "@/store/exampleStore";

function getData(name: string) {
  return fetch(`/api/dataset/${name}`).then((res) => res.json());
}

export default function PanelExample() {
  const [isOpen, setIsOpen] = React.useState(true);

  const fetchExampleMutation = useMutation({
    mutationFn: (value: string) => getData(value),
    mutationKey: ["example"],
    onSuccess: (data, variables) => {
      const { nodes, edges } = data;

      const layoutContext = new LayoutContext(new D3Force());

      const positionNodes = layoutContext.runLayout({ nodes, edges });

      console.log("NODES:", positionNodes, "edges:", edges);
      // Layout the nodes because they might have no position
      useGraphicleStore.setState(() => ({
        nodes: [...positionNodes],
        edges: [...edges],
      }));
      useExampleStore.setState({ name: variables });

      getGraphicle()?.viewport?.fitView();

      getGraphicle()?.renderer?.requestRender();

      // console.log("Variables:", variables);

      // const viewSettings = exampleViews[variables];
      // if (viewSettings) {
      //   getGraphicle()?.renderer?.viewRegistry.register(viewSettings.view);
      //   getGraphicle()?.renderer?.switchView("basic");
      // }
      return data;
    },
  });
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px]  rounded-2xl  overflow-clip bg-teal-950 h-fit"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 px-4 py-1 cursor-pointer ">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Waypoints /> Graph Examples
          </h4>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-2 m-1 p-2 rounded-b-2xl bg-stone-900 ">
        <ul className="flex flex-wrap gap-2">
          <Button
            className="w-fit bg-teal-800 rounded-xl"
            onClick={() => fetchExampleMutation.mutate("miserables")}
          >
            Miserables
          </Button>

          <Button
            className="w-fit bg-teal-800 rounded-xl"
            onClick={() => fetchExampleMutation.mutate("genes")}
          >
            Genes
          </Button>

          <Button
            className="w-fit bg-teal-800 rounded-xl"
            onClick={() => fetchExampleMutation.mutate("circle")}
          >
            Circle
          </Button>

          <Button
            className="w-fit bg-teal-800 rounded-xl"
            onClick={() => fetchExampleMutation.mutate("worldcup")}
          >
            Worldcup
          </Button>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
