import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch";
import { getWatchMovie } from "../../services/movie";
import { getWatchReturnedType } from "../../shared/types";

const MovieWatch: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<getWatchReturnedType, Error>(
    ["watchMovie", id],
    () => getWatchMovie(Number(id as string))
  );

  if (error) return <div>ERROR: {error.message}</div>;

  // if (!data) return <div>Loading...</div>;

  return <FilmWatch {...data} media_type="movie" />;
};

export default MovieWatch;
