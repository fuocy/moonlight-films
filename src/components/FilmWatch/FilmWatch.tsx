import { FunctionComponent } from "react";
import { getWatchReturnedType } from "../../shared/types";

interface FilmWatchProps {
  media_type: "movie" | "tv";
}

const FilmWatch: FunctionComponent<FilmWatchProps & getWatchReturnedType> = ({
  detail,
  recommendations,
  detailSeasons,
}) => {
  console.log(detail);
  return <div>Detail</div>;
};

export default FilmWatch;
