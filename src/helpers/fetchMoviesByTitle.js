import { API, OPTIONS } from "../constants";

export const fetchMoviesByTitle = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API}search/movie?query=${query}&page=${page}`,
      OPTIONS
    );
    const data = await response.json();
    return { results: data.results, totalPages: data.total_pages };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], totalPages: 0 };
  }
};
