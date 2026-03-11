import { SEARCH_TYPES } from "../constants";
import {
  fetchMoviesByTitle,
  fetchMoviesByGenre,
  fetchMoviesByYear,
} from "../helpers";

export const searchMovies = async (query, type, page = 1) => {
  switch (type) {
    case SEARCH_TYPES.TITLE:
      return await fetchMoviesByTitle(query, page);
    case SEARCH_TYPES.GENRE:
      return await fetchMoviesByGenre(query, page);
    case SEARCH_TYPES.YEAR:
      return await fetchMoviesByYear(query, page);
    default:
      return { results: [], totalPages: 0 };
  }
};
