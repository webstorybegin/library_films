import { API, OPTIONS } from "../constants";

export const fetchMoviesByYear = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API}discover/movie?primary_release_year=${query}&sort_by=popularity.desc&page=${page}`,
      OPTIONS
    );
    const data = await response.json();
    return { results: data.results || [], totalPages: data.total_pages };
  } catch (error) {
    console.error("Error fetching movies by year:", error);
    return { results: [], totalPages: 0 };
  }
};
