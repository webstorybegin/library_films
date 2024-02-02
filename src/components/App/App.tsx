import { useState, useEffect } from "react";

import { SwitchSelect } from "components/ui/SwitchSelect/SwitchSelect";
import { Movie } from "components/Movie/Movie";
import { fetchMovies } from "components/hooks/fetchMovies";

import { makeStyles } from "@material-ui/styles";
import { TextField } from "@mui/material";

const useStyles = makeStyles({
  container: {
    width: "100%",
    minHeight: "100vh",
    margin: "0 auto",
  },
  containerMovies: {
    maxWidth: 1500,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px 0",
  },
  search: {
    width: 300,
    fontSize: 35,
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies(searchMovies);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchMovies]);

  const classes = useStyles();

  return (
    <div
      style={
        theme === false ? { background: "#a7a7a7" } : { background: "#000" }
      }
      className={classes.container}
    >
      <header className={classes.header}>
        <TextField
          style={theme === true ? { background: "#333" } : null}
          label="Search..."
          variant="filled"
          value={searchMovies}
          onChange={(e) => {
            setSearchMovies(e.target.value);
          }}
          className={classes.search}
        />
        <SwitchSelect theme={theme} setTheme={setTheme} />
      </header>
      <div className={classes.containerMovies}>
        {Array.isArray(movies) &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
