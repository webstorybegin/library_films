import { API, OPTIONS } from "../constants";

export const fetchPopularMovies = async (page) => {
  try {
    const url = page
      ? `${API}movie/popular?page=${page}`
      : `${API}movie/popular`;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();
    if (page) {
      return { results: data.results, totalPages: data.total_pages };
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return page ? { results: [], totalPages: 0 } : [];
  }
};
