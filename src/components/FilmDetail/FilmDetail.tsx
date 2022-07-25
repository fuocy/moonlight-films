import { FC } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import {
  BsFillPlayFill,
  BsShareFill,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";
import { resizeImage } from "../../shared/utils";
import RightbarFilms from "../Common/RightbarFilms";
import SearchBox from "../Common/SearchBox";
import SidebarMini from "../Common/SidebarMini";
import Skeleton from "../Common/Skeleton";
import Title from "../Common/Title";
import FilmTabInfo from "./FilmTabInfo";

const FilmDetail: FC<FilmInfo> = ({ similar, videos, detail, ...others }) => {
  return (
    <>
      {detail && (
        <Title
          value={`${
            (detail as DetailMovie).title || (detail as DetailTV).name
          } | Moonlight`}
        />
      )}

      <div className="flex">
        <SidebarMini />

        <div className="flex-grow min-h-screen">
          {!detail && (
            <Skeleton className="h-[400px] rounded-bl-2xl "></Skeleton>
          )}
          {detail && (
            <div
              style={{
                backgroundImage: `url(${resizeImage(detail.backdrop_path)})`,
              }}
              className="bg-cover bg-center bg-no-repeat h-[400px] rounded-bl-2xl relative"
            >
              <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-bl-2xl">
                <div className="flex items-start gap-14 absolute left-1/2 -translate-x-1/2  w-full max-w-[1000px] bottom-[-20%]">
                  <div className="shrink-0 max-w-[185px] w-full ">
                    <LazyLoadImage
                      src={resizeImage(detail.poster_path, "w185")}
                      effect="opacity"
                      className="w-full h-full object-cover rounded-md"
                      alt="Poster"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="h-28 flex items-end">
                      <h1 className=" text-white text-[45px] font-bold leading-tight ">
                        {(detail as DetailMovie).title ||
                          (detail as DetailTV).name}
                      </h1>
                    </div>
                    <ul className="flex gap-3 flex-wrap mt-7">
                      {detail.genres.slice(0, 3).map((genre) => (
                        <li key={genre.id} className="mb-3">
                          <Link
                            to={`/explore?genre=${genre.id}`}
                            className="px-5 py-2 rounded-full uppercase font-medium border border-gray-300 text-white hover:brightness-75 transition duration-300"
                          >
                            {genre.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="watch"
                    className="flex gap-6 items-center pl-6 pr-12 py-3 rounded-full bg-primary text-white hover:bg-blue-600 transition duration-300 mt-24"
                  >
                    <BsFillPlayFill size={25} />
                    <span className="text-lg font-medium">WATCH</span>
                  </Link>
                </div>
                <div className="flex gap-3 absolute top-[5%] right-[3%]">
                  <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
                    <AiFillHeart
                      size={20}
                      className="text-white group-hover:text-primary transition duration-300"
                    />
                  </button>
                  <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
                    <BsShareFill
                      size={20}
                      className="text-white group-hover:text-primary transition duration-300"
                    />
                  </button>
                  <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
                    <BsThreeDots
                      size={20}
                      className="text-white group-hover:text-primary transition duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex z-20 relative">
            <div className="shrink-0 max-w-[150px] w-full flex items-center flex-col gap-20 mt-20 border-r border-dark-lighten">
              <div className="flex flex-col gap-6 items-center mt-16">
                <p className="text-white font-medium text-lg">RATING</p>
                <div className="w-16">
                  {detail && (
                    <CircularProgressbar
                      value={detail.vote_average}
                      maxValue={10}
                      text={`${detail.vote_average.toFixed(1)}`}
                      styles={buildStyles({
                        textSize: "25px",
                        pathColor: `rgba(81, 121, 255, ${
                          (detail.vote_average * 10) / 100
                        })`,
                        textColor: "#fff",
                        trailColor: "transparent",
                        backgroundColor: "#5179ff",
                      })}
                    />
                  )}
                  {!detail && <Skeleton className="w-16 h-16 rounded-full" />}
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center">
                {detail && (
                  <>
                    <p className="text-white font-medium text-lg">
                      {detail.media_type === "movie" ? "RUNTIME" : "EP LENGTH"}
                    </p>
                    <div className="flex gap-2 items-center">
                      {detail.media_type === "movie" && (
                        <p className="text-2xl">
                          {(detail as DetailMovie).runtime}
                        </p>
                      )}
                      {detail.media_type === "tv" && (
                        <p className="text-2xl">
                          {(detail as DetailTV).episode_run_time[0]}
                        </p>
                      )}
                      <span>min</span>
                    </div>
                  </>
                )}
                {!detail && (
                  <>
                    <p className="text-white font-medium text-lg">RUNTIME</p>
                    <Skeleton className="w-14 h-6" />
                  </>
                )}
              </div>
            </div>

            <div className="flex-grow min-h-[500px] border-r border-dark-lighten px-16 py-7">
              {/* {!detail && <Skeleton className="w-full h-[500px]" />} */}
              <FilmTabInfo detail={detail} {...others} />
            </div>

            <div className="shrink-0 max-w-[300px] w-full px-6 pt-6">
              <p className="text-white font-medium text-lg mb-5">MEDIA</p>
              <ul className="flex flex-col gap-[75px]">
                {videos &&
                  videos.slice(0, 2).map((video) => (
                    <li key={video.id} className="relative h-0 pb-[56.25%]">
                      <YouTube
                        videoId={video.key}
                        opts={{ height: "100%", width: "100%" }}
                      />
                      <p className="mt-3 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                        {video.name}
                      </p>
                    </li>
                  ))}
                {!videos &&
                  [...new Array(2)].map((_, index) => (
                    <li key={index}>
                      <div className="w-full h-0 pb-[56.25%] relative">
                        <Skeleton className="absolute w-full h-full" />
                      </div>
                      <Skeleton className="h-6 w-[70%] mt-3" />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="shrink-0 max-w-[310px] w-full relative px-6">
          <SearchBox />
          {/* <RecommendGenres /> */}
          <RightbarFilms
            name="Recommendations"
            films={similar}
            limitNumber={4}
            isLoading={!similar}
            className="mt-24"
          />
          {/* <>
            
            <p className="mt-24 mb-6 text-xl font-medium flex justify-between items-center">
              <span className="text-white">Recommendations</span>
              <BsThreeDotsVertical size={20} />
            </p>
            <ul className="flex flex-col gap-5">
              {!similar && (
                <>
                  {[...new Array(4)].map((_, index) => (
                    <li
                      key={index}
                      className="flex gap-5 items-center h-[156px]"
                    >
                      <Skeleton className="shrink-0 max-w-[100px] w-full h-full rounded-md" />
                      <Skeleton className="flex-grow h-[85%] rounded-md" />
                    </li>
                  ))}
                </>
              )}
              {similar &&
                similar.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <Link
                      to={
                        item.media_type === "movie"
                          ? `/movie/${item.id}`
                          : `/tv/${item.id}`
                      }
                      className="hover:brightness-75 transiton duration-300 flex gap-5 items-center"
                    >
                      <div className="shrink-0 max-w-[100px] w-full">
                        <LazyLoadImage
                          src={resizeImage(item.poster_path, "w154")}
                          className="w-full h-full object-cover rounded-md"
                          alt="poster"
                          effect="blur"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white mb-3 text-lg">
                          {item.title || item.name}
                        </p>
                        <p className="mb-8">
                          {item.release_date || item.first_air_date}
                        </p>
                        <div className="inline-flex gap-2 items-center px-3 py-[2px] rounded-full text-primary border border-primary text-sm">
                          <span>{item.vote_average.toFixed(1)}</span>
                          <AiFillStar size={15} />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
            <button className="bg-dark-lighten py-2 w-full rounded-full mt-7 hover:brightness-75 transition duration-300 mb-3">
              See more
            </button>
          </> */}
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
