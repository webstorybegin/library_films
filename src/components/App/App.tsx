import { useState, useEffect } from "react";

import { SwitchSelect } from "components/ui/SwitchSelect/SwitchSelect";
import { Movie } from "components/Movie/Movie";

import { makeStyles } from "@material-ui/styles";
import { TextField } from "@mui/material";

const useStyles = makeStyles({
  container: {
    width: "100%",
    minHeight: "100vh",
    margin: "0 auto",
  },
  containerMovies: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px 0",
    "& input": {
      background: "#fff",
    },
  },
  search: {
    width: 300,
    fontSize: 35,
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [looked, setLooked] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [theme, setTheme] = useState(false);

  const API = "https://api.themoviedb.org/3/";
  const API_KEY = "&api_key=c5449791ae3cc7b4aaf0eb3cb27cac42";
  const MOVIE_SEARCH = `${API}search/movie?${API_KEY}&query=`;
  
  const handleOnChange = (e) => {
    setSearchMovies(e.target.value);

    fetch(MOVIE_SEARCH + searchMovies)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      });
  };

  useEffect(() => {
    const movieLooked = JSON.parse(localStorage.getItem("looked-movies"));

    if (movieLooked) {
      setLooked(movieLooked);
    }
  }, []);

  const saveLocalStorage = (items) => {
    localStorage.setItem("looked-movies", JSON.stringify(items));
  };

  const addLookedMovie = (movie) => {
    const newLookedMovieList = [...looked, movie];
    setLooked(newLookedMovieList);
    saveLocalStorage(newLookedMovieList);
  };

  const removeLookedMovie = (movie) => {
    const newLookedMovieList = looked.filter(
      (looked) => looked.imdbID !== movie.imdbID
    );

    setLooked(newLookedMovieList);
    saveLocalStorage(newLookedMovieList);
  };

  const classes = useStyles();

  return (
    <div
      style={theme === false ? { background: "#fff" } : { background: "#333" }}
      className={classes.container}
    >
      <header className={classes.header}>
        <TextField
          style={theme === true ? { background: "#333" } : null}
          label="Search..."
          variant="filled"
          value={searchMovies}
          onChange={handleOnChange}
          className={classes.search}
        />
        <SwitchSelect theme={theme} setTheme={setTheme} />
      </header>
      <div className={classes.containerMovies}>
        {movies && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
