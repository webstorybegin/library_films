import { API, OPTIONS } from "../constants";

export const fetchUpcoming = async (page) => {
  try {
    const url = page
      ? `${API}movie/upcoming?page=${page}`
      : `${API}movie/upcoming`;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();
    if (page) {
      return { results: data.results, totalPages: data.total_pages };
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return page ? { results: [], totalPages: 0 } : [];
  }
};
