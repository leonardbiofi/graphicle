import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="bg-zinc-900 flex  h-[calc(100vh_-_64px)] w-screen items-center text-white flex-col p-10">
      <header className="animate-fade-in-up text-pretty p-5 mb-5 lg:pt-50 lg:mb-30">
        <h1 className="text-6xl/snug font-extrabold tracking-widest">
          Graphicle
        </h1>
        <h2 className="text-4xl/tight">
          The fast lane for graph rendering - powered by WebGL & PixiJS
        </h2>
      </header>
      <div className="animate-fade-in-up">
        <Link
          to="/demo"
          className=" bg-teal-700 p-4 text-xl rounded-3xl hover:bg-teal-950 animate duration-300"
        >
          Get Started
        </Link>
      </div>

      {/* <Button className="rounded-full">Get Started</Button> */}
    </main>
  );
}
