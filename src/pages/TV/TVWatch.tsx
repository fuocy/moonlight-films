import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch";
import { useQueryParams } from "../../hooks/useQueryParams";
import { getWatchTV } from "../../services/tv";
import { DetailSeason, getWatchReturnedType } from "../../shared/types";

const TVWatch: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<getWatchReturnedType, Error>(
    ["watchTV", id],
    () => getWatchTV(Number(id as string))
  );

  const queryParams = useQueryParams();

  const seasonId = Number(queryParams.get("season")) || 1;
  const episodeId = Number(queryParams.get("episode")) || 1;

  if (error) return <div>ERROR: {error.message}</div>;

  if (!data) return <div>Loading...</div>;

  const currentSeason = (data.detailSeasons as DetailSeason[]).find(
    (season) => season.season_number === seasonId
  );

  const currentEpisode = currentSeason?.episodes.find(
    (episode) => episode.episode_number === episodeId
  );

  if (!currentSeason) return <div>ERROR: 404</div>;
  if (!currentEpisode) return <div>ERROR: 404</div>;

  return (
    <FilmWatch
      {...data}
      media_type="tv"
      seasonId={seasonId}
      episodeId={episodeId}
      currentEpisode={currentEpisode}
      currentSeason={currentSeason}
    />
  );
};

export default TVWatch;
