import { useState, useMemo, useEffect, useCallback } from "react";
import { createView } from "@graphicle/base";
import {
  useGraphicleStore,
  selectNodeTypes,
  selectEdgeTypes,
} from "@/store/graphicleStore";
import { ObservableStyle } from "@/features/graphicle/observableStyle";
import { circleStyle } from "@/features/graphicle/shapes/circle";
import { shapeFactory } from "@/features/graphicle/shapes/factory";
import { lineFactory } from "@/features/graphicle/lines/factory";
import { arrowLineStyle } from "@/features/graphicle/lines/arrowLine";

import { ColorPicker } from "./ColorPicker";
import { useGraphicle } from "./GraphicleProvider";
import CheckboxLabels from "./CheckboxLabels";
import { createColorPicker } from "@/lib/color";

const colorPicker = createColorPicker();

export default function ViewBuilder() {
  const nodeTypes = useGraphicleStore(selectNodeTypes);
  const edgeTypes = useGraphicleStore(selectEdgeTypes);
  const { graphicleRef } = useGraphicle();
  //   const setView = useGraphicleStore(state => state.setView)
  const [nodeAssignments, setNodeAssignments] = useState({});
  const [edgeAssignments, setEdgeAssignments] = useState({});
  const [showLabels, setShowLabels] = useState(true);

  const onShowLabelsChange = useCallback(
    (value: boolean) => {
      setShowLabels(value);
      Object.values(nodeAssignments).forEach((assignment) => {
        assignment?.style.set({ showLabel: value });
      });
    },
    [nodeAssignments]
  );
  useEffect(() => {
    setNodeAssignments(() => {
      const obj: Record<string, any> = {};
      nodeTypes.forEach((type) => {
        obj[type] = {
          style: new ObservableStyle({
            ...circleStyle,
            fillColor: colorPicker(),
          }), // default value
          shapeKey: "circle", //Default shapè
        };
      });

      return obj;
    });
  }, [nodeTypes]);

  useEffect(() => {
    setEdgeAssignments(() => {
      const obj: Record<string, any> = {};
      edgeTypes.forEach((type) => {
        obj[type] = {
          style: new ObservableStyle({ ...arrowLineStyle }), // default value
          edgeKey: "arrowLine", // Default line
        };
      });

      return obj;
    });
  }, [edgeTypes]);

  const nodeMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(nodeAssignments).map(([type, { shapeKey, style }]) => {
        const factory = shapeFactory[shapeKey];
        return [type, factory(style)];
      })
    );
  }, [nodeAssignments]);

  const edgeMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(edgeAssignments).map(([type, { edgeKey, style }]) => {
        const factory = lineFactory[edgeKey];
        return [type, factory(style)];
      })
    );
  }, [nodeAssignments]);

  useEffect(() => {
    const view = createView("custom", nodeMap, edgeMap);
    if (graphicleRef.current) {
      graphicleRef.current?.renderer?.viewRegistry.register(view);
      graphicleRef.current.renderer?.switchView("custom");
    }
  }, [nodeMap, graphicleRef]);

  return (
    <div className="space-y-4 text-white">
      <div>
        <header className="border-b-zinc-700 border-b pb-2 mb-2 flex justify-between items-center">
          <h3 className="text-white text-sm font-bold">Node Types</h3>
          <CheckboxLabels
            checked={showLabels}
            onCheckedChange={onShowLabelsChange}
          />
        </header>
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
            {nodeAssignments[type]?.style && (
              <ColorPicker
                color={nodeAssignments[type]?.style.get().fillColor}
                onChange={(color: string) => {
                  nodeAssignments[type]?.style.set({ fillColor: color });
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
      <div>
        <h3 className="text-white mb-2 text-sm font-bold border-b-zinc-700 border-b pb-2 w-full">
          Edge Types
        </h3>
        {edgeTypes.map((type) => (
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
            {edgeAssignments[type]?.style && (
              <ColorPicker
                color={edgeAssignments[type]?.style.get().tintColor}
                onChange={(color: string) => {
                  edgeAssignments[type]?.style.set({ tintColor: color });
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
    </div>
  );
}
