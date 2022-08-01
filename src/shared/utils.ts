import { EMBED_TO, IMAGE_URL } from "./constants";

export const resizeImage = (
  imageUrl: string,
  width: string = "original"
): string => `${IMAGE_URL}/${width}${imageUrl}`;

// export const embedMovie = (id: number): string =>
//   `${EMBED_URL}/movie?tmdb=${id}`;

// export const embedMovie = (id: number): string => `${EMBED_VIDSRC}/${id}`;

export const embedMovie = (id: number): string => `${EMBED_TO}/movie?id=${id}`;

// export const embedTV = (id: number, season: number, episode: number): string =>
//   `${EMBED_URL}/series?tmdb=${id}&sea=${season}&epi=${episode}`;

// export const embedTV = (id: number, season: number, episode: number): string =>
//   `${EMBED_VIDSRC}/${id}/${season}-${episode}`;

export const embedTV = (id: number, season: number, episode: number): string =>
  `${EMBED_TO}/tv?id=${id}&s=${season}&e=${episode}`;

export const calculateTimePassed = (time: number): string => {
  const unit = {
    year: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
    month: 30 * 7 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff = Date.now() - time;
  for (const key in unit) {
    if (diff > unit[key as keyof typeof unit]) {
      const timePassed = Math.floor(diff / unit[key as keyof typeof unit]);
      return `${timePassed} ${key}${timePassed > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

export const convertErrorCodeToMessage = (errorCode: string) => {
  if (errorCode === "auth/email-already-in-use")
    return "Your email is already in use.";
  else if (errorCode === "auth/user-not-found")
    return "Your email may be incorrect.";
  else if (errorCode === "auth/wrong-password")
    return "Your password is incorrect.";
  else return "Something weird happened.";
};
