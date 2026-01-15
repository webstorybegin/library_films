// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
import { useEffect, useState } from "react";
import { searchMovies } from "../../../hooks/searchMovies";

const useStyles = makeStyles({
  search: {
    position: "absolute",
    top: 50,
    left: "47%",
    width: 300,
    height: 40,
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
    border: "1px solid #21201E",
    color: "#21201E",
    backgroundColor: "#e9e9e9",
  },
  searchSecond: {
    position: "absolute",
    top: 150,
    left: "47%",
  },
  searchLight: {
    backgroundColor: "#e9e9e9",
  },
  searchDark: {
    backgroundColor: "#21201E",
    color: "#e9e9e9",
    border: "1px solid #e9e9e9",
  },
});

export const SearchField = ({
  type,
  onResults,
  darkTheme,
  variant = "",
}: {
  type: {};
  onResults: (data: any[]) => void;
  darkTheme?: boolean;
  variant?: string;
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      onResults([]);
      return;
    }
    const debounceTimer = setTimeout(async () => {
      try {
        const data = await searchMovies(query, type);
        onResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, type, onResults]);

  return (
    <input
      className={cn(
        classes.search,
        darkTheme ? classes.searchDark : classes.searchLight,
        variant ? classes.searchSecond : ""
      )}
      name="search"
      type="text"
      value={query}
      placeholder={`Search by ${type}`}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
