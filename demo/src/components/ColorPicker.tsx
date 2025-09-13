// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { HexColorPicker } from "react-colorful";

export function ColorPicker({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="rounded h-4 w-4"
          style={{ backgroundColor: color }}
        ></span>
      </PopoverTrigger>
      <PopoverContent className="">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
