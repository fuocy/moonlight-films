import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getSearchResult } from "../../services/search";
import { ItemsPage } from "../../shared/types";
import FilmItem from "../Common/FilmItem";
import Skeleton from "../Common/Skeleton";
import Pagination from "./Pagination";

interface SearchResultProps {
  currentTab: string;
  query: string;
  page: number;
}

const SearchResult: FunctionComponent<SearchResultProps> = ({
  currentTab,
  query,
  page,
}) => {
  const { data, error, isPreviousData } = useQuery<ItemsPage, Error>(
    ["search-result", currentTab, query, page],
    () => getSearchResult(currentTab, query, page),
    {
      keepPreviousData: true,
    }
  );

  if (error) return <div>ERROR: ${error.message}</div>;

  const changePageHandler = (page: number): string => {
    if (isPreviousData) return "";
    return `/search?query=${encodeURIComponent(query)}&page=${page}`;
  };

  return (
    <div className="md:mt-32 mt-7 px-[2vw]">
      <p className="text-white md:text-xl text-lg mb-6">
        Search results for "{query}" ({data?.total_results} results found)
      </p>
      {data && data.results.length === 0 && (
        <div className="flex flex-col items-center mb-12">
          <LazyLoadImage
            src="/error.png"
            alt=""
            effect="opacity"
            className="w-[600px]"
          />
          <p className="text-white text-3xl mt-5">There is no such films</p>
        </div>
      )}
      <ul className="grid grid-cols-sm md:grid-cols-lg gap-x-8 gap-y-10">
        {data &&
          data.results.map((item) => (
            <li key={item.id}>
              <FilmItem item={item} />
            </li>
          ))}
        {!data &&
          [...new Array(15)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-0 pb-[160%]" />
            </li>
          ))}
      </ul>
      {data && (
        <Pagination
          maxPage={data.total_pages}
          currentPage={data.page}
          onChangePage={changePageHandler}
        />
      )}
    </div>
  );
};

export default SearchResult;
