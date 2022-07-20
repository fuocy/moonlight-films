import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsBookmarkHeart } from "react-icons/bs";
import { AiOutlineHistory } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TbBrandTiktok } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";
const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <div className="shrink-0 max-w-[260px] w-[90vw] mt-4 pl-8">
      <Link to="/" className="flex items-center gap-3">
        <LazyLoadImage
          alt="Logo"
          src="./logo.png"
          effect="blur"
          className="w-10 h-10"
        />
        <h1 className="text-xl text-white tracking-widest font-semibold uppercase">
          Moonlight
        </h1>
      </Link>

      <div className="text-white text-lg font-medium mt-12">MENU</div>
      <div className="mt-8 ml-4 flex flex-col gap-6">
        <Link
          to="/"
          className={`flex gap-6 items-center  ${
            location.pathname === "/" &&
            "text-primary border-r-4 border-primary font-medium"
          }`}
        >
          <AiOutlineHome size={25} />
          <p>Home</p>
        </Link>

        <Link
          to="/explore"
          className={`flex gap-6 items-center  ${
            location.pathname === "/explore" &&
            "text-primary border-r-4 border-primary font-medium"
          }`}
        >
          <MdOutlineExplore size={25} />
          <p>Explore</p>
        </Link>

        <Link
          to="/shorts"
          className={`flex gap-5 items-center  ${
            location.pathname === "/shorts" &&
            "text-primary border-r-4 border-primary font-medium"
          }`}
        >
          <TbBrandTiktok size={30} />
          <p>Shorts</p>
        </Link>
      </div>

      <div className="text-white text-lg font-medium mt-12">PERSONAL</div>
      <div className="mt-8 ml-4 flex flex-col gap-6">
        <Link
          to="/bookmarked"
          className={`flex gap-6 items-center  ${
            location.pathname === "/bookmarked" &&
            "text-primary border-r-4 border-primary font-medium"
          }`}
        >
          <BsBookmarkHeart size={25} />
          <p>Bookmarked</p>
        </Link>

        <Link
          to="/history"
          className={`flex gap-6 items-center  ${
            location.pathname === "/history" &&
            "text-primary border-r-4 border-primary font-medium"
          }`}
        >
          <AiOutlineHistory size={25} />
          <p>History</p>
        </Link>
      </div>

      <div className="text-white text-lg font-medium mt-12">GENERAL</div>
      <div className="mt-8 ml-4 flex flex-col gap-6">
        <Link
          to="/settings"
          className={`flex gap-6 items-center  ${
            location.pathname === "/settings" &&
            "text-primary border-r-4 border-primary font-medium"
          }`}
        >
          <FiSettings size={25} />
          <p>Settings</p>
        </Link>

        <Link
          to={`/login&redirect=${encodeURIComponent(location.pathname)}`}
          className="flex gap-6 items-center"
        >
          <HiOutlineLogin size={25} />
          <p>Login</p>
        </Link>

        <button className="flex gap-5 items-center">
          <HiOutlineLogout size={30} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
