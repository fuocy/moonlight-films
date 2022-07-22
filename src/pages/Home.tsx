import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getDetailMovies,
  getDetailTvs,
  getHomeMovies,
  getHomeTVs,
} from "../services/home";
import { HomeFilms, Item } from "../shared/types";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Title from "../components/Title";
import BannerSlider from "../components/Slider/BannerSlider";
import SectionSlider from "../components/Slider/SectionSlider";
import Sidebar from "../components/Sidebar";
import SearchBox from "../components/Search/SearchBox";
import RecommendGenres from "../components/Search/RecommendGenres";
import TrendingNow from "../components/Search/TrendingNow";
import MainHomeFilms from "../components/MainHomeFilm";
const Home: FC = () => {
  const [currentTab, setCurrentTab] = useState("movie");

  const {
    data: dataMovie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    error: errorMovie,
  } = useQuery<HomeFilms, Error>(["home-movies"], getHomeMovies);

  const {
    data: dataMovieDetail,
    isLoading: isLoadingMovieDetail,
    isError: isErrorMovieDetail,
    error: errorMovieDetail,
  } = useQuery<any, Error>(
    ["detailMovies", dataMovie?.Trending],
    () => getDetailMovies(dataMovie?.Trending as Item[]),
    { enabled: !!dataMovie?.Trending }
  );

  const {
    data: dataTV,
    isLoading: isLoadingTV,
    isError: isErrorTV,
    error: errorTV,
  } = useQuery<HomeFilms, Error>(["home-tvs"], getHomeTVs);

  const {
    data: dataTVDetail,
    isLoading: isLoadingTVDetail,
    isError: isErrorTVDetail,
    error: errorTVDetail,
  } = useQuery<any, Error>(
    ["detailTvs", dataTV?.Trending],
    () => getDetailTvs(dataTV?.Trending as Item[]),
    { enabled: !!dataTV?.Trending }
  );

  // MOVIE
  if (isErrorMovie) return <p>ERROR: ${errorMovie.message}</p>;

  if (isLoadingMovie) return <p>Loading...</p>;

  if (isErrorMovieDetail) return <p>ERROR: ${errorMovieDetail.message}</p>;

  if (isLoadingMovieDetail) return <p>Loading...</p>;

  // TV

  if (isErrorTV) return <p>ERROR: ${errorTV.message}</p>;

  if (isLoadingTV) return <p>Loading...</p>;

  if (isErrorTVDetail) return <p>ERROR: ${errorTVDetail.message}</p>;

  if (isLoadingTVDetail) return <p>Loading...</p>;

  return (
    <>
      <Title value="Moonlight | Watching Website" />
      <div className="flex items-start">
        <Sidebar />

        <div className="flex-grow py-7 border-x px-[2vw] border-gray-darken min-h-screen">
          <div className="flex justify-between items-end">
            <div className="inline-flex gap-[40px] pb-[14px] border-b border-gray-darken relative">
              <button
                onClick={() => setCurrentTab("movie")}
                className={`${
                  currentTab === "movie" &&
                  "text-white font-medium after:absolute after:bottom-0 after:left-[6%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300`}
              >
                Movie
              </button>
              <button
                onClick={() => setCurrentTab("tv")}
                className={`${
                  currentTab === "tv" &&
                  "text-white font-medium after:absolute after:bottom-0 after:right-[13%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300`}
              >
                TV Show
              </button>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-6 h-6 rounded-full border border-gray-lighten tw-flex-center cursor-pointer">
                <IoMdNotificationsOutline size={17} />
              </div>
              <LazyLoadImage
                src="/avatarTest.jpg"
                alt="User avatar"
                className="w-7 h-7 rounded-full object-cover"
                effect="blur"
              />
            </div>
          </div>

          {currentTab === "movie" && (
            <MainHomeFilms data={dataMovie} dataDetail={dataMovieDetail} />
          )}
          {currentTab === "tv" && (
            <MainHomeFilms data={dataTV} dataDetail={dataTVDetail} />
          )}
        </div>

        <div className="shrink-0 max-w-[310px] w-full hidden md:block px-6 top-0 sticky ">
          <SearchBox />
          <RecommendGenres />
          <TrendingNow />
        </div>
      </div>
    </>
  );
};

export default Home;
