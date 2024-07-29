// icons
import { GoVideo } from "react-icons/go";
import { RiVideoAddLine } from "react-icons/ri";
import { FaUserCircle, FaSearch } from "react-icons/fa";

// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center md:px-10 px-2 py-2 text-white sticky top-0 z-10">
      <div
        className="flex justify-between items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
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
          className="px-4 py-2 rounded-l-2xl h-full outline-none text-sm w-full"
        />
        <button
          className="p-2 rounded-r-2xl h-8 hover:bg-violet-600 bg-violet-400 px-4 transition"
          aria-label="Search"
        >
          <FaSearch className="text-white h-5 bg-transparent cursor-pointer" />
        </button>
      </div>
      <div className="flex justify-between items-center gap-5">
        <RiVideoAddLine className="text-xl cursor-pointer" />
        <FaUserCircle className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
