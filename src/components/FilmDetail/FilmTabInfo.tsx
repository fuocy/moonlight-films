import { FC, useState } from "react";
import {
  Cast,
  DetailMovie,
  DetailTV,
  Image,
  Reviews,
} from "../../shared/types";
import ReadMore from "./ReadMore";

interface FilmTabInfoProps {
  detail: DetailMovie | DetailTV;
  credits: Cast[];
  images: Image;
  reviews: Reviews[];
}

const FilmTabInfo: FC<FilmTabInfoProps> = ({ detail }) => {
  const [currentTab, setCurrentTab] = useState("overall");
  return (
    <>
      <div className="flex gap-10 text-gray-400 text-lg ml-24">
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
            currentTab === "images" &&
            "font-medium -translate-y-2 border-b-2 border-primary text-white"
          }`}
          onClick={() => setCurrentTab("images")}
        >
          Images
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
        {detail.media_type === "tv" && <button>Seasons</button>}
      </div>
      <div className="mt-10 text-lg">
        {currentTab === "overall" && (
          <>
            <p className="text-xl italic mb-8 text-white text-center">
              {detail.tagline}
            </p>
            <p className="text-white font-medium  mb-3">STORY</p>
            <ReadMore>{detail.overview}</ReadMore>
            <p className="text-white font-medium mt-8 mb-3">DETAILS</p>
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
            </p>
          </>
        )}
      </div>
    </>
  );
};
export default FilmTabInfo;
