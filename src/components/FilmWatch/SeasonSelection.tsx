import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { DetailSeason } from "../../shared/types";
import { resizeImage } from "../../shared/utils";
import Skeleton from "../Common/Skeleton";
interface SeasonSelectionProps {
  detailSeasons?: DetailSeason[];
  seasonId?: number;
  episodeId?: number;
}

interface SeasonProps {
  season: DetailSeason;
  seasonId?: number;
  episodeId?: number;
}

const Season: FunctionComponent<SeasonProps> = ({
  season,
  seasonId,
  episodeId,
}) => {
  const [seasonExpanded, setSeasonExpanded] = useState<number | undefined>(
    seasonId
  );
  const [list] = useAutoAnimate();
  return (
    <li
      // @ts-ignore
      ref={list}
      // key={season.id}:  key is now set for custom component named Season
    >
      <button
        onClick={() =>
          setSeasonExpanded(
            seasonExpanded !== season.season_number
              ? season.season_number
              : undefined
          )
        }
        className="inline-flex items-center w-full gap-7 hover:bg-dark-lighten transiton duration-300 rounded-md px-2 pt-2 pb-1"
      >
        <div className="shrink-0 max-w-[100px] w-full">
          <LazyLoadImage
            src={resizeImage(season.poster_path, "w154")}
            effect="opacity"
            alt=""
            className="object-cover rounded-md w-[100px] h-[100px] "
          />
        </div>
        <div className="flex-grow text-left">
          <p
            className={`text-white text-lg mb-2 transition duration-300 ${
              season.season_number === seasonId && "!text-primary"
            }`}
          >
            {season.name}
          </p>
          <p
            className={` transition duration-300 ${
              season.season_number === seasonId && "text-white"
            }`}
          >
            Episode: {season.episodes.length}
          </p>
        </div>
      </button>

      {seasonExpanded === season.season_number && (
        <ul className="flex flex-col gap-4 pl-6 mt-2">
          {season.episodes.map((episode) => (
            <li key={episode.id}>
              <Link
                to={{
                  pathname: "",
                  search: `?season=${season.season_number}&episode=${episode.episode_number}`,
                }}
                className="flex items-center gap-3 hover:bg-dark-lighten transiton duration-300 rounded-md pl-2"
              >
                <div className="shrink-0 max-w-[15px] w-full">
                  <p
                    className={`text-white font-medium transition duration-300 ${
                      episode.episode_number === episodeId &&
                      season.season_number === seasonId &&
                      "!text-primary"
                    }`}
                  >
                    {episode.episode_number}
                  </p>
                </div>
                <div className="shrink-0 max-w-[120px] w-full pt-2">
                  <LazyLoadImage
                    src={resizeImage(episode.still_path, "w185")}
                    alt=""
                    effect="opacity"
                    className="object-cover w-[120px] rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <p
                    className={`transition duration-300 text-sm ${
                      episode.episode_number === episodeId &&
                      season.season_number === seasonId &&
                      "text-white"
                    }`}
                  >
                    {episode.name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const SeasonSelection: FunctionComponent<SeasonSelectionProps> = ({
  detailSeasons,
  seasonId,
  episodeId,
}) => {
  const [parent] = useAutoAnimate();

  return (
    <ul
      // @ts-ignore
      ref={parent}
      className="flex flex-col gap-4 max-h-[750px] overflow-y-auto"
    >
      {detailSeasons &&
        (detailSeasons as DetailSeason[]).map((season) => (
          <Season
            key={season.id}
            season={season}
            seasonId={seasonId}
            episodeId={episodeId}
          />
        ))}
      {!detailSeasons && (
        <div>
          <Skeleton className="h-[118px] mb-6" />

          <ul className="flex flex-col gap-4 pl-10">
            {new Array(6).fill("").map((_, index) => (
              <li key={index}>
                <Skeleton className="h-[81px]" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </ul>
  );
};

export default SeasonSelection;
