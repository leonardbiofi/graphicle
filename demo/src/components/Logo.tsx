import LogoPng from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
export default function Logo() {
  return (
    <Link to="/">
      <div className="flex gap-4 items-center">
        <img
          className="h-10 w-10"
          src={LogoPng}
          width={200}
          height={200}
          alt="Graphicle Logo"
        />
        <h3 className="text-xl font-medium text-white">Graphicle</h3>
      </div>
    </Link>
  );
}
