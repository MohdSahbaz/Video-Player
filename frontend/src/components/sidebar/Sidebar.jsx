import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex md:px-10 px-2 py-5">
      <div className="flex flex-col w-1/6 gap-6">
        <SideBarLink to={"/"} label={"Home"} />
        <SideBarLink to={"playlist"} label={"Playlist"} />
        <SideBarLink to={"watchlater"} label={"Watch Later"} />
        <SideBarLink to={"liked"} label={"Liked Video"} />
        <SideBarLink to={"trending"} label={"Trending"} />
      </div>
      <Outlet />
    </div>
  );
};

const SideBarLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-white bg-slate-800 hover:bg-black transition-all rounded px-4 py-2"
    >
      {label}
    </Link>
  );
};

export default Sidebar;
