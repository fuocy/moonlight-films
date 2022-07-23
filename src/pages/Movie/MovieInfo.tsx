import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { getMovieDetail } from "../../services/movie";
import { FilmInfo } from "../../shared/types";

const MovieInfo: FC = () => {
  const { id } = useParams();

  const { isLoading, data, isError, error } = useQuery<FilmInfo, Error>(
    ["movieDetail", id],
    () => getMovieDetail(Number(id as string))
  );

  if (isError) return <div>ERROR: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return <FilmDetail {...data} />;
};

export default MovieInfo;
