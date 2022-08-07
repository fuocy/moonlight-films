import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/Common/SearchBox";
import Sidebar from "../components/Common/Sidebar";
import Title from "../components/Common/Title";
import SearchResult from "../components/Search/SearchResult";

interface SearchProps {}
// https://raw.githubusercontent.com/fuocy/video/master/Studio%20Project%20%E2%80%94%20Kapwing.mp4
const Search: FunctionComponent<SearchProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSearchFilter, setOpenSearchFilter] = useState(true);
  const [parent] = useAutoAnimate();
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const [currentTab, setCurrentTab] = useState("multi");
  return (
    <>
      {!query && <Title value="Search | Moonlight" />}
      {query && <Title value={`Search: ${query} | Moonlight`} />}

      {/* <div className="bg-black/90 z-10 pb-5"> */}
      <div className="flex min-h-screen">
        {/* <SidebarMini /> */}
        <Sidebar />
        <div className="flex-grow">
          <div
            className={`relative z-30 max-w-[50vw] mx-auto translate-y-[100px] transition duration-300 text-xl ${
              query && "!translate-y-0"
            }`}
          >
            <h1
              className={`text-white text-3xl font-medium text-center absolute -top-8 left-0 right-0 ${
                query ? "opacity-0" : "opacity-100"
              } transition duration-500`}
            >
              Find your favourite movies, TV shows, people and more
            </h1>
            <SearchBox autoFocus />
          </div>
          {!query && (
            <div className="mt-[250px] flex justify-center">
              <LazyLoadImage
                src="/girl.png"
                alt=""
                effect="opacity"
                className="w-[700px] h-[400px] object-cover rounded-xl "
              />
            </div>
          )}
          {query && (
            <SearchResult
              currentTab={currentTab}
              query={query}
              page={Number(page)}
            />
          )}
        </div>
        <div className="shrink-0 max-w-[310px] w-full pt-32 px-3">
          <div
            // @ts-ignore
            ref={parent}
            className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
          >
            <div className="flex justify-between items-center text-white pb-3">
              <p className="text-lg ">Search Results</p>
              <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                {openSearchFilter && <FiChevronDown size={20} />}
                {!openSearchFilter && <FiChevronRight size={20} />}
              </button>
            </div>
            {openSearchFilter && (
              <div className="py-6 border-t border-dark-darken text-white text-lg flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSearchParams({ query: query || "", page: "1" });
                    setCurrentTab("multi");
                  }}
                  className={`w-full flex justify-between hover:bg-dark-lighten-2 px-3 py-1 rounded-md transition duration-300 ${
                    currentTab === "multi" && "bg-dark-lighten-2"
                  }`}
                >
                  <span>All</span>
                </button>
                <button
                  onClick={() => {
                    setSearchParams({ query: query || "", page: "1" });
                    setCurrentTab("movie");
                  }}
                  className={`w-full flex justify-between hover:bg-dark-lighten-2 px-3 py-1 rounded-md transition duration-300 ${
                    currentTab === "movie" && "bg-dark-lighten-2"
                  }`}
                >
                  <span>Movie</span>
                </button>
                <button
                  onClick={() => {
                    setSearchParams({ query: query || "", page: "1" });
                    setCurrentTab("tv");
                  }}
                  className={`w-full flex justify-between hover:bg-dark-lighten-2 px-3 py-1 rounded-md transition duration-300 ${
                    currentTab === "tv" && "bg-dark-lighten-2"
                  }`}
                >
                  <span>TV Show</span>
                </button>
                <button
                  onClick={() => {
                    setSearchParams({ query: query || "", page: "1" });
                    setCurrentTab("person");
                  }}
                  className={`w-full flex justify-between hover:bg-dark-lighten-2 px-3 py-1 rounded-md transition duration-300 ${
                    currentTab === "person" && "bg-dark-lighten-2"
                  }`}
                >
                  <span>People</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Search;
