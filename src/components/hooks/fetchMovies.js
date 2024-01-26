export const fetchMovies = async (query) => {
  const API = "https://api.themoviedb.org/3/";
  const API_KEY = "&api_key=c5449791ae3cc7b4aaf0eb3cb27cac42";

  try {
    const response = await fetch(
      `${API}search/movie?${API_KEY}&query=${query}`
    );
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
