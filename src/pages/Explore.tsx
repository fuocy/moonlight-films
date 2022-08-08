import { FunctionComponent, useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useSearchParams } from "react-router-dom";
import SearchBox from "../components/Common/SearchBox";
import Sidebar from "../components/Common/Sidebar";
import SidebarMini from "../components/Common/SidebarMini";
import Title from "../components/Common/Title";
import ExploreFilter from "../components/Explore/ExploreFilter";
import ExploreResult from "../components/Explore/ExploreResult";
import { useCurrentViewportView } from "../hooks/useCurrentViewportView";
import { ConfigType } from "../shared/types";
interface ExploreProps {}

const Explore: FunctionComponent<ExploreProps> = () => {
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("currentTab") || "tv"
  );
  const { isMobile } = useCurrentViewportView();

  const [isShowScrollUpBtn, setIsShowScrollUpBtn] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    const checkIfShowScrollUpBtn = () => {
      const scrollOffset = document.documentElement.scrollTop;
      if (scrollOffset > 1000) {
        setIsShowScrollUpBtn(true);
      } else {
        setIsShowScrollUpBtn(false);
      }
    };

    window.addEventListener("scroll", checkIfShowScrollUpBtn);

    return () => window.removeEventListener("scroll", checkIfShowScrollUpBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  // const initialConfig = {} as { [key: string]: string };

  // queryParams.forEach((value, key) => (initialConfig[key] = value));

  const [config, setConfig] = useState<ConfigType>({});

  useEffect(() => {
    // const changeConfig = (key: string, value: string) => {
    //   const clone = JSON.parse(JSON.stringify(config));
    //   clone[key] = value;
    //   setConfig(clone);
    // };

    // setConfig((prevConfig) => ({
    //   ...prevConfig,
    //   sort_by: sortType,
    //   with_genres: genreType.toString(),
    // }));

    const changeConfig = (key: string, value: string | number) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [key]: value,
      }));
    };

    const sortType = searchParams.get("sort_by") || "popularity.desc";
    changeConfig("sort_by", sortType);

    const genreType = searchParams.getAll("genre") || [];
    changeConfig("with_genres", genreType.toString());

    const minRuntime = Number(searchParams.get("minRuntime")) || 0;
    const maxRuntime = Number(searchParams.get("maxRuntime")) || 200;
    changeConfig("with_runtime.gte", minRuntime);
    changeConfig("with_runtime.lte", maxRuntime);

    const releaseFrom = searchParams.get("from") || "2002-11-04";
    const releaseTo = searchParams.get("to") || "2022-07-28";
    changeConfig("primary_release_date.gte", releaseFrom);
    changeConfig("primary_release_date.lte", releaseTo);
    changeConfig("air_date.gte", releaseFrom);
    changeConfig("air_date.lte", releaseTo);

    // eslint-disable-next-line
  }, [location.search]);
  return (
    <>
      <Title value={"Explore | Moonlight"} />
      {isShowScrollUpBtn && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-[30px] right-[30px] z-10 transition duration-500 ${
            isShowScrollUpBtn ? "opacity-100" : "opacity-0"
          }`}
        >
          <BsFillArrowUpCircleFill
            size={35}
            className="text-primary hover:brightness-75 transition duration-300"
          />
        </button>
      )}

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

      <div className="flex flex-col-reverse md:flex-row">
        {!isMobile && <SidebarMini />}
        {isMobile && (
          <Sidebar
            setIsSidebarActive={setIsSidebarActive}
            isSidebarActive={isSidebarActive}
          />
        )}

        <div className="flex-grow px-[2vw] pt-6">
          {!isMobile && (
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-3xl font-medium uppercase ">
                Find films that best fit you
              </h2>
              <div className="relative max-w-[350px] w-full -mt-24 -mr-7">
                <SearchBox />
              </div>
            </div>
          )}

          <div className="inline-flex gap-[40px] pb-[14px] border-b border-gray-darken relative mb-6">
            <button
              onClick={() => {
                setCurrentTab("tv");
                localStorage.setItem("currentTab", "tv");
                setSearchParams({});
              }}
              className={`${
                currentTab === "tv" &&
                "text-white font-medium after:absolute after:bottom-0 after:left-[13%] after:bg-white after:h-[3px] after:w-5"
              } transition duration-300 hover:text-white`}
            >
              TV Show
            </button>
            <button
              onClick={() => {
                setCurrentTab("movie");
                localStorage.setItem("currentTab", "movie");
                setSearchParams({});
              }}
              className={`${
                currentTab === "movie" &&
                "text-white font-medium after:absolute after:bottom-0 after:right-[9%] after:bg-white after:h-[3px] after:w-5"
              } transition duration-300 hover:text-white`}
            >
              Movie
            </button>
          </div>

          <ExploreResult currentTab={currentTab} config={config} />
        </div>

        <div className="shrink-0 md:max-w-[310px] w-full md:py-12 pt-4 px-3">
          <ExploreFilter currentTab={currentTab} />
        </div>

        {isMobile && (
          <h2 className="text-white text-3xl font-medium uppercase ml-3 mt-3">
            Find films that best fit you
          </h2>
        )}
      </div>
    </>
  );
};

export default Explore;

// const [config, setConfig] = useState<{ [key: string]: string }>(
//   JSON.parse(localStorage.getItem("config") || "{}")
// );

// const changeConfig = (key: string, value: string) => {
//   const clone = JSON.parse(JSON.stringify(config));
//   clone[key] = value;
//   setConfig(clone);
// };

// useEffect(() => {
//   localStorage.setItem("config", JSON.stringify(config));
// }, [config]);
