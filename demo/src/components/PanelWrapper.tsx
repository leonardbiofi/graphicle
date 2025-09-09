import PanelExample from "./PanelExample";
import PanelActions from "./PanelActions";
export default function PanelWrapper() {
  return (
    <div className=" flex flex-col grow p-2 gap-5 w-[368px] ">
      <PanelExample />
      <PanelActions />
    </div>
  );
}
