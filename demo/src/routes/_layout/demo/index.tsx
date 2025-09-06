import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useQuery } from "@tanstack/react-query";
import CanvasWrapper from "@/components/CanvasWrapper";
import { z } from "zod";

const datasetSearchParams = z.object({
  name: z.string().catch("miserables"),
});

export const Route = createFileRoute("/_layout/demo/")({
  validateSearch: zodValidator(datasetSearchParams),
  component: RouteComponent,
});

function getData(name: string) {
  return fetch(`/api/dataset/${name}`).then((res) => res.json());
}
function RouteComponent() {
  const { name } = Route.useSearch();

  const { data, isPending } = useQuery({
    queryFn: () => getData(name),
    queryKey: [name],
  });

  if (isPending) return <div>Loading...</div>;
  return <CanvasWrapper nodes={data.nodes} edges={data.edges} />;
}
