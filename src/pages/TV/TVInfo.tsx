import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { getTVDetail } from "../../services/tv";
import { FilmInfo } from "../../shared/types";

const TVInfo: FC = () => {
  const { id } = useParams();

  const { data, isError, error } = useQuery<FilmInfo, Error>(
    ["tvDetail", id],
    () => getTVDetail(Number(id as string))
  );

  if (isError) return <div>ERROR: {error.message}</div>;
  // if (isLoading) return <div>Loading...</div>;

  return <FilmDetail {...data} />;
};

export default TVInfo;
