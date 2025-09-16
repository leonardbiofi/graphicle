importScripts("https://d3js.org/d3.v7.min.js");

let simulation;

self.onmessage = function (e) {
  const { type, nodes, links, draggedId, draggedPos } = e.data;

  if (type === "start") {
    simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(50)
          .strength(0.01)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter())
      .force("collide", d3.forceCollide().radius(80))
      .alpha(0.3)
      .on("tick", () => {
        self.postMessage({ type: "tick", nodes });
      });
  }

  if (type === "stop") {
    simulation?.stop();
  }

  if (type === "drag") {
    // Fix position of dragged node
    const node = simulation.nodes().find((n) => n.id === draggedId);
    if (node) {
      node.fx = draggedPos.x;
      node.fy = draggedPos.y;
    }
  }

  if (type === "dragEnd") {
    const node = simulation.nodes().find((n) => n.id === draggedId);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
  }
};
