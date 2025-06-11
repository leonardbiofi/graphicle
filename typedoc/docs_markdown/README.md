**@graphicle/js**

***

<div style="display: flex; align-items: center;">
  <img src="_media/image-removebg.png" alt="Image" width="200" height="200" style="margin-right: 10px;">
  <strong style="font-size: 48px; color: #fff; font-weight: 700;">Graphicle</strong>
</div>

DOM-like graph network engine powered by PixiJS.
Build interactive, animated graph UIs with a developer-friendly API and WebGL performance.

# Getting Started

## Installation

Graphicle can be easily installed with npm packages:

```bash
npm install @graphicle/js
```

## Examples
You can easily instantiate a Graphicle instance using the `createGraphicle` method

```ts
 /** Select your wrapper or html element first */
 const graphicleWrapper = document.getElementById("graphicle");
  if (!graphicleWrapper) return;

  /** Create the Graphicle here */
  const graphicle = await createGraphicle({
    container: graphicleWrapper,
    initialState: {
      nodes: nodes,
      edges: nextEdges,
    },
    options: {
      customEdges: {},
      customNodes: {},
      selectOnDrag: true,
      handlers: { onNodeClick: (n) => console.log("node Clicked", n) },
    },
  });

```

# Useful Links

[Data source for Graph Networks](https://snap.stanford.edu/data/)
