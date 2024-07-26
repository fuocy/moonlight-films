import { useQuery } from "@tanstack/react-query";
import {
  getHomeMovies,
  getHomeTVs,
  getMovieBannerInfo,
  getTVBannerInfo,
} from "../services/home";
import { BannerInfo, HomeFilms, Item } from "../shared/types";

export const useHomeData = (type: "movies" | "tvs") => {
  const getData = type === "movies" ? getHomeMovies : getHomeTVs;
  const { data, isLoading, isError, error } = useQuery<HomeFilms, Error>(
    [`home-${type}`],
    getData
  );

  const detailQuery = useQuery<BannerInfo[], Error>(
    [`detail${type.charAt(0).toUpperCase + type.slice(1)}`, data?.Trending],
    () =>
      type === "movies"
        ? getMovieBannerInfo(data?.Trending as Item[])
        : getTVBannerInfo(data?.Trending as Item[]),
    {
      enabled: !!data?.Trending,
    }
  );

  return { data, isLoading, isError, error, detailQuery };
};
