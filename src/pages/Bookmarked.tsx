import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BookmarkResult from "../components/Bookmark/BookmarkResult";
import SidebarMini from "../components/Common/SidebarMini";
import Skeleton from "../components/Common/Skeleton";
import Title from "../components/Common/Title";
import { db } from "../shared/firebase";
import { Item } from "../shared/types";
import { useAppSelector } from "../store/hooks";

interface BookmarkedProps {}

const Bookmarked: FunctionComponent<BookmarkedProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [bookmarkedFilms, setBookmarkedFilms] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selections, setSelections] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!Boolean(bookmarkedFilms.length));
  const [isError, setIsError] = useState(false);
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("bookmarkCurrentTab") || "all"
  );

  useEffect(() => {
    if (!currentUser) return;

    const unsubDoc = onSnapshot(
      doc(db, "users", currentUser?.uid),
      (doc) => {
        setBookmarkedFilms(doc.data()?.bookmarks.slice().reverse());
        setIsLoading(false);
      },
      (error) => {
        alert(error);
        setBookmarkedFilms([]);
        setIsLoading(false);
        setIsError(true);
      }
    );

    return () => unsubDoc();
  }, [currentUser]);

  const selectAllHandler = () => {
    if (isSelectAll) {
      setSelections([]);
      setIsSelectAll(false);
      return;
    }

    setIsSelectAll(true);
    if (currentTab === "all") {
      setSelections(bookmarkedFilms.map((film) => film.id));
    } else if (currentTab === "tv") {
      setSelections(
        bookmarkedFilms
          .filter((film) => film.media_type === "tv")
          .map((film) => film.id)
      );
    } else if (currentTab === "movie") {
      setSelections(
        bookmarkedFilms
          .filter((film) => film.media_type === "movie")
          .map((film) => film.id)
      );
    }
  };

  const clearSelection = () => {
    if (!currentUser) return;

    const editedBookmarks = bookmarkedFilms.filter(
      (film) => selections.indexOf(film.id) === -1
    );

    updateDoc(doc(db, "users", currentUser?.uid), {
      bookmarks: editedBookmarks,
    });

    setSelections([]);
    setIsSelectAll(false);
  };

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <Title value="Bookmark | Moonlight" />

      <div className="flex gap-6 items-center absolute top-4 right-5">
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
        <SidebarMini />
        <div className="flex-grow px-[2vw] pb-16">
          <h1 className="uppercase text-white font-semibold text-[35px] mb-4 mt-5">
            My favourite films
          </h1>

          <div className="flex justify-between items-end mb-8">
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
                className=" text-lg hover:text-primary transition duration-300 flex gap-2 items-center"
              >
                <AiOutlineEdit size={25} />
                <p>Edit</p>
              </button>
            )}
            {isEditing && (
              <div className="flex gap-5">
                <button
                  onClick={selectAllHandler}
                  className={`text-lg hover:text-primary transition duration-300 flex gap-2 items-center ${
                    isSelectAll && "text-primary"
                  }`}
                >
                  <BiSelectMultiple size={25} />
                  <p>Select all</p>
                </button>
                <button
                  onClick={() => clearSelection()}
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
            className={`grid grid-cols-sm md:grid-cols-lg gap-x-8 gap-y-10 ${
              isEditing && "!gap-y-16"
            }`}
          >
            {isLoading &&
              [...new Array(7)].map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-0 pb-[160%]" />
                </li>
              ))}
            {currentTab === "all" && (
              <BookmarkResult
                films={bookmarkedFilms}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                isLoading={isLoading}
              />
            )}
            {currentTab === "tv" && (
              <BookmarkResult
                films={bookmarkedFilms.filter(
                  (film) => film.media_type === "tv"
                )}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                isLoading={isLoading}
              />
            )}
            {currentTab === "movie" && (
              <BookmarkResult
                films={bookmarkedFilms.filter(
                  (film) => film.media_type === "movie"
                )}
                isEditing={isEditing}
                selections={selections}
                setSelections={setSelections}
                isLoading={isLoading}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Bookmarked;
