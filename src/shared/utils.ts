import { IMAGE_URL } from "./constants";
import { EMBED_URL } from "./constants";

export const resizeImage = (
  imageUrl: string,
  width: string = "original"
): string => `${IMAGE_URL}/${width}${imageUrl}`;

export const embedMovie = (id: number): string =>
  `${EMBED_URL}/movie?tmdb=${id}`;

export const embedTV = (id: number, season: number, episode: number): string =>
  `${EMBED_URL}/series?tmdb=${id}&sea=${season}&epi=${episode}`;
