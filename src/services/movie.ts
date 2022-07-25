import axios from "../shared/axios";
import {
  FilmInfo,
  getWatchReturnedType,
  Reviews,
  Video,
} from "../shared/types";

export const getMovieFullDetail = async (id: number): Promise<FilmInfo> => {
  const response = await Promise.all([
    axios.get(`/movie/${id}`),
    axios.get(`/movie/${id}/credits`),
    axios.get(`/movie/${id}/reviews`),
    axios.get(`/movie/${id}/recommendations`),
    axios.get(`/movie/${id}/videos`),
  ]);

  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data, media_type: "movie" };
        break;

      case 1:
        final.credits = current.data.cast.slice(0, 8);
        break;

      case 2:
        final.reviews = current.data.results.filter(
          (item: Reviews) => item.author !== "MSB"
        );
        break;

      case 3:
        final.similar = current.data.results;
        break;

      case 4:
        final.videos = current.data.results
          .filter((item: Video) => item.site === "YouTube")
          .reduce((acc: any, current: Video) => {
            if (current.type === "Trailer") return [current, ...acc];
            else return [...acc, current];
          }, [] as Video[]);
        break;
    }

    return final;
  }, {} as FilmInfo);

  return movieInfo;
};

export const getWatchMovie = async (
  id: number
): Promise<getWatchReturnedType> => {
  const res = await Promise.all([
    axios.get(`/movie/${id}`),
    axios.get(`/movie/${id}/recommendations`),
  ]);

  return {
    detail: res[0].data,
    recommendations: res[1].data.results,
  };
};
