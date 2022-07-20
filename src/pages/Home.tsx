import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDetailMovies, getHomeMovies } from "../services/home";
import { HomeMovies, Item } from "../shared/types";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Title from "../components/Title";
import BannerSlider from "../components/Slider/BannerSlider";
const Home: FC = () => {
  const [currentTab, setCurrentTab] = useState("movie");

  const { data, isLoading, isError, error } = useQuery<HomeMovies, Error>(
    ["home-movies"],
    getHomeMovies
  );

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    error: errorDetail,
  } = useQuery<any, Error>(
    ["detailMovies", data?.Trending],
    () => getDetailMovies(data?.Trending as Item[]),
    { enabled: !!data?.Trending }
  );

  if (isError) return <p>ERROR: ${error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  if (isErrorDetail) return <p>ERROR: ${errorDetail.message}</p>;

  if (isLoadingDetail) return <p>Loading...</p>;

  return (
    <>
      <Title value="Moonlight | Watching Website" />
      <div className="flex">
        <div className="shrink-0 max-w-[260px] w-[90vw]"></div>

        <div className="flex-grow pt-5 px-[28px] border-x border-gray-darken min-h-screen">
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
              <div className="w-6 h-6 rounded-full border border-gray tw-flex-center cursor-pointer">
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

          <BannerSlider films={data.Trending} dataDetail={dataDetail} />
        </div>

        <div className="shrink-0 max-w-[308px] w-full hidden md:block"></div>
      </div>
    </>
  );
};

export default Home;
