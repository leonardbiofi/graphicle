import Logo from "./Logo";
import GithubSvg from "@/assets/github.svg";

export default function Header() {
  return (
    <header className="p-4 flex gap-2 bg-zinc-800 text-black justify-between items-center h-16">
      <Logo />
      <nav className="flex flex-row">
        {/* <NavLink to="/" /> */}
        <a
          href="https://github.com/leonardbiofi/graphicle"
          target="__blank"
          className="cursor-pointer "
        >
          <img
            src={GithubSvg}
            width={200}
            height={200}
            alt="Github logo"
            className="block rounded-full h-8 w-8 "
          />
        </a>

        {/* 
        <div className="px-2 font-bold">
          <Link to="/demo/start/server-funcs">Start - Server Functions</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/start/api-request">Start - API Request</Link>
        </div> */}
      </nav>
    </header>
  );
}
