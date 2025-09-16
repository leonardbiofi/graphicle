import { Checkbox } from "./ui/checkbox";

interface CheckboxLabelsProps {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export default function CheckboxLabels({
  checked,
  onCheckedChange,
}: CheckboxLabelsProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <label htmlFor="checkbox-labels">Labels</label>
    </div>
  );
}
