import { createServerFileRoute } from "@tanstack/react-start/server";
// import { promises as fs } from "fs";
// import * as fs from "node:fs";

// import path from "path";
import { json } from "@tanstack/react-start";

import miserablejson from "@/data/miserables.json";
import genejson from "@/data/genes.json";
import worldcupjson from "@/data/worldcup.json";
import circlejson from "@/data/circle.json";

const datasets: Record<string, object> = {
  miserables: miserablejson,
  genes: genejson,
  circle: circlejson,
  worldcup: worldcupjson,
};
// import { fileURLToPath } from "url";

// __dirname equivalent in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const ServerRoute = createServerFileRoute(
  "/api/dataset/$datasetName"
).methods({
  GET: async ({ params: { datasetName } }) => {
    const graphData = await readDataset(datasetName);
    return json(graphData);
  },
});

async function readDataset(filename: string): Promise<any> {
  try {
    // const filePath = path.join("src", "data", `${filename}.json`);

    // const fileContents = await fs.promises.readFile(
    //   `src/data/${filename}.json`,
    //   {
    //     encoding: "utf-8",
    //   }
    // );
    const fileContents = datasets[filename];

    // console.log("fileConten:", fil);

    return fileContents;
  } catch (error) {
    console.error(`Failed to read dataset file, ${error}`);
    throw new Error(`Dataset "${filename}" not found or invalid JSON.`);
  }
}
