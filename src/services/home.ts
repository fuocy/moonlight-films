import axios from "../shared/axios";
import { BannerInfo, Item } from "../shared/types";
import { HomeFilms } from "../shared/types";

// MOVIE TAB
///////////////////////////////////////////////////////////////
export const getHomeMovies = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: "/trending/movie/day",
    Popular: "/movie/popular",
    "Top Rated": "/movie/top_rated",
    Hot: "/trending/movie/day?page=2",
    Upcoming: "/movie/upcoming",
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axios.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.data.results.map(
      (item: Item) => ({
        ...item,
        media_type: "movie",
      })
    );

    return final;
  }, {} as HomeFilms);

  return data;
};

export const getMovieBannerInfo = async (
  movies: Item[]
): Promise<BannerInfo[]> => {
  const detailRes = await Promise.all(
    movies.map((movie) => axios.get(`/movie/${movie.id}`))
  );

  const translationRes = await Promise.all(
    movies.map((movie) => axios.get(`/movie/${movie.id}/translations`))
  );

  const translations: string[][] = translationRes.map((item: any) =>
    item.data.translations
      .filter((translation: any) =>
        ["vi", "fr", "ja", "pt", "ru", "es"].includes(translation.iso_639_1)
      )
      .reduce((acc: any, element: any) => {
        if (element.iso_639_1 === "vi") {
          return [element, ...acc];
        }
        return [...acc, element];
      }, [] as any)
      .map((translation: any) => translation.data.title)
  );

  // translations will look like: [["bác sĩ kì lạ", "doctor strange", "doctor Strange tiếng nước nào đó"],["nhện xa nhà", "nhện xa nhà tiếng nước nào đó", "spider man fram from home", "spider man tiếng châu phi"],...]

  const genres: { name: string; id: number }[][] = detailRes.map((item: any) =>
    item.data.genres.filter((_: any, index: number) => index < 3)
  );

  // genres will look like: [[{name: "action", id: 14}, {name: "wild", id: 19}, {name: "love", ket: 23}],[{name: "fantasy", id: 22}, {name: "science", id: 99}],...]

  // we have translations.length = genres.length, so let's merge these 2 arrays together
  return genres.map((genre, index) => ({
    genre,
    translation: translations[index],
  })) as BannerInfo[];

  // yeah I admit that it's hard to understand my code :)
};

// TV TAB
///////////////////////////////////////////////////////////////

export const getHomeTVs = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: "/trending/tv/day",
    Popular: "/tv/popular",
    "Top Rated": "/tv/top_rated",
    Hot: "/trending/tv/day?page=2",
    "On the air": "/tv/on_the_air",
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axios.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.data.results.map(
      (item: Item) => ({
        ...item,
        media_type: "tv",
      })
    );

    return final;
  }, {} as HomeFilms);

  return data;
};

export const getTVBannerInfo = async (tvs: Item[]): Promise<BannerInfo[]> => {
  const detailRes = await Promise.all(
    tvs.map((tv) => axios.get(`/tv/${tv.id}`))
  );

  const translationRes = await Promise.all(
    tvs.map((tv) => axios.get(`/tv/${tv.id}/translations`))
  );

  const translations = translationRes.map((item: any) =>
    item.data.translations
      .filter((translation: any) =>
        ["vi", "fr", "ja", "pt", "ru", "es"].includes(translation.iso_639_1)
      )
      .reduce((acc: any, element: any) => {
        if (element.iso_639_1 === "vi") {
          return [element, ...acc];
        }
        return [...acc, element];
      }, [] as any)
      .map((translation: any) => translation.data.name)
  );

  const genres = detailRes.map((item: any) =>
    item.data.genres.filter((_: any, index: number) => index < 3)
  );

  return genres.map((genre, index) => ({
    genre,
    translation: translations[index],
  })) as BannerInfo[];
};

// GENERAL
///////////////////////////////////////////////////////////////
export const getTrendingNow = async (): Promise<Item[]> => {
  return (await axios.get("/trending/all/day?page=2")).data.results;
};
