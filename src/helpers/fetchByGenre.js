import { API, OPTIONS } from "../constants";

export const fetchByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${API}discover/movie?with_genres=${genreId}`,
      OPTIONS,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};

// Common genre IDs for Netflix-style categories
export const GENRES = {
  ACTION: 28,
  COMEDY: 35,
  DRAMA: 18,
  HORROR: 27,
  ROMANCE: 10749,
  THRILLER: 53,
  SCIFI: 878,
  ANIMATION: 16,
};

