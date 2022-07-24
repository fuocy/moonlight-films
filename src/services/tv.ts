import axios from "../shared/axios";
import { FilmInfo, Reviews, Video } from "../shared/types";

export const getTVDetail = async (id: number): Promise<FilmInfo> => {
  const response = await Promise.all([
    axios.get(`/tv/${id}`),
    axios.get(`/tv/${id}/credits`),
    axios.get(`/tv/${id}/reviews`),
    axios.get(`/tv/${id}/recommendations`),
    axios.get(`/tv/${id}/videos`),
  ]);

  const tvInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data, media_type: "tv" };
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

  return tvInfo;
};
