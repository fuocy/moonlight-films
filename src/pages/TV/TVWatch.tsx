import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch";
import { getWatchTV } from "../../services/tv";
import { getWatchReturnedType } from "../../shared/types";
import Error from "../Error";

const TVWatch: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<getWatchReturnedType, Error>(
    ["watchTV", id],
    () => getWatchTV(Number(id as string))
  );

  const [queryParams] = useSearchParams();

  const seasonId = Number(queryParams.get("season")) || 1;
  const episodeId = Number(queryParams.get("episode")) || 1;

  // if (error) return <div>ERROR: {error.message}</div>;
  if (error) return <Error />;

  // if (!data) return <div>Loading...</div>;

  const currentSeason = data?.detailSeasons?.find(
    (season) => season.season_number === seasonId
  );

  const currentEpisode = currentSeason?.episodes.find(
    (episode) => episode.episode_number === episodeId
  );

  // I check data is truthy because I want to show 404 only when invalid episode or season are accessed, NOT when data is fetching
  // if (!currentEpisode && data) return <div>ERROR: 404</div>;
  if (!currentEpisode && data) return <Error />;

  return (
    <FilmWatch
      {...data}
      media_type="tv"
      seasonId={seasonId}
      episodeId={episodeId}
      currentEpisode={currentEpisode}
    />
  );
};

export default TVWatch;
