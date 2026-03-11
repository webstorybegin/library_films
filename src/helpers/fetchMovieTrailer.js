import { API, OPTIONS } from "../constants";

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(`${API}movie/${movieId}/videos`, OPTIONS);
    const data = await response.json();
    const videos = data.results || [];
    // Prefer official YouTube trailers, then teasers
    const trailer =
      videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
      videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
      videos.find((v) => v.site === "YouTube");
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    return null;
  }
};
