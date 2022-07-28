import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router-dom";
import { getRecommendGenres2 } from "../../services/search";
import { getRecommendGenres2Type } from "../../shared/types";

const getRandomGenres = (genres: { id: number; name: string }[]) => {
  // const NUMBER_OF_GENRES = 6;
  // const randomGenres = [] as { id: number; name: string }[];
  // [...new Array(NUMBER_OF_GENRES)].forEach((genre) => {
  //   const randomIndex = Math.floor(Math.random() * genres.length);
  //   randomGenres.push(genres[randomIndex]);
  //   genres = genres.filter((item: any) => item.id !== genres[randomIndex].id);
  // });

  const myChoiceGenresIndex = [5, 2, 13, 14, 6, 7, 4];
  return myChoiceGenresIndex.map((arrIndex) => genres[arrIndex]);
};

interface RecommendGenresProps {
  currentTab: string;
}

const RecommendGenres: FC<RecommendGenresProps> = ({ currentTab }) => {
  const { isLoading, data, isError, error } = useQuery<
    getRecommendGenres2Type,
    Error
  >(["genres"], getRecommendGenres2);

  if (isError) return <div>ERROR: {error.message}</div>;

  if (isLoading)
    return (
      <div className="mt-36 mb-20 mx-auto h-10 w-10 rounded-full border-[5px] border-dark-lighten border-t-transparent animate-spin"></div>
    );

  //  as { id: number; name: string }[]
  const randomGenres = getRandomGenres(
    currentTab === "movie" ? data.movieGenres : data.tvGenres
  );

  return (
    <ul className="mt-28 flex gap-3 flex-wrap ">
      {randomGenres.map((genre) => (
        <li key={genre.id} className="mb-2">
          <Link
            to={`/explore?genre=${String(genre.id)}`}
            className="px-4 py-2 bg-dark-lighten rounded-full hover:brightness-75 transition duration-300"
          >
            {genre.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default RecommendGenres;
