export const API_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p";
export const EMBED_URL = "https://2embed.org/embed";
export const EMBED_VIDSRC = "https://vidsrc.me/embed";
export const EMBED_TO = "https://www.2embed.to/embed/tmdb";

export const reactionColorForTailwindCSS = {
  haha: "text-yellow-500",
  like: "text-primary",
  love: "text-red-500",
  angry: "text-orange-500",
  wow: "text-green-500",
  sad: "text-purple-500",
};

export const MAX_RUNTIME = 200;
export const GAP = 20;

// My purpose is to append search parameter to the url without replace the existing search parameter.

// I have 2 ways of doing that. The first way is not optimal

// this peace of code is of the first way. I could delete it but I'd like to keep it as a reference.

export const SUPPORTED_QUERY = {
  genre: [],
  sort_by: [],
  minRuntime: [],
  maxRuntime: [],
  from: [],
  to: [],
};
