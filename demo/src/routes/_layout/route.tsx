import { createFileRoute, Outlet } from "@tanstack/react-router";

import PanelWrapper from "@/components/PanelWrapper";

export const Route = createFileRoute("/_layout")({
  component: App,
});

function App() {
  return (
    <div className="flex min-h-[calc(100vh_-_64px)]">
      <header className="flex flex-col items-center justify-center bg-zinc-700 text-white text-[calc(10px+2vmin)]">
        <PanelWrapper />
      </header>
      <article className="bg-yellow-900 w-full">
        <Outlet />
      </article>
    </div>
  );
}
