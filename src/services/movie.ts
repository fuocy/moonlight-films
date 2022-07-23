import axios from "../shared/axios";
import { FilmInfo, Video } from "../shared/types";

export const getMovieDetail = async (id: number): Promise<FilmInfo> => {
  const response = await Promise.all([
    axios.get(`/movie/${id}`),
    axios.get(`/movie/${id}/credits`),
    axios.get(`/movie/${id}/images`),
    axios.get(`/movie/${id}/reviews`),
    axios.get(`/movie/${id}/similar`),
    axios.get(`/movie/${id}/videos`),
  ]);

  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data, media_type: "movie" };
        break;

      case 1:
        final.credits = current.data.cast.slice(0, 10);
        break;

      case 2:
        final.images = current.data;
        break;

      case 3:
        final.reviews = current.data.results;
        break;

      case 4:
        final.similar = current.data.results;
        break;

      case 5:
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
