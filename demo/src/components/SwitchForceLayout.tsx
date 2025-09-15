import { Switch } from "@/components/ui/switch";
import { useForceLayoutStore } from "@/store/layoutStore";

export function SwitchForceLayout() {
  const active = useForceLayoutStore((state) => state.active);
  const setActiveForce = useForceLayoutStore((state) => state.setActive);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="force-layout"
        checked={active}
        onCheckedChange={(value) => setActiveForce(value)}
      />
      <label htmlFor="force-layout">Force Layout</label>
    </div>
  );
}
