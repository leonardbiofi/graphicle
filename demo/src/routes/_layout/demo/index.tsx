import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useQuery } from "@tanstack/react-query";
import CanvasWrapper from "@/components/CanvasWrapper";
import { z } from "zod";

// const datasetSearchParams = z.object({
//   name: z.string().catch("miserables"),
// });

export const Route = createFileRoute("/_layout/demo/")({
  // validateSearch: zodValidator(datasetSearchParams),
  component: RouteComponent,
});

function RouteComponent() {
  return <CanvasWrapper />;
}
