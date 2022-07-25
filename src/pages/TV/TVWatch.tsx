import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch";
import { getWatchTV } from "../../services/tv";
import { getWatchReturnedType } from "../../shared/types";

const TVWatch: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<getWatchReturnedType, Error>(
    ["watchTV", id],
    () => getWatchTV(Number(id as string))
  );

  if (error) return <div>ERROR: {error.message}</div>;

  if (!data) return <div>Loading...</div>;

  return <FilmWatch {...data} media_type="tv" />;
};

export default TVWatch;
