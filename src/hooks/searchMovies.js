import { SEARCH_TYPES } from "../constants";
import {
  fetchMoviesByTitle,
  fetchMoviesByGenre,
  fetchMoviesByYear,
} from "../helpers";

export const searchMovies = async (query, type) => {
  switch (type) {
    case SEARCH_TYPES.TITLE:
      return await fetchMoviesByTitle(query);
    case SEARCH_TYPES.GENRE:
      return await fetchMoviesByGenre(query);
    case SEARCH_TYPES.YEAR:
      return await fetchMoviesByYear(query);
    default:
      return [];
  }
};
