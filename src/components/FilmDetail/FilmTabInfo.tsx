import { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Cast, DetailMovie, DetailTV, Reviews } from "../../shared/types";
import { resizeImage } from "../../shared/utils";
import Skeleton from "../Common/Skeleton";
import ReadMore from "../Common/ReadMore";
import ReviewTab from "./ReviewTab";
interface FilmTabInfoProps {
  detail?: DetailMovie | DetailTV | undefined;
  credits?: Cast[] | undefined;
  reviews?: Reviews[] | undefined;
}

const FilmTabInfo: FC<FilmTabInfoProps> = ({ detail, credits, reviews }) => {
  const [currentTab, setCurrentTab] = useState("overall");

  return (
    <>
      <div className="flex gap-10 text-gray-400 text-lg justify-center">
        <button
          className={`hover:text-white transition duration-300 pb-1  ${
            currentTab === "overall" &&
            "font-medium -translate-y-2 border-b-2 border-primary text-white"
          }`}
          onClick={() => setCurrentTab("overall")}
        >
          Overall
        </button>
        <button
          className={`hover:text-white transition duration-300 pb-1 ${
            currentTab === "cast" &&
            "font-medium -translate-y-2 border-b-2 border-primary text-white"
          }`}
          onClick={() => setCurrentTab("cast")}
        >
          Cast
        </button>
        <button
          className={`hover:text-white transition duration-300 pb-1 ${
            currentTab === "reviews" &&
            "font-medium -translate-y-2 border-b-2 border-primary text-white"
          }`}
          onClick={() => setCurrentTab("reviews")}
        >
          Reviews
        </button>
        {detail && detail.media_type === "tv" && (
          <button
            className={`hover:text-white transition duration-300 pb-1 ${
              currentTab === "seasons" &&
              "font-medium -translate-y-2 border-b-2 border-primary text-white"
            }`}
            onClick={() => setCurrentTab("seasons")}
          >
            Seasons
          </button>
        )}
      </div>
      <div className="mt-10 text-lg">
        {currentTab === "overall" && (
          <>
            {detail && (
              <p className="text-xl italic mb-8 text-white text-center">
                {detail.tagline}
              </p>
            )}
            {!detail && <Skeleton className="h-6 w-[350px] mx-auto mb-8" />}
            <p className="text-white font-medium  mb-3">STORY</p>
            {detail && (
              <ReadMore limitTextLength={250}>{detail.overview}</ReadMore>
            )}
            {!detail && (
              <>
                {/* {[...new Array(4)].map((_, index) => (
                  <div key={index}>
                    <Skeleton className="w-full h-4 mb-1" />
                  </div>
                ))} */}
                <Skeleton className="h-20" />
              </>
            )}
            <p className="text-white font-medium mt-8 mb-3">DETAILS</p>
            {!detail && (
              <>
                {/* {[...new Array(3)].map((_, index) => (
                  <div key={index}>
                    <Skeleton className="w-[40%] h-4 mb-1" />
                  </div>
                ))} */}
                <Skeleton className="h-16 w-[40%]" />
              </>
            )}
            {detail && (
              <>
                <p>Status: {detail.status}</p>
                {detail.media_type === "movie" && (
                  <p>Release date: {(detail as DetailMovie).release_date}</p>
                )}
                {detail.media_type === "tv" && (
                  <p>Last air date: {(detail as DetailTV).last_air_date}</p>
                )}
                <p>
                  Spoken language:
                  {detail.spoken_languages.map(
                    (language, index) =>
                      `${index ? ", " : ""} ${language.english_name}`
                  )}
                </p>{" "}
              </>
            )}
          </>
        )}
        {currentTab === "cast" && (
          <ul className="grid grid-cols-2 gap-x-20 gap-y-8">
            {credits &&
              credits.map((cast) => (
                <li key={cast.id} className="flex gap-3 items-center">
                  <div className="shrink-0 max-w-[65px] w-full h-[65px]">
                    <LazyLoadImage
                      src={resizeImage(cast.profile_path, "w185")}
                      alt=""
                      effect="opacity"
                      className="object-cover rounded-full h-[65px] w-[65px]"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-primary text-lg font-medium">
                      {cast.name}
                    </p>
                    <p className="text-white text-base">
                      <span className="italic">as</span> {cast.character}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
        {currentTab === "reviews" && reviews && <ReviewTab reviews={reviews} />}
        {currentTab === "seasons" && (
          <>
            <div className="flex justify-between mb-8">
              <p>Total seasons: {(detail as DetailTV).number_of_seasons}</p>
              <p>Total episodes: {(detail as DetailTV).number_of_episodes}</p>
            </div>

            <ul className="max-h-[400px] overflow-auto flex flex-col gap-10">
              {(detail as DetailTV).seasons.map((season) => (
                <li key={season.id}>
                  <div className="flex gap-3 items-center">
                    <div className="shrink-0 max-w-[120px] w-full">
                      <LazyLoadImage
                        src={resizeImage(season.poster_path, "w92")}
                        alt=""
                        effect="opacity"
                        className="object-cover w-[120px] h-full rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="mb-3 flex justify-between">
                        <p className="text-white font-medium">{season.name}</p>
                        <p>{season.episode_count} episodes</p>
                      </div>
                      <ReadMore
                        limitTextLength={130}
                        className="mb-2 inline-block"
                      >
                        {season.overview}
                      </ReadMore>
                      <p className="text-base">{season.air_date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
export default FilmTabInfo;
