import { createFileRoute, Outlet } from "@tanstack/react-router";

import PanelWrapper from "@/components/PanelWrapper";

export const Route = createFileRoute("/_layout")({
  component: App,
});

function App() {
  return (
    <div className="flex h-[calc(100vh_-_64px)] max-w-screen bg-zinc-700">
      <header className="flex flex-col items-center justify-center bg-zinc-900 text-white text-[calc(10px+2vmin)]">
        <PanelWrapper />
      </header>

      <Outlet />
    </div>
  );
}
