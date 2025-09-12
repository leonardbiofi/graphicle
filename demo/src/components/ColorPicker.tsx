// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useObservableStyle } from "@/features/graphicle/hooks";
import { circleStyle } from "@/features/graphicle/view/basic";
import { useCallback } from "react";
import { HexColorPicker } from "react-colorful";
export function ColorPicker({ color }: { color: string }) {
  const style = useObservableStyle(circleStyle);
  const onColorChange = useCallback((nextColor: string) => {
    console.log(nextColor);
    circleStyle.set({ fillColor: nextColor });
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="rounded h-4 w-4"
          style={{ backgroundColor: color }}
        ></span>
      </PopoverTrigger>
      <PopoverContent className="">
        <HexColorPicker color={color} onChange={onColorChange} />
      </PopoverContent>
    </Popover>
  );
}
