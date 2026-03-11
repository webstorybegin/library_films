import { API, OPTIONS } from "../constants";

export const fetchFeaturedMovie = async () => {
  try {
    // Fetch trending movies
    const response = await fetch(`${API}trending/movie/day`, OPTIONS);
    const data = await response.json();

    // Filter movies with backdrop images
    const moviesWithBackdrop = data.results.filter(
      (movie) => movie.backdrop_path !== null
    );

    // Select a random movie from top 5
    const randomIndex = Math.floor(Math.random() * Math.min(5, moviesWithBackdrop.length));
    return moviesWithBackdrop[randomIndex] || data.results[0];
  } catch (error) {
    console.error("Error fetching featured movie:", error);
    return null;
  }
};
