export function createWebworker() {
  // console.log('Create web worker');

  // nodesBuffer = new Float32Array(graph.nodes.length * 2); // transferable object

  // const size = Int32Array.BYTES_PER_ELEMENT * graph.nodes.length * 2;
  // sharedBuffer = new SharedArrayBuffer(size);
  // sharedArray = new Int32Array(sharedBuffer);

  const workerCode = `
    importScripts('https://unpkg.com/d3@7/dist/d3.min.js');

    let simulation;
    let nodes;
    let links;

    function copyDataToBuffers(nodesBuffer) {
      // Copy over the data to the buffers
      for(var i = 0; i < nodes.length; i++){
          var node = nodes[i];
          nodesBuffer[i * 2 + 0] = node.x;
          nodesBuffer[i * 2 + 1] = node.y;
      }

      postMessage({ type: 'updateMainBuffers', nodesBuffer }, [nodesBuffer.buffer]);
    }

    self.onmessage = event => {

      if(!nodes) nodes =event.data.nodes;
      if(!links) links = event.data.edges; 
      const {type } = event.data

      if(type === 'createSimulation') {
        if(!simulation) {

          simulation = d3.forceSimulation(nodes)
            .alpha(0.3)
            .force("link", d3.forceLink(links).id(d => d.id).distance(50).strength(0.01))
            .force("charge", d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter())
            .tick(1)
            .stop()
            ;

        }

        copyDataToBuffers(event.data.nodesBuffer);
        // copyDataToSharedBuffer(event.data.sharedBuffer);

      } else if(type === 'updateWorkerGraph') {
        graph = event.data.graph;
        simulation
          .nodes(graph.nodes)
          .force("link", d3.forceLink(graph.links).id(d => d.id))
        ;

      } else if(type === 'updateWorkerNodePositions') {
        const { nodes } = event.data;

        const n = simulation.nodes();
        for(var i = 0; i < n.length; i++){
            n[i].x = nodes[i].x;
            n[i].y = nodes[i].y;
        }

      } else if(type === 'updateWorkerBuffers') {
        if(simulation) {

          simulation
            .force('center', d3.forceCenter())
            .tick(1)
            ;
        }

        copyDataToBuffers(event.data.nodesBuffer);

      } else if(type === 'draggingNode') {

        const { draggingNode } = event.data

        if(simulation) {
        
          const nodes = simulation.nodes();

          for(var i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            if(draggingNode.id === node.id) {
              node.x = draggingNode.position.x;
              node.y = draggingNode.position.y;
              node.fx = draggingNode.position.x;
              node.fy = draggingNode.position.y;
            } else {
              delete node.fx
              delete node.fy
              }
          }

        }
      }

    }
  `;

  const workerBlob = new Blob([workerCode], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(workerBlob);

  return new Worker(workerUrl);

  // worker.onmessage = (event) => {
  //   // worker.terminate();
  //   // URL.revokeObjectURL(workerUrl);

  //   const { type } = event.data;

  //   nodesBuffer = event.data.nodesBuffer;

  //   if (type === "updateMainBuffers") {
  //     // console.log(nodesBuffer);
  //     // graph = event.data;

  //     updateNodesFromBuffer();

  //     // } else if(type === 'updateMainSharedBuffer') {
  //     //   updateNodesFromSharedBuffer();
  //   }
  // };

  // createWorkerSimulation();
}

// function createWorkerSimulation() {
//   sendTime = Date.now();
//   worker.postMessage(
//     {
//       type: "createSimulation",
//       graph,
//       options: {
//         alpha: ALPHA,
//         alphaDecay: ALPHA_DECAY,
//         alphaTarget: ALPHA_TARGET,
//         iterations: params.numInterations,
//         nodeRepulsionStrength: FORCE_LAYOUT_NODE_REPULSION_STRENGTH,
//         width,
//         height,
//       },
//       nodesBuffer,
//     },
//     [nodesBuffer.buffer]
//   );
// }
