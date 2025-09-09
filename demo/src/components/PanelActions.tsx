import * as React from "react";
import { ChevronsUpDown, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import UploadDialog from "./UploadDialog";

export default function PanelActions() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px]  rounded-2xl  overflow-clip bg-teal-950 h-fit"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 px-4 py-1 cursor-pointer ">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Upload /> Actions
          </h4>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-2 m-1 p-2 rounded-b-2xl bg-stone-900 ">
        <ul className="flex flex-wrap gap-2 text-sm p-2">
          <li
            className="
          
          "
          >
            <UploadDialog />
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
