import axios from "../shared/axios";
import { getRecommendGenres2Type, Item, ItemsPage } from "../shared/types";

export const getSearchKeyword = async (query: string): Promise<string[]> => {
  return (
    await axios.get("/search/keyword", {
      params: {
        query,
      },
    })
  ).data.results
    .map((item: any) => item.name)
    .filter((_: any, index: number) => index < 5);
};

// export const getRecommendGenres = async (): Promise<
//   { id: number; name: string }[]
// > => {
//   const movieGenres = (await axios.get("/genre/movie/list")).data.genres;
//   const tvGenres = (await axios.get("/genre/tv/list")).data.genres;

//   return Array.from(new Set(movieGenres.concat(tvGenres)));
// };

export const getRecommendGenres2 =
  async (): Promise<getRecommendGenres2Type> => {
    const movieGenres = (await axios.get("/genre/movie/list")).data.genres;
    const tvGenres = (await axios.get("/genre/tv/list")).data.genres;

    return {
      movieGenres,
      tvGenres,
    };
  };

export const getSearchResult: (
  typeSearch: string,
  query: string,
  page: number
) => Promise<ItemsPage> = async (typeSearch, query, page) => {
  const data = (
    await axios.get(`/search/${typeSearch}`, {
      params: {
        query,
        page,
      },
    })
  ).data;

  const results = data.results
    .map((item: Item) => ({
      ...item,
      ...(typeSearch !== "multi" && { media_type: typeSearch }),
    }))
    .filter((item: Item) => item.poster_path || item.profile_path);

  return {
    ...data,
    results,
  };
};
