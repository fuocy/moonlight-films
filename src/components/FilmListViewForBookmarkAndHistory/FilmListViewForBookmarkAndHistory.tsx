import { useAutoAnimate } from "@formkit/auto-animate/react";
import { doc, updateDoc } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { db } from "../../shared/firebase";
import { Item } from "../../shared/types";
import { useAppSelector } from "../../store/hooks";
import BookmarkResult from "../Bookmark/BookmarkResult";
import Sidebar from "../Common/Sidebar";
import Skeleton from "../Common/Skeleton";

interface FilmListViewForBookmarkAndHistoryProps {
  films: Item[];
  isLoading: boolean;
  pageType: string;
}

const FilmListViewForBookmarkAndHistory: FunctionComponent<
  FilmListViewForBookmarkAndHistoryProps
> = ({ films, isLoading, pageType }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [isShowPrompt, setIsShowPrompt] = useState(false);

  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("bookmarkCurrentTab") || "all"
  );

  const [parent] = useAutoAnimate();
  const [action] = useAutoAnimate();
  const [show] = useAutoAnimate();

  const selectAllHandler = () => {
    if (isSelectAll) {
      setSelections([]);
      setIsSelectAll(false);
      return;
    }

    setIsSelectAll(true);

    if (currentTab === "all") {
      setSelections(films.map((film) => film.id));
    } else if (currentTab === "tv") {
      setSelections(
        films.filter((film) => film.media_type === "tv").map((film) => film.id)
      );
    } else if (currentTab === "movie") {
      setSelections(
        films
          .filter((film) => film.media_type === "movie")
          .map((film) => film.id)
      );
    }
  };

  const clearSelection = () => {
    if (!currentUser) return;

    const editedFilms = films.filter(
      (film) => selections.indexOf(film.id) === -1
    );

    updateDoc(doc(db, "users", currentUser?.uid), {
      ...(pageType === "bookmark" && { bookmarks: editedFilms.reverse() }),
      ...(pageType === "history" && { recentlyWatch: editedFilms.reverse() }),
    });

    setSelections([]);
    setIsSelectAll(false);
    setIsShowPrompt(false);
  };

  return (
    <>
      <div
        // @ts-ignore
        ref={show}
      >
        {isShowPrompt && (
          <>
            <div className="fixed top-[30%] md:left-[40%] left-[5%] right-[5%] md:w-[400px] z-40 bg-dark-lighten rounded-md min-h-[100px] shadow-md px-3 py-5">
              <div className="mx-auto mb-7 h-16 w-16 rounded-full border-[3px] border-red-500 tw-flex-center">
                <AiOutlineDelete size={40} className="text-red-500 " />
              </div>
              <p className="text-white text-xl text-center font-medium mb-4">
                You are about to remove
                {selections.length === 1 ? " this film." : " these films."}
              </p>
              <p className="text-center mb-[2px]">
                This will remove your films from this {pageType} list.
              </p>
              <p className="text-center ">Are you sure?</p>
              <div className="flex mt-8 justify-end">
                <button
                  onClick={() => setIsShowPrompt(false)}
                  className="px-6 py-1 rounded-md text-white hover:brightness-75 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={clearSelection}
                  className="px-6 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-300"
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              onClick={() => setIsShowPrompt(false)}
              className="fixed top-0 left-0 w-full h-full z-30 bg-black/60"
            ></div>
          </>
        )}
      </div>

      <div className="flex md:hidden justify-between items-center px-5 my-5">
        <Link to="/" className="flex gap-2 items-center">
          <LazyLoadImage
            src="/logo.png"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-xl text-white font-medium tracking-wider uppercase">
            Moon<span className="text-primary">light</span>
          </p>
        </Link>
        <button onClick={() => setIsSidebarActive((prev) => !prev)}>
          <GiHamburgerMenu size={25} />
        </button>
      </div>

      <div className="md:flex hidden gap-6 items-center absolute top-4 right-5">
        {/* <div className="w-6 h-6 rounded-full border border-gray-lighten tw-flex-center cursor-pointer">
                <IoMdNotificationsOutline size={17} />
              </div> */}
        <p>{currentUser?.displayName || "Anonymous"}</p>

        <LazyLoadImage
          src={
            currentUser
              ? (currentUser.photoURL as string)
              : "/defaultAvatar.jpg"
          }
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
          effect="opacity"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex">
        {/* <SidebarMini /> */}
        <Sidebar
          setIsSidebarActive={setIsSidebarActive}
          isSidebarActive={isSidebarActive}
        />
        <div className="flex-grow px-[2vw] pb-16 pt-7 min-h-screen">
          <h1 className="uppercase text-white font-semibold text-[35px] mb-4 ">
            {pageType === "bookmark" ? "My favourite films" : "Films I Watched"}
          </h1>

          <div
            // @ts-ignore
            ref={action}
            className="flex flex-col md:flex-row items-start md:items-end gap-5 md:justify-between m mb-8"
          >
            <div className="inline-flex gap-[30px] pb-[14px] border-b border-gray-darken relative">
              <button
                onClick={() => {
                  setCurrentTab("all");
                  localStorage.setItem("bookmarkCurrentTab", "all");
                }}
                className={`${
                  currentTab === "all" &&
                  "text-white font-medium after:absolute after:bottom-0 after:left-[0%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300 hover:text-white`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setCurrentTab("tv");
                  localStorage.setItem("bookmarkCurrentTab", "tv");
                }}
                className={`${
                  currentTab === "tv" &&
                  "text-white font-medium after:absolute after:bottom-0 after:left-[38%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300 hover:text-white`}
              >
                TV Show
              </button>
              <button
                onClick={() => {
                  setCurrentTab("movie");
                  localStorage.setItem("bookmarkCurrentTab", "movie");
                }}
                className={`${
                  currentTab === "movie" &&
                  "text-white font-medium after:absolute after:bottom-0 after:right-[5%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300 hover:text-white`}
              >
                Movie
              </button>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="self-end text-lg hover:text-primary transition duration-300 flex gap-2 items-center"
              >
                <AiOutlineEdit size={25} />
                <p>Edit</p>
              </button>
            )}

            {isEditing && (
              <div className="flex gap-5 self-end">
                <button
                  onClick={selectAllHandler}
                  className={`text-lg hover:text-primary transition duration-300 flex gap-2 items-center ${
                    isSelectAll ? "text-primary" : "!text-gray-lighten"
                  }`}
                >
                  <BiSelectMultiple size={25} />
                  <p>Select all</p>
                </button>
                <button
                  onClick={() => setIsShowPrompt(true)}
                  disabled={selections.length === 0}
                  className="disabled:text-gray-700 text-lg hover:text-red-500 transition duration-300 flex gap-2 items-center"
                >
                  <AiOutlineDelete size={25} />
                  <p>Clear</p>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className=" text-lg hover:text-green-700 transition duration-300 flex gap-2 items-center"
                >
                  <MdOutlineCancel size={25} />
                  <p>Cancel</p>
                </button>
              </div>
            )}
          </div>

          <ul
            // @ts-ignore
            ref={parent}
            className={`grid grid-cols-sm md:grid-cols-lg gap-x-8 gap-y-10 ${
              isEditing && "!gap-y-16"
            }`}
          >
            {isLoading &&
              [...new Array(6)].map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-0 pb-[160%]" />
                </li>
              ))}
            {currentTab === "all" && (
              <BookmarkResult
                films={films}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                isLoading={isLoading}
                pageType={pageType}
              />
            )}
            {currentTab === "tv" && (
              <BookmarkResult
                films={films.filter((film) => film.media_type === "tv")}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                isLoading={isLoading}
                pageType={pageType}
              />
            )}
            {currentTab === "movie" && (
              <BookmarkResult
                films={films.filter((film) => film.media_type === "movie")}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                isLoading={isLoading}
                pageType={pageType}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilmListViewForBookmarkAndHistory;
