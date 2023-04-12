import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { getExploreMovie, getExploreTV } from "../../services/explore";
import { ConfigType, ItemsPage } from "../../shared/types";
import ExploreResultContent from "./ExploreResultContent";

interface ExploreResultProps {
  currentTab: string;
  config: ConfigType;
}

const ExploreResult: FunctionComponent<ExploreResultProps> = ({
  currentTab,
  config,
}) => {
  const [parent] = useAutoAnimate();

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
      getExploreTV(
        pageParam,
        queryKey[1] as { [key: string]: string | number }
      ),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined,
    }
  );

  if (errorMovies) return <div>ERROR: {errorMovies.message}</div>;
  if (errorTvs) return <div>ERROR: {errorTvs.message}</div>;

  return (
    <div
      // @ts-ignore
      ref={parent}
    >
      {currentTab === "movie" && (
        <ExploreResultContent
          data={movies?.pages}
          fetchNext={fetchNextPageMovie}
          hasMore={hasNextPageMovie}
        />
      )}

      {currentTab === "tv" && (
        <ExploreResultContent
          data={tvs?.pages}
          fetchNext={fetchNextPageTv}
          hasMore={hasNextPageTv}
        />
      )}
    </div>
  );
};

export default ExploreResult;
