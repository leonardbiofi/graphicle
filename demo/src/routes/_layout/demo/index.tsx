import { createFileRoute } from "@tanstack/react-router";
// import { zodValidator } from "@tanstack/zod-adapter";
// import { useQuery } from "@tanstack/react-query";
import CanvasWrapper from "@/components/CanvasWrapper";
// import { z } from "zod";
import { GraphicleProvider } from "@/components/GraphicleProvider";

// import { getGraphicle } from "@/components/GraphicleProvider";

// const datasetSearchParams = z.object({
//   name: z.string().catch("miserables"),
// });

export const Route = createFileRoute("/_layout/demo/")({
  // validateSearch: zodValidator(datasetSearchParams),
  component: RouteComponent,

  // loaderDeps: ({ search }) => {
  //   const filename = search.name ?? "";
  //   return { filename };
  // },
  // loader: async ({ deps: { filename } }) => {
  //   if (filename) {
  //     const jsonData = await getDataset({ data: filename });
  //     const { nodes, edges } = jsonData;

  //     // Set the forcelayout to null
  //     useForceLayoutStore.setState(() => ({ active: false }));

  //     // Load the graph data and generate a custom view
  //     const { nodeMap, edgeMap, nodeAssignments, edgeAssignments } =
  //       await graphLoader({ nodes, edges });

  //     // // Fit the view of the viewport
  //     // getGraphicle()?.viewport?.fitView();

  //     return {
  //       nodes: jsonData.nodes,
  //       edges: jsonData.edges,
  //       nodeMap,
  //       edgeMap,
  //       nodeAssignments,
  //       edgeAssignments,
  //     };
  //     // console.log("DATA:", jsonData);
  //   }
  // },
});

function RouteComponent() {
  // const jsonData = Route.useLoaderData();

  return (
    <GraphicleProvider>
      <CanvasWrapper />
    </GraphicleProvider>
  );
}
