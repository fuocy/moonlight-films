import { FunctionComponent } from "react";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";

const SidebarMini: FunctionComponent = () => {
  const location = useLocation();

  return (
    <div className="shrink-0 max-w-[80px] w-full py-8 flex flex-col items-center justify-between h-screen sticky top-0">
      <Link to="/">
        <LazyLoadImage
          alt="Logo"
          src="/logo.png"
          effect="opacity"
          className="w-10 h-10"
        />
      </Link>
      <div className="flex flex-col gap-7">
        <Link
          to="/"
          className={`hover:text-primary transition duration-300 ${
            location.pathname === "/" && "text-primary"
          }`}
        >
          <AiOutlineHome size={25} />
        </Link>
        <Link
          to="/explore"
          className={`hover:text-primary transition duration-300 ${
            location.pathname === "/explore" && "text-primary"
          }`}
        >
          <MdOutlineExplore size={25} />
        </Link>
        <Link
          to="/bookmarked"
          className={`hover:text-primary transition duration-300 ${
            location.pathname === "/bookmarked" && "text-primary"
          }`}
        >
          <BsBookmarkHeart size={25} />
        </Link>
        <Link
          to="/history"
          className={`hover:text-primary transition duration-300 ${
            location.pathname === "/history" && "text-primary"
          }`}
        >
          <AiOutlineHistory size={25} />
        </Link>

        <Link
          to="/search"
          className={`hover:text-primary transition duration-300 ${
            location.pathname === "/search" && "text-primary"
          }`}
        >
          <BiSearch size={25} />
        </Link>
      </div>
      <LazyLoadImage
        src="/avatarTest.jpg"
        alt="Avatar"
        effect="opacity"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default SidebarMini;
