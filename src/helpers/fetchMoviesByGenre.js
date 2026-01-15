import { API, OPTIONS } from "../constants";

export const fetchMoviesByGenre = async (query) => {
  try {
    const response = await fetch(
      `${API}genre/movie/list?language=${query}`,
      OPTIONS
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
