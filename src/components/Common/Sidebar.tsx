import { signOut } from "firebase/auth";
import { FC, useState } from "react";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../shared/firebase";
import { useAppSelector } from "../../store/hooks";
const Sidebar: FC = () => {
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const signOutHandler = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && (
        <div className="z-10 tw-flex-center fixed top-0 left-0 w-full h-full">
          <div className="w-28 h-28 border-[10px] rounded-full border-primary border-t-transparent animate-spin "></div>
        </div>
      )}
      <div className="shrink-0 max-w-[260px] w-[90vw] mt-4 pl-8 sticky top-4">
        <Link to="/" className="flex items-center gap-3">
          <LazyLoadImage
            alt="Logo"
            src="/logo.png"
            effect="opacity"
            className="w-10 h-10"
          />
          <h1 className="text-xl text-white tracking-widest font-semibold uppercase">
            <span>Moon</span>
            <span className="text-primary">light</span>
          </h1>
        </Link>

        <div className="text-white text-lg font-medium mt-12">MENU</div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            to="/"
            className={`flex gap-6 items-center  ${
              location.pathname === "/" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <AiOutlineHome size={25} />
            <p>Home</p>
          </Link>

          <Link
            to="/explore"
            className={`flex gap-6 items-center  ${
              location.pathname === "/explore" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <MdOutlineExplore size={25} />
            <p>Explore</p>
          </Link>

          {/* <Link
            to="/shorts"
            className={`flex gap-5 items-center  ${
              location.pathname === "/shorts" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <TbBrandTiktok size={30} />
            <p>Shorts</p>
          </Link> */}

          <Link
            to="/search"
            className={`flex gap-6 items-center  ${
              location.pathname === "/search" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <BiSearch size={25} />
            <p>Search</p>
          </Link>
        </div>

        <div className="text-white text-lg font-medium mt-12">PERSONAL</div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            to="/bookmarked"
            className={`flex gap-6 items-center  ${
              location.pathname === "/bookmarked" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <BsBookmarkHeart size={25} />
            <p>Bookmarked</p>
          </Link>

          <Link
            to="/history"
            className={`flex gap-6 items-center  ${
              location.pathname === "/history" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
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
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <FiSettings size={25} />
            <p>Settings</p>
          </Link>

          {!currentUser && (
            <Link
              to={`/auth?redirect=${encodeURIComponent(location.pathname)}`}
              className="flex gap-5 items-center"
            >
              <HiOutlineLogin size={30} />
              <p>Login</p>
            </Link>
          )}

          {currentUser && (
            <button
              onClick={signOutHandler}
              className="flex gap-5 items-center"
            >
              <HiOutlineLogout size={30} />
              <p>Logout</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
