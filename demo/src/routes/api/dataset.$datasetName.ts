import { createServerFileRoute } from "@tanstack/react-start/server";
import { promises as fs } from "fs";
import path from "path";
import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute(
  "/api/dataset/$datasetName"
).methods({
  GET: async ({ params: { datasetName } }) => {
    const graphData = await readDataset(datasetName);
    return json(graphData);
  },
});

async function readDataset(filename: string): Promise<any> {
  const filePath = path.join("src", "server", "datasets", `${filename}.json`);

  try {
    const fileContents = await fs.readFile(filePath, { encoding: "utf-8" });

    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to read dataset file: ${filePath}`, error);
    throw new Error(`Dataset "${filename}" not found or invalid JSON.`);
  }
}
