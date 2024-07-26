import { FunctionComponent } from "react";
import { Item, ItemsPage } from "../../shared/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import FilmItem from "../Common/FilmItem";
import Skeleton from "../Common/Skeleton";

interface ExploreResultContentProps {
  data: ItemsPage[] | undefined;
  fetchNext: () => void;
  hasMore: boolean | undefined;
}

const ExploreResultContent: FunctionComponent<ExploreResultContentProps> = ({
  data,
  fetchNext,
  hasMore,
}) => {
  return (
    <>
      {data?.reduce(
        (acc: Item[], current: ItemsPage) => [...acc, ...current.results],
        [] as Item[]
      ).length === 0 ? (
        <div className="flex flex-col items-center mb-12">
          <LazyLoadImage
            src="/error.png"
            alt=""
            effect="opacity"
            className="w-[600px]"
          />
          <p className="text-white text-3xl mt-5">There is no such films</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data?.length || 0}
          next={() => fetchNext()}
          hasMore={!!hasMore}
          loader={<div>Loading...</div>}
          endMessage={<></>}
        >
          <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2 px-2">
            {data &&
              data.map((page) =>
                page.results.map((item) => (
                  <li key={item.id}>
                    <FilmItem item={item} />
                  </li>
                ))
              )}
            {!data &&
              [...new Array(15)].map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-0 pb-[160%]" />
                </li>
              ))}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
};

export default ExploreResultContent;
