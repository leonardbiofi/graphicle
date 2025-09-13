import { useState, useMemo, useEffect } from "react";
import { useGraphicleStore, selectNodeTypes } from "@/store/graphicleStore";
import { ObservableStyle } from "@/features/graphicle/observableStyle";
import { circleStyle } from "@/features/graphicle/shapes/circle";
import { shapeFactory } from "@/features/graphicle/shapes/factory";
import { createView } from "@graphicle/base";
import { ColorPicker } from "./ColorPicker";
import { useGraphicle } from "./GraphicleProvider";

export default function ViewBuilder() {
  const nodeTypes = useGraphicleStore(selectNodeTypes);
  const { graphicleRef } = useGraphicle();
  //   const setView = useGraphicleStore(state => state.setView)
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    setAssignments(() => {
      const obj: Record<string, any> = {};
      nodeTypes.forEach((type) => {
        obj[type] = {
          style: new ObservableStyle({ ...circleStyle }),
          shapeKey: "circle",
        };
      });

      return obj;
    });
  }, [nodeTypes]);

  const nodeMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(assignments).map(([type, { shapeKey, style }]) => {
        const factory = shapeFactory[shapeKey];
        return [type, factory(style)];
      })
    );
  }, [assignments]);

  useEffect(() => {
    const view = createView("custom", nodeMap, {});
    if (graphicleRef.current) {
      graphicleRef.current?.renderer?.viewRegistry.register(view);
      graphicleRef.current.renderer?.switchView("custom");
    }
  }, [nodeMap, graphicleRef]);

  return (
    <div className="space-y-4 text-white">
      {nodeTypes.map((type) => (
        <div key={type} className="flex items-center gap-4 justify-between">
          <span className="w-20">{type}</span>

          {/* <pre>{JSON.stringify(assignments, null, 2)}</pre> */}
          {/* Shape Selector */}
          {/* <select
            value={assignments[type].shapeKey}
            onChange={(e) =>
              setAssignments((prev) => ({
                ...prev,
                [type]: { ...prev[type], shapeKey: e.target.value },
              }))
            }
          >
            {Object.keys(shapeFactories).map((shapeKey) => (
              <option key={shapeKey} value={shapeKey}>
                {shapeKey}
              </option>
            ))}
          </select> */}
          {assignments[type]?.style && (
            <ColorPicker
              color={assignments[type]?.style.get().fillColor}
              onChange={(color: string) => {
                assignments[type]?.style.set({ fillColor: color });
              }}
            />
          )}
          {/* Color Picker */}
          {/* <input
            type="color"
            value={assignments[type].style.get().fillColor}
            onChange={(e) => {
              assignments[type].style.set({ fillColor: e.target.value });
              // trigger rerender
              setAssignments({ ...assignments });
            }}
          /> */}
        </div>
      ))}
    </div>
  );
}
