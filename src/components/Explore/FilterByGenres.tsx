import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecommendGenres2 } from "../../services/search";
import { getRecommendGenres2Type } from "../../shared/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface FilterByGenresProps {
  currentTab: string;
}

const FilterByGenres: FunctionComponent<FilterByGenresProps> = ({
  currentTab,
}) => {
  const { isLoading, data, isError, error } = useQuery<
    getRecommendGenres2Type,
    Error
  >(["genres"], getRecommendGenres2);

  const [searchParam, setSearchParam] = useSearchParams();
  const [parent] = useAutoAnimate();

  if (isError) return <div>ERROR: {error.message}</div>;

  if (isLoading)
    return (
      <div className="mt-20 mb-20 mx-auto h-10 w-10 rounded-full border-[5px] border-dark-darken border-t-transparent animate-spin"></div>
    );
  //////////////////////////////////////////////////////////////////////////
  // THE FIRST WAY OF APPENDING SEARCH PARAMETER WITHOUT REPLACING THE EXISTING ONES (NOT OPTIMAL)
  // const [currentSearchParams] = useCurrentParams();

  // const chooseGenre = (genreId: string) => {
  //   const existingGenres = searchParam.getAll("genre");

  //   if (existingGenres.includes(genreId)) {
  //     const newGenres = existingGenres.filter(
  //       (genre: string) => genre !== genreId
  //     );
  //     setSearchParam({
  //       ...currentSearchParams,
  //       genre: newGenres,
  //     });
  //   } else {
  //     setSearchParam({
  //       ...currentSearchParams,
  //       genre: [...existingGenres, genreId],
  //     });
  //   }
  // };
  //////////////////////////////////////////////////////////////////////////

  // THE SECOND WAY OF APPENDING SEARCH PARAMETER WITHOUT REPLACING THE EXISTING ONES (BETTER)
  const chooseGenre = (genreId: string) => {
    const existingGenres = searchParam.getAll("genre");

    if (existingGenres.includes(genreId)) {
      const updatedGenres = existingGenres.filter((genre) => genre !== genreId);

      searchParam.delete("genre");

      updatedGenres.forEach((genreId) => {
        searchParam.append("genre", genreId);
      });

      setSearchParam(searchParam);
    } else {
      searchParam.append("genre", genreId);
      setSearchParam(searchParam);
    }
  };

  return (
    <ul // @ts-ignore
      ref={parent}
      className="flex gap-3 flex-wrap max-h-[200px] overflow-y-auto"
    >
      {data[currentTab === "movie" ? "movieGenres" : "tvGenres"].map(
        (genre) => (
          <li key={genre.id}>
            <button
              onClick={chooseGenre.bind(this, String(genre.id))}
              className={`px-4 py-1 border border-[#989898] rounded-full hover:brightness-75 transition duration-300 inline-block ${
                searchParam.getAll("genre").includes(String(genre.id)) &&
                "bg-primary text-white"
              }`}
            >
              {genre.name}
            </button>
          </li>
        )
      )}
    </ul>
  );
};

export default FilterByGenres;

// to={`/explore?genre=${encodeURIComponent(genre.id)}`}
