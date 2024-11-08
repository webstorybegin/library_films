// Import React
import { useEffect, useState } from "react";

// Import components
import { Image, Search, Spinner, MovieCard } from "components";

// Import hooks
import { fetchMovies } from "components/hooks/fetchMovies";

// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  containerMovies: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "110px 20px 0px",
  },
  filmNotFound: {
    position: "absolute",
    bottom: 0,
    left: "45%",
    width: "auto",
    height: 500,
    marginLeft: -100,
    borderRadius: 50,
  },
});

export const Home = ({ theme }) => {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [moviesFound, setMoviesFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialSearch, setInitialSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchMovies.trim() === "") {
        setMovies([]);
        setLoading(false);
        setInitialSearch(false);
        return;
      }
      setLoading(true);
      setInitialSearch(true);

      try {
        const data = await fetchMovies(searchMovies);
        setMovies(data);
        setMoviesFound(data.length > 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchMovies]);

  const classes = useStyles();

  return (
    <>
      <Search
        onChange={(e: any) => setSearchMovies(e.target.value)}
        theme={theme}
      />

      <div className={classes.containerMovies}>
        {loading && <Spinner theme={theme} />}
        {!loading &&
          moviesFound &&
          movies.map((movie) => (
            <MovieCard key={movie.id} theme={theme} {...movie} />
          ))}
        {!loading &&
          !moviesFound &&
          searchMovies.trim() !== "" &&
          initialSearch && (
            <Image.NotFoundAnimate className={classes.filmNotFound} />
          )}
      </div>
    </>
  );
};
