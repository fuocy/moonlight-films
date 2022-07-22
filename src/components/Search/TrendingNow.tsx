import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getTrendingNow } from "../../services/home";
import { Item } from "../../shared/types";
import { resizeImage } from "../../shared/utils";
import { AiFillStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
const TrendingNow: FC = () => {
  const { isLoading, data, isError, error } = useQuery<Item[], Error>(
    ["trending"],
    getTrendingNow
  );

  if (isError) return <div>ERROR: ${error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <p className="mt-7 mb-6 text-xl font-medium flex justify-between items-center">
        <span className="text-white">Trending</span>{" "}
        <BsThreeDotsVertical size={20} />
      </p>
      <ul className="flex flex-col gap-5">
        {data.slice(0, 2).map((item) => (
          <li key={item.id}>
            <Link
              to={
                item.media_type === "movie"
                  ? `movie/${item.id}`
                  : `tv/${item.id}`
              }
              className="hover:brightness-75 transiton duration-300 flex gap-5 items-center"
            >
              <div className="shrink-0 max-w-[100px] w-full">
                <LazyLoadImage
                  src={resizeImage(item.poster_path, "w154")}
                  className="w-full h-full object-cover rounded-md"
                  alt="poster"
                  effect="blur"
                />
              </div>
              <div className="flex-grow">
                <p className="text-white mb-3 text-lg">
                  {item.title || item.name}
                </p>
                <p className="mb-8">
                  {item.release_date || item.first_air_date}
                </p>
                <div className="inline-flex gap-2 items-center px-3 py-[2px] rounded-full text-primary border border-primary text-sm">
                  <span>{item.vote_average.toFixed(1)}</span>
                  <AiFillStar size={15} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="bg-dark-lighten py-2 w-full rounded-full mt-7 hover:brightness-75 transition duration-300">
        See more
      </button>
    </>
  );
};

export default TrendingNow;
