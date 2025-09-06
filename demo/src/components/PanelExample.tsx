import * as React from "react";
import { ChevronsUpDown, Waypoints } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function PanelExample() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px]  rounded-2xl  overflow-clip bg-teal-950 h-fit"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 px-4 py-2 cursor-pointer ">
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
          <Button className="w-fit bg-teal-800 rounded-xl" asChild>
            <Link to="/demo" search={{ name: "miserables" }}>
              Miserables
            </Link>
          </Button>

          <Button className="w-fit bg-teal-800 rounded-xl" asChild>
            <Link to="/demo" search={{ name: "genes" }}>
              Genes
            </Link>
          </Button>

          <Button className="w-fit bg-teal-800 rounded-xl" asChild>
            <Link to="/demo" search={{ name: "circle" }}>
              Circle
            </Link>
          </Button>

          <Button className="w-fit bg-teal-800 rounded-xl" asChild>
            <Link to="/demo" search={{ name: "worldcup" }}>
              Worldcup
            </Link>
          </Button>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
