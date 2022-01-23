import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card } from "components/Card/Card";
import { TextField } from "@mui/material";

const useStyles = makeStyles({
  root: {
    width: "1920px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px 0",
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");

  const _apiKey = "&api_key=c5449791ae3cc7b4aaf0eb3cb27cac42";
  const _api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc${_apiKey}&`;
  const _movieSearch = `https://api.themoviedb.org/3/search/movie?&api_key=c5449791ae3cc7b4aaf0eb3cb27cac42&query=`;

  useEffect(() => {
    fetch(_api)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, []);

  const classes = useStyles();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(_movieSearch + searchMovies)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      });
    setSearchMovies("");
  };

  const handleOnChange = (e) => {
    setSearchMovies(e.target.value);
  };

  return (
    <>
      <header className={classes.header}>
        <form onSubmit={handleOnSubmit}>
          <TextField
            label="Search..."
            variant="standard"
            value={searchMovies}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className={classes.root}>
        {movies && 
          movies.map((movie) => <Card key={movie.id} {...movie} />)
        }
      </div>
    </>
  );
}

export default App;
