import { selectNodeTypes, useGraphicleStore } from "@/store/graphicleStore";
import { ColorPicker } from "./ColorPicker";

export default function NodeTypesInfo() {
  const nodesTypes = useGraphicleStore(selectNodeTypes);

  return (
    <div className="text-white space-y-5">
      <ul>
        {nodesTypes.map((t) => (
          <li key={t} className="flex items-center justify-between py-1">
            {t}
            <ColorPicker color="#51a2ff" />
          </li>
        ))}
      </ul>
    </div>
  );
}
