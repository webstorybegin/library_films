import { API, OPTIONS } from "../constants";

export const fetchMoviesByGenre = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API}discover/movie?genre=${query}&sort_by=popularity.desc&page=${page}`,
      OPTIONS,
    );
    const data = await response.json();
    return { results: data.results || [], totalPages: data.total_pages };
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { results: [], totalPages: 0 };
  }
};
