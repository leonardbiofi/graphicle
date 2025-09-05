import { promises as fs } from "fs";
import path from "path";

// import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import CanvasWrapper from "@/components/CanvasWrapper";

async function readDataset(datasetId: string): Promise<any> {
  const filePath = path.join("src", "server", "datasets", `${datasetId}.json`);

  try {
    const fileContents = await fs.readFile(filePath, { encoding: "utf-8" });

    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to read dataset file: ${filePath}`, error);
    throw new Error(`Dataset "${datasetId}" not found or invalid JSON.`);
  }
}

const getDataset = createServerFn({
  method: "GET",
  response: "data",
})
  .validator((data: string) => {
    console.log("DATASET NAME:", data);
    return data;
  })
  .handler(async ({ data }) => await readDataset(data));

// const addTodo = createServerFn({ method: "POST" })
//   .validator((d: string) => d)
//   .handler(async ({ data }) => {
//     const todos = await readTodos();
//     todos.push({ id: todos.length + 1, name: data });
//     await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2));
//     return todos;
//   });

export const Route = createFileRoute("/_layout/demo/$datasetName")({
  component: RouteComponent,
  loader: async ({ params: { datasetName } }) => {
    const result = await getDataset({ data: datasetName });
    console.log("RESULTS", result);
    return result;
  },
});

function RouteComponent() {
  // const router = useRouter();
  let graphData = Route.useLoaderData();

  console.log("GRAPHDATA:", graphData);

  // const [todo, setTodo] = useState("");

  // const submitTodo = useCallback(async () => {
  //   todos = await addTodo({ data: todo });
  //   setTodo("");
  //   router.invalidate();
  // }, [addTodo, todo]);
  return (
    <div>
      <CanvasWrapper />
    </div>
  );
}
