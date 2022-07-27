import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { getRecommendGenres2 } from "../../services/search";
import { getRecommendGenres2Type } from "../../shared/types";

interface FilterByGenresProps {
  currentTab: string;
}

const FilterByGenres: FunctionComponent<FilterByGenresProps> = ({
  currentTab,
}) => {
  const [genres] = useAutoAnimate();
  const { isLoading, data, isError, error } = useQuery<
    getRecommendGenres2Type,
    Error
  >(["genres"], getRecommendGenres2);

  if (isError) return <div>ERROR: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul
      // @ts-ignore
      ref={genres}
      className="flex gap-3 flex-wrap max-h-[200px] overflow-y-auto"
    >
      {currentTab === "movie" &&
        data.movieGenres.map((genre) => (
          <li key={genre.id}>
            <Link
              to={`/explore?genre=${encodeURIComponent(genre.name)}`}
              className="px-4 py-1 border border-[#989898] rounded-full hover:brightness-75 transition duration-300 inline-block"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      {currentTab === "tv" &&
        data.tvGenres.map((genre) => (
          <li key={genre.id}>
            <Link
              to={`/explore?genre=${encodeURIComponent(genre.name)}`}
              className="px-4 py-1 border border-[#989898] rounded-full hover:brightness-75 transition duration-300 inline-block"
            >
              {genre.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default FilterByGenres;
