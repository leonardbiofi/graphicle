import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import * as d3 from "d3-force";
import { Simulation } from "d3-force";
import type { Node } from "@graphicle/base";
import { throttle } from "@tanstack/pacer";

import { useGraphicleStore } from "@/store/graphicleStore";
import { useForceLayoutStore } from "@/store/layoutStore";
import { useGraphicle } from "@/components/GraphicleProvider";

import { ObservableStyle } from "./observableStyle";

export function useObservableStyle<TStyle extends object>(
  styleStore: ObservableStyle<TStyle>
): [TStyle, ObservableStyle<TStyle>] {
  const style = useSyncExternalStore(
    styleStore.subscribe.bind(styleStore),
    () => styleStore.get()
  );
  return [style, styleStore];
}

export function useForceLayout() {
  const edges = useGraphicleStore((s) => s.edges);
  // const nodes = useGraphicleStore((s) => s.nodes);

  const setNodes = useGraphicleStore((s) => s.setNodes);
  const isForceActive = useForceLayoutStore((s) => s.active);
  const draggingNodeRef = useRef<null | Node>(null);
  const { graphicleRef } = useGraphicle();
  const simulationRef = useRef<Simulation<any, any>>(null);
  const dragEvents = useMemo(
    () => ({
      start: (node: Node) => (draggingNodeRef.current = node),
      drag: (node: Node) => {
        draggingNodeRef.current = node;
        if (simulationRef.current && simulationRef.current.alpha() < 0.3) {
          simulationRef.current.alpha(1).restart();
        }
      },
      stop: () => (draggingNodeRef.current = null),
    }),
    []
  );
  useEffect(() => {
    if (!isForceActive) return () => {};
    if (!graphicleRef.current) return;
    const nodes = graphicleRef.current.store.getNodes();
    const simulationEdges = edges.map((eds) => ({ ...eds }));

    const simulationNodes = nodes.map((node: Node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
      fy: undefined,
      fx: undefined,
    }));

    const onTick = throttle(
      () => {
        if (!graphicleRef.current) return;

        const nodes = graphicleRef.current.store.getNodes();

        const nextNodes = nodes.map((n, i) => {
          if (simulationNodes[i]) {
            const { x, y } = simulationNodes[i];
            const dragging = draggingNodeRef.current?.id === n.id;
            if (dragging) {
              // Setting the fx/fy properties of a node tells the simulation to
              // "fix" the node at that position and ignore any forces that would
              // normally cause it to move.
              //
              // The node is still part of the simulation, though, and will push
              // other nodes around while the simulation runs.
              // @ts-expect-error FIXME: need better typescript handling
              simulationNodes[i].fx = n.position.x;
              // @ts-expect-error FIXME: need better typescript handling
              simulationNodes[i].fy = n.position.y;

              return { ...n, position: draggingNodeRef.current?.position };
            } else {
              delete simulationNodes[i].fx;
              delete simulationNodes[i].fy;
            }

            return { ...n, position: { x: x ?? 0, y: y ?? 0 } };
          }

          return { ...n };
        });

        // @ts-expect-error FIXME: need better typescript handling
        setNodes(nextNodes); // trigger state update}, { wait: 100 });
      },
      { wait: 100 }
    );

    simulationRef.current = d3
      .forceSimulation(simulationNodes)
      .force(
        "link",
        d3
          .forceLink(simulationEdges)
          .id((d: any) => d.id)
          .distance(50)
          .strength(0.01)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter())
      .force("collide", d3.forceCollide().radius(80))
      // .alphaDecay(0.015) // slower cooling
      .alpha(0.3)
      .restart()
      .on("tick", onTick);

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
        simulationRef.current = null;
      }
    }; // stop when unmounted or disabled
  }, [isForceActive, graphicleRef, setNodes]);

  return dragEvents;
}
