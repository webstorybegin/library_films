import { API, OPTIONS } from "../constants";

export const fetchTrendingMovies = async (timeWindow = "week", page) => {
  try {
    const url = page
      ? `${API}trending/movie/${timeWindow}?page=${page}`
      : `${API}trending/movie/${timeWindow}`;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();
    if (page) {
      return { results: data.results, totalPages: data.total_pages };
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return page ? { results: [], totalPages: 0 } : [];
  }
};
