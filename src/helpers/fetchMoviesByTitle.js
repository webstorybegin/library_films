import { API, OPTIONS } from "../constants";

export const fetchMoviesByTitle = async (query) => {
  try {
    const response = await fetch(`${API}search/movie?query=${query}`, OPTIONS);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
