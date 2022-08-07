import { FunctionComponent } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { Item } from "../../shared/types";
import { resizeImage } from "../../shared/utils";
import Skeleton from "./Skeleton";

interface RightbarFilmsProps {
  films: Item[] | undefined;
  name: string;
  limitNumber?: number;
  isLoading: boolean;
  className?: string;
}

const RightbarFilms: FunctionComponent<RightbarFilmsProps> = ({
  films,
  name,
  limitNumber,
  isLoading,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <p className="mb-6 text-xl font-medium flex justify-between items-center">
        <span className="text-white">{name}</span>
        <BsThreeDotsVertical size={20} />
      </p>
      <ul className="flex flex-col gap-5">
        {isLoading
          ? new Array(limitNumber).fill("").map((_, index) => (
              <li key={index} className="flex gap-5 items-center h-[156px]">
                <Skeleton className="shrink-0 max-w-[100px] w-full h-full rounded-md" />
                <Skeleton className="flex-grow h-[85%] rounded-md" />
              </li>
            ))
          : (films as Item[]).slice(0, limitNumber).map((item) => (
              <li key={item.id}>
                <Link
                  to={
                    item.media_type === "movie"
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}`
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
      <button
        onClick={() => navigate("/explore")}
        className="bg-dark-lighten py-2 w-full rounded-full mt-7 hover:brightness-75 transition duration-300 "
      >
        See more
      </button>
    </div>
  );
};

export default RightbarFilms;
