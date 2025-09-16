import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import * as d3 from "d3-force";
import { Simulation } from "d3-force";
import type { Node } from "@graphicle/base";
import { throttle } from "@tanstack/pacer";

import { useGraphicleStore } from "@/store/graphicleStore";
import { useForceLayoutStore } from "@/store/layoutStore";
import { useGraphicle } from "@/components/GraphicleProvider";

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
const delta = 1 / 60;

export function useForceLayout() {
  // const edges = useGraphicleStore((s) => s.edges);
  // const nodes = useGraphicleStore ((s) => s.nodes);
  const sendTime = useRef<number | null>(null);
  const workerRef = useRef<Worker | null>(null);
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
        if (workerRef.current)
          workerRef.current.postMessage({
            type: "dragging",
            draggingNode: node,
          });
      },
      stop: () => (draggingNodeRef.current = null),
    }),
    []
  );

  useEffect(() => {
    if (graphicleRef.current && isForceActive) {
      const nodes = graphicleRef.current.store.getNodes();
      const edges = graphicleRef.current.store.getEdges();
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

        if (type === "updateMainBuffers" && graphicleRef.current) {
          // console.log(nodesBuffer);
          // graph = event.data;

          // updateNodesFromBuffer();

          const currentNodes = graphicleRef.current.store.getNodes();

          // Rerender the node, update the nodes from buffer
          const nextNodes = currentNodes.map((n, i) => {
            if (n.id !== draggingNodeRef.current?.id) {
              return {
                ...n,
                position: {
                  x: nodesBuffer[i * 2 + 0],
                  y: nodesBuffer[i * 2 + 1],
                },
              };
            } else {
              return { ...n };
            }
          });

          setNodes(nextNodes);
          // Update nodes from buffer
          // for (var i = 0; i < nodes.length; i++) {
          //   const node = graph.nodes[i];
          //   if (draggingNode !== node) {
          //     // const gfx = gfxMap.get(node);
          //     const gfx = gfxIDMap[node.id];
          //     // gfx.position = new PIXI.Point(x, y);

          //     if (params.interpolatePositions) {
          //       gfx.smoothFollowX.set((node.x = nodesBuffer[i * 2 + 0]));
          //       gfx.smoothFollowY.set((node.y = nodesBuffer[i * 2 + 1]));
          //     } else {
          //       gfx.position.x = node.x = nodesBuffer[i * 2 + 0];
          //       gfx.position.y = node.y = nodesBuffer[i * 2 + 1];
          //     }
          //   }
          // }
          let delay = delta * 1000 - (Date.now() - (sendTime.current || 0));
          if (delay < 0) {
            delay = 0;
          }
          setTimeout(updateWorkerBuffers, delay);

          // } else if(type === 'updateMainSharedBuffer') {
          //   updateNodesFromSharedBuffer();
        }
      };
      function updateWorkerBuffers() {
        if (!workerRef.current) return;
        sendTime.current = Date.now();
        workerRef.current.postMessage(
          {
            type: "updateWorkerBuffers",
            nodesBuffer,
          },
          [nodesBuffer.buffer]
        );
      }

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
  }, [graphicleRef, isForceActive]);
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
