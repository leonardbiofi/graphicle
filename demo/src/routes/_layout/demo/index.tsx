import { createFileRoute } from "@tanstack/react-router";
import CanvasWrapper from "@/components/CanvasWrapper";
export const Route = createFileRoute("/_layout/demo/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CanvasWrapper />;
}
