export interface Item {
  poster_path: string;
  overview: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;

  // Additional props
  media_type: "movie" | "tv";

  // Movie items
  release_date?: string;
  original_title?: string;
  title?: string;
  adult?: boolean;
  video?: boolean;

  // TV Show items
  first_air_date?: string;
  original_name?: string;
  origin_country?: string[];
  name?: string;
}

////////////////////////////////////////////
// Type for async function's returned value
export interface HomeMovies {
  [key: string]: Item[];
}
