const API = "https://api.themoviedb.org/3/";
export const SEARCH_TYPES = {
  TITLE: "title",
  GENRE: "genre",
  YEAR: "year",
};
const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTQ0OTc5MWFlM2NjN2I0YWFmMGViM2NiMjdjYWM0MiIsIm5iZiI6MTY0Mjg0OTc2NC45NDcsInN1YiI6IjYxZWJlNWU0Y2VkYWM0MDA2Y2MwYWQ5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KhPexqpRkE89lD5Tq_s1oFTJ5OaDapuFYzqlM_c3MCc",
  },
};

export { API, OPTIONS };
