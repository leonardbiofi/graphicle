


blob/main/DEVELOPERS.md
<div align="center">
<img src="https://raw.githubusercontent.com/leonardbiofi/graphicle/main/packages/base/logo.png" alt="Graphicle Logo" class="logo" width="200" height="200" />

 
</div>
<p align="center" style="font-size: 48px; color: #fff; font-weight: 700;">Graphicle</p>


<p style="font-size: 18px; margin: 30 0; font-style: bold">
DOM-like graph network engine powered by PixiJS.
Build interactive, animated graph UIs with a developer-friendly API and WebGL performance.
</p>

---

[![Demo](https://img.shields.io/badge/Demo-Live-blue?style=for-the-badge&logo=netlify)](https://graphicle.netlify.app)  
[![npm version](https://img.shields.io/npm/v/@graphicle/base?style=for-the-badge)](https://www.npmjs.com/package/@graphicle/base)  
[![License](https://img.shields.io/npm/l/@graphicle/base?style=for-the-badge)](LICENSE)

---

## 🚀 Live Demo

Currently building a **Live Graph Editor** — a visual interface where users can **create, edit, and explore graph structures** directly in the browser.  

🔗  <a href="https://graphicle.netlify.app" target="_blank" style="margin: 0 5px;"> https://graphicle.netlify.app </a>


The editor is meant to support:

- Custom styling of elements
- Live previews of layout, physics, and animations
- Exporting graph state as JSON or code
- Future support for collaboration (multi-user)



## 📦 Installation

Graphicle can be easily installed with npm packages:

```bash
npm install @graphicle/base
```


## 🧪 Usage Example
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



## 🤝 Contributing

We welcome contributions!

Ways to help:

🐛 Report bugs and suggest features via GitHub Issues

🌱 Help improve the React wrapper

✨ Add new features like node drag handles or custom edge animations

🧪 Write tests or improve TypeScript types

**For more details please see the [Developer Guide](https://github.com/leonardbiofi/graphicle/blob/main/DEVELOPERS.md)**

## ⚠️ IN CONSTRUCTION

**This library is still under construction and is not yet designed to be used in production**

## 🧠 Roadmap Ideas

> [!WARNING]
> A react wrapper is underdevelopment with some examples
> 
The library aims to be used inside react. A demo application using react has already been implemented. But I still need to document and write guides on how to use it 

Future improvements:
- Improve mobile support
  
- Clustering algorithms
  
- Shape customization
  
- Save and Load session with `localStorage`

- Improve documentation


## 🔬 Graphicle vs. Cytoscape.js

| Feature                     | Graphicle                          | Cytoscape.js                     |
| --------------------------- | ---------------------------------- | -------------------------------- |
| Rendering Engine            | WebGL (via PixiJS)                 | Canvas / SVG                     |
| Performance on large graphs | High (GPU-accelerated)             | Moderate                         |
| Layouts                     | Manual or physics-based (planned)  | Many built-in (e.g., cose, grid) |
| Interactivity               | High (custom handlers, animations) | High (extensions available)      |
| Custom Styling              | Fully customizable (nodes/edges)   | Themeable, but more limited      |
| React Integration           | WIP (wrapper in development)       | Available (cytoscape-react)      |
| Editor UI                   | In development                     | Available via third-party tools  |
| Use Case Focus              | Interactive UIs, animations        | Scientific / data visualization  |


## 📄 License

MIT License

## 🔗 Useful Links

[Data source for Graph Networks](https://snap.stanford.edu/data/)