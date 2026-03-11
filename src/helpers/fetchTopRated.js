import { API, OPTIONS } from "../constants";

export const fetchTopRated = async (page) => {
  try {
    const url = page
      ? `${API}movie/top_rated?page=${page}`
      : `${API}movie/top_rated`;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();
    if (page) {
      return { results: data.results, totalPages: data.total_pages };
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return page ? { results: [], totalPages: 0 } : [];
  }
};
