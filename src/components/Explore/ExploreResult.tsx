import { useInfiniteQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getExploreMovie, getExploreTV } from "../../services/explore";
import { ItemsPage } from "../../shared/types";
import FilmItem from "../Common/FilmItem";
interface ExploreResultProps {
  currentTab: string;
  config: { [key: string]: string };
}

const ExploreResult: FunctionComponent<ExploreResultProps> = ({
  currentTab,
  config,
}) => {
  const {
    data: movies,
    error: errorMovies,
    fetchNextPage: fetchNextPageMovie,
    hasNextPage: hasNextPageMovie,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-movie", config],
    ({ pageParam = 1 }) => getExploreMovie(pageParam, config),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined,
    }
  );

  const {
    data: tvs,
    error: errorTvs,
    fetchNextPage: fetchNextPageTv,
    hasNextPage: hasNextPageTv,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-tv", config],
    ({ pageParam = 1, queryKey }) =>
      getExploreTV(pageParam, queryKey[1] as { [key: string]: string }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined,
    }
  );

  if (errorMovies) return <div>ERROR: {errorMovies.message}</div>;
  if (errorTvs) return <div>ERROR: {errorTvs.message}</div>;

  if (!movies) return <div>Loading...</div>;
  if (!tvs) return <div>Loading...</div>;

  return (
    <>
      {currentTab === "movie" && (
        <InfiniteScroll
          dataLength={movies.pages.length}
          next={() => fetchNextPageMovie()}
          hasMore={Boolean(hasNextPageMovie)}
          loader={<div>Loading...</div>}
          endMessage={<div>No more results</div>}
        >
          <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10">
            {movies.pages.map((page) =>
              page.results.map((item) => (
                <li key={item.id}>
                  <FilmItem item={item} />
                </li>
              ))
            )}
          </ul>
        </InfiniteScroll>
      )}

      {currentTab === "tv" && (
        <InfiniteScroll
          dataLength={tvs.pages.length}
          next={() => fetchNextPageTv()}
          hasMore={Boolean(hasNextPageTv)}
          loader={<div>Loading...</div>}
          endMessage={<div>No more results</div>}
        >
          <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10">
            {tvs.pages.map((page) =>
              page.results.map((item) => (
                <li key={item.id}>
                  <FilmItem item={item} />
                </li>
              ))
            )}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
};

export default ExploreResult;
