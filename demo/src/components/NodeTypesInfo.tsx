import { selectNodeTypes, useGraphicleStore } from "@/store/graphicleStore";
import { ColorPicker } from "./ColorPicker";
import { useCallback } from "react";
import { useObservableStyle } from "@/features/graphicle/hooks";
import { useExampleStore } from "@/store/exampleStore";
import exampleViews from "@/features/graphicle/views/index";
export default function NodeTypesInfo() {
  const nodesTypes = useGraphicleStore(selectNodeTypes);

  return (
    <div className="text-white space-y-5">
      <ul>
        {nodesTypes.map((t) => (
          <NodeTypeItem key={t} type={t} />
        ))}
      </ul>
    </div>
  );
}

function NodeTypeItem({ type }: { type: string }) {
  const exampleName = useExampleStore((state) => state.name);

  const viewSettings = exampleViews[exampleName];

  return (
    <li key={type} className="flex items-center justify-between py-1">
      {type}
      {viewSettings?.styles[type] && (
        <StyleEditor viewSettings={viewSettings} type={type} />
      )}
    </li>
  );
}

function StyleEditor({
  viewSettings,
  type,
}: {
  viewSettings: any;
  type: string;
}) {
  const [style, styleStore] = useObservableStyle<any>(
    viewSettings.styles[type]
  );

  const onColorChange = useCallback((nextColor: string) => {
    styleStore.set({ fillColor: nextColor });
  }, []);
  if (!style) return;
  return (
    <>
      <ColorPicker color={style.fillColor} onChange={onColorChange} />
    </>
  );
}
