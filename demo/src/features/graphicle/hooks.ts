import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import * as d3 from "d3-force";
import { Simulation } from "d3-force";
import type { Node } from "@graphicle/base";
import { debounce, throttle } from "@tanstack/pacer";

import { useGraphicleStore } from "@/store/graphicleStore";
import { useForceLayoutStore } from "@/store/layoutStore";
import { getGraphicle, useGraphicle } from "@/components/GraphicleProvider";

import { ObservableStyle } from "./observableStyle";
import { createWebworker } from "./workers/forceWorker";
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
  // const edges = useGraphicleStore((s) => s.edges);
  // const nodes = useGraphicleStore ((s) => s.nodes);
  const sendTime = useRef<number | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const setNodes = useGraphicleStore((s) => s.setNodes);
  const isForceActive = useForceLayoutStore((s) => s.active);
  const draggingNodeRef = useRef<null | Node>(null);
  // const simulationRef = useRef<Simulation<any, any>>(null);
  const dragEvents = useMemo(
    () => ({
      start: (node: Node) => (draggingNodeRef.current = node),
      drag: (node: Node) => {
        draggingNodeRef.current = node;
        // if (simulationRef.current && simulationRef.current.alpha() < 0.3) {
        //   simulationRef.current.alpha(1).restart();
        // }
        if (workerRef.current)
          workerRef.current.postMessage({
            type: "draggingNode",
            draggingNode: node,
          });
      },
      stop: () => {
        draggingNodeRef.current = null;
        if (workerRef.current)
          workerRef.current.postMessage({
            type: "draggingNode",
            draggingNode: undefined,
          });
      },
    }),
    []
  );

  useEffect(() => {
    if (isForceActive) {
      const graphicle = getGraphicle();
      if (!graphicle) return;
      const nodes = graphicle.store.getNodes();
      const edges = graphicle.store.getEdges();
      const simulationEdges = edges.map((eds) => ({ ...eds }));
      const simulationNodes = nodes.map((node: Node) => ({
        id: node.id,
        x: node.position.x,
        y: node.position.y,
        fy: undefined,
        fx: undefined,
      }));
      workerRef.current = createWebworker();

      let nodesBuffer = new Float32Array(nodes.length * 2);

      // Listen when the web worker has finished calculation position
      workerRef.current.onmessage = (event) => {
        // worker.terminate();
        // URL.revokeObjectURL(workerUrl);

        const { type } = event.data;

        nodesBuffer = event.data.nodesBuffer;

        if (type === "updateMainBuffers") {
          // console.log(nodesBuffer);
          // graph = event.data;

          // updateNodesFromBuffer();

          // const currentNodes = graphicle.store.getNodes();

          // Rerender the node, update the nodes from buffer
          const nextNodes = nodes.map((n, i) => {
            if (n.id !== draggingNodeRef.current?.id) {
              return {
                ...n,
                position: {
                  x: nodesBuffer[i * 2 + 0],
                  y: nodesBuffer[i * 2 + 1],
                },
              };
            } else {
              return { ...draggingNodeRef.current };
            }
          });

          setNodes(nextNodes);
          updateWorkerBuffers();

          // } else if(type === 'updateMainSharedBuffer') {
          //   updateNodesFromSharedBuffer();
        }
      };

      const updateWorkerBuffers = throttle(
        () => {
          if (!workerRef.current) return;
          sendTime.current = Date.now();
          workerRef.current.postMessage(
            {
              type: "updateWorkerBuffers",
              nodesBuffer,
            },
            [nodesBuffer.buffer]
          );
        },
        { wait: 0 }
      );

      // Create the simulation object
      workerRef.current.postMessage(
        {
          type: "createSimulation",
          nodes: simulationNodes,
          edges: simulationEdges,

          nodesBuffer,
        },
        [nodesBuffer.buffer]
      );
    } else {
      workerRef.current = null;
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [isForceActive]);
  // useEffect(() => {
  //   if (!isForceActive) return () => {};
  //   if (!graphicleRef.current) return;
  //   const nodes = graphicleRef.current.store.getNodes();
  //   const simulationEdges = edges.map((eds) => ({ ...eds }));

  //   const simulationNodes = nodes.map((node: Node) => ({
  //     ...node,
  //     x: node.position.x,
  //     y: node.position.y,
  //     fy: undefined,
  //     fx: undefined,
  //   }));

  //   const onTick = throttle(
  //     () => {
  //       if (!graphicleRef.current) return;

  //       const nodes = graphicleRef.current.store.getNodes();

  //       const nextNodes = nodes.map((n, i) => {
  //         if (simulationNodes[i]) {
  //           const { x, y } = simulationNodes[i];
  //           const dragging = draggingNodeRef.current?.id === n.id;
  //           if (dragging) {
  //             // Setting the fx/fy properties of a node tells the simulation to
  //             // "fix" the node at that position and ignore any forces that would
  //             // normally cause it to move.
  //             //
  //             // The node is still part of the simulation, though, and will push
  //             // other nodes around while the simulation runs.
  //             // @ts-expect-error FIXME: need better typescript handling
  //             simulationNodes[i].fx = n.position.x;
  //             // @ts-expect-error FIXME: need better typescript handling
  //             simulationNodes[i].fy = n.position.y;

  //             return { ...n, position: draggingNodeRef.current?.position };
  //           } else {
  //             delete simulationNodes[i].fx;
  //             delete simulationNodes[i].fy;
  //           }

  //           return { ...n, position: { x: x ?? 0, y: y ?? 0 } };
  //         }

  //         return { ...n };
  //       });

  //       // @ts-expect-error FIXME: need better typescript handling
  //       setNodes(nextNodes); // trigger state update}, { wait: 100 });
  //     },
  //     { wait: 50 }
  //   );

  //   simulationRef.current = d3
  //     .forceSimulation(simulationNodes)
  //     .force(
  //       "link",
  //       d3
  //         .forceLink(simulationEdges)
  //         .id((d: any) => d.id)
  //         .distance(50)
  //         .strength(0.01)
  //     )
  //     .force("charge", d3.forceManyBody().strength(-200))
  //     .force("center", d3.forceCenter())
  //     .force("collide", d3.forceCollide().radius(80))
  //     // .alphaDecay(0.015) // slower cooling
  //     .alpha(0.3)
  //     .restart()
  //     .tick(1)
  //     .on("tick", onTick);

  //   return () => {
  //     if (simulationRef.current) {
  //       simulationRef.current.stop();
  //       simulationRef.current = null;
  //     }
  //   }; // stop when unmounted or disabled
  // }, [isForceActive, graphicleRef, setNodes]);

  return dragEvents;
}
