function createWebworker() {
  // console.log('Create web worker');

  nodesBuffer = new Float32Array(graph.nodes.length * 2); // transferable object

  // const size = Int32Array.BYTES_PER_ELEMENT * graph.nodes.length * 2;
  // sharedBuffer = new SharedArrayBuffer(size);
  // sharedArray = new Int32Array(sharedBuffer);

  const workerCode = `
    importScripts('https://unpkg.com/d3@7/dist/d3.min.js');

    let simulation;
    let graph;

    function copyDataToBuffers(nodesBuffer) {
      // Copy over the data to the buffers
      for(var i = 0; i < graph.nodes.length; i++){
          var node = graph.nodes[i];
          nodesBuffer[i * 2 + 0] = node.x;
          nodesBuffer[i * 2 + 1] = node.y;
      }

      postMessage({ type: 'updateMainBuffers', nodesBuffer }, [nodesBuffer.buffer]);
    }

    self.onmessage = event => {
      // console.log('event.data', event.data);
      // const result = forceLayout.apply(undefined, event.data);

      if(!graph) graph = event.data.graph;

      const { options, type } = event.data;
      // console.log(type);

      const { nodes, links } = graph;

      if(type === 'createSimulation') {
        if(!simulation) {
          const { alpha, alphaDecay, alphaTarget, iterations, nodeRepulsionStrength, width, height } = options;

          simulation = d3.forceSimulation()
            .alpha(alpha)
            .alphaDecay(alphaDecay)
            .alphaTarget(alphaTarget)
            .nodes(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-nodeRepulsionStrength))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .tick(iterations)
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
          const { iterations, width, height } = options;

          simulation
            .force('center', d3.forceCenter(width / 2, height / 2))
            .tick(iterations)
            ;
        }

        copyDataToBuffers(event.data.nodesBuffer);

      }

    }
  `;

  const workerBlob = new Blob([workerCode], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(workerBlob);
  worker = new Worker(workerUrl);

  worker.onmessage = (event) => {
    // worker.terminate();
    // URL.revokeObjectURL(workerUrl);

    const { type } = event.data;

    nodesBuffer = event.data.nodesBuffer;

    if (type === "updateMainBuffers") {
      // console.log(nodesBuffer);
      // graph = event.data;

      updateNodesFromBuffer();

      // } else if(type === 'updateMainSharedBuffer') {
      //   updateNodesFromSharedBuffer();
    }
  };

  createWorkerSimulation();
}

function createWorkerSimulation() {
  sendTime = Date.now();
  worker.postMessage(
    {
      type: "createSimulation",
      graph,
      options: {
        alpha: ALPHA,
        alphaDecay: ALPHA_DECAY,
        alphaTarget: ALPHA_TARGET,
        iterations: params.numInterations,
        nodeRepulsionStrength: FORCE_LAYOUT_NODE_REPULSION_STRENGTH,
        width,
        height,
      },
      nodesBuffer,
    },
    [nodesBuffer.buffer]
  );
}
