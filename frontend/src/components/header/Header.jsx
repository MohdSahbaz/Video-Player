// hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { GoVideo } from "react-icons/go";
import { RiVideoAddLine } from "react-icons/ri";
import { FaUserCircle, FaSearch, FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { AuthContext } from "../../context/auth/authContext";

const Header = () => {
  const { profile, user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    profile();
  }, []);

  const handleAuth = () => {
    const checkLogin = localStorage.getItem("authToken");
    if (checkLogin) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  // Handles the navigation menu for small devices
  const handleToggleMenu = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      <div className="flex justify-start items-center md:px-10 px-2 py-2 text-white sticky top-0 z-10 gap-2 bg-gray-800">
        <div className="">
          <IoMdMenu
            onClick={handleToggleMenu}
            className="text-3xl cursor-pointer"
          />
          {isToggle && (
            <>
              <div
                className="bg-gray-800 flex absolute flex-col gap-6 md:px-10 top-[48px] border-t left-0 px-2 py-5 overflow-y-auto overflow-x-hidden"
                style={{ height: "calc(100vh - 48px)" }}
              >
                <SideBarLink
                  to={"/"}
                  label={"Home"}
                  onClick={handleToggleMenu}
                />
                <SideBarLink
                  to={"/myvideo"}
                  label={"My Video"}
                  onClick={handleToggleMenu}
                />
                <SideBarLink
                  to={"watchlater"}
                  label={"Watch Later"}
                  onClick={handleToggleMenu}
                />
                <SideBarLink
                  to={"following"}
                  label={"Following"}
                  onClick={handleToggleMenu}
                />
                <SideBarLink
                  to={"trending"}
                  label={"Trending"}
                  onClick={handleToggleMenu}
                />
              </div>
              <span
                onClick={handleToggleMenu}
                className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity duration-300 ease-in-out -z-20"
              ></span>
            </>
          )}
        </div>
        <div
          onClick={() => {
            if (isToggle === true) {
              setIsToggle(false);
            }
          }}
          className="flex justify-between w-full"
        >
          <div
            className="flex justify-between items-center gap-1 cursor-pointer"
            onClick={() => {
              navigate("/");
              if (isToggle === true) {
                setIsToggle(false);
              }
            }}
          >
            <GoVideo className="text-2xl text-violet-600" />
            <b>SolKer</b>
          </div>
          <div className="flex items-center w-1/3 h-8 border border-violet-400 hover:border-violet-600 transition-all rounded-2xl">
            <input
              type="search"
              name="search_video"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              className="px-4 py-2 rounded-l-2xl h-full bg-transparent outline-none text-sm w-full"
            />
            <button
              className="p-2 rounded-r-2xl h-8 hover:bg-violet-600 bg-violet-400 px-4 transition"
              aria-label="Search"
            >
              <FaSearch className="text-white h-5 bg-transparent cursor-pointer" />
            </button>
          </div>
          <div className="flex justify-between items-center gap-5">
            <RiVideoAddLine
              onClick={() => navigate("/upload-video")}
              className="text-2xl cursor-pointer"
            />
            <div>
              {user.picture ? (
                <img
                  src={user.picture}
                  onClick={handleAuth}
                  className="w-8 rounded-full cursor-pointer border-2"
                  alt="profile"
                />
              ) : (
                <FaUserCircle
                  className="w-6 h-8 cursor-pointer"
                  onClick={handleAuth}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

const SideBarLink = ({ to, label, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className="text-white bg-slate-800 hover:bg-black transition-all rounded px-4 py-2"
    >
      {label}
    </Link>
  );
};

export default Header;
