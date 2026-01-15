import { useCallback, useState } from "react";
import { MovieCard, SearchField } from "components";
import { SEARCH_TYPES } from "../../../constants";

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

export const Home = ({ darkTheme }: { darkTheme?: boolean }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [showSecondSearch, setShowSecondSearch] = useState(false);
  const handleResults = useCallback((data: any[]) => {
    setSearchResult(data);
  }, []);
  const classes = useStyles();

  return (
    <>
      <button onClick={() => setShowSecondSearch(true)}>
        Added field search
      </button>
      <SearchField
        type={SEARCH_TYPES.TITLE}
        onResults={handleResults}
        darkTheme={darkTheme}
      />
      {showSecondSearch && (
        <SearchField
          type={SEARCH_TYPES.GENRE}
          onResults={handleResults}
          darkTheme={darkTheme}
          variant="second"
        />
      )}
      <div className={classes.containerMovies}>
        {searchResult.map((res) => (
          <MovieCard key={res.id} darkTheme={darkTheme} {...res} />
        ))}
      </div>
    </>
  );
};
