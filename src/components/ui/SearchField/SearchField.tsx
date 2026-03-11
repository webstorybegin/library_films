import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
import { useState, useEffect, useRef } from "react";

const useStyles = makeStyles({
  search: {
    flex: 1,
    maxWidth: 400,
    height: 48,
    padding: "12px 20px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid",
    transition: "all 0.2s ease",
    fontWeight: 400,
    letterSpacing: "0.01em",
    fontFamily: "'Roboto', sans-serif",
    "&:focus": {
      outline: "none",
      borderWidth: "2px",
    },
    "&::placeholder": {
      opacity: 0.5,
    },
  },
  searchSecond: {
    position: "absolute",
    top: 120,
    left: "47%",
    flex: "none",
    width: 320,
  },
  searchLight: {
    backgroundColor: "#FFFFFF",
    color: "#212121",
    borderColor: "#E0E0E0",
    "&:focus": {
      borderColor: "#0AA3E4",
    },
  },
  searchDark: {
    backgroundColor: "#2D2C2A",
    color: "#FFFFFF",
    borderColor: "#424242",
    "&:focus": {
      borderColor: "#0AA3E4",
    },
  },
});

export const SearchField = ({
  type,
  onResults,
  darkTheme,
  variant = "",
}: {
  type: {};
  onResults: (data: any[], query?: string) => void;
  darkTheme?: boolean;
  variant?: string;
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim() === "") {
      onResults([], "");
      return;
    }

    debounceRef.current = setTimeout(() => {
      onResults([], query);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, type]);

  useEffect(() => {
    setQuery("");
  }, [type]);

  const getPlaceholder = () => {
    switch (type) {
      case "title":
        return "Search by title (e.g., Avatar, Inception)";
      case "genre":
        return "Search by genre ID (e.g., 28 for Action, 35 for Comedy)";
      case "year":
        return "Search by year (e.g., 2023, 2024)";
      default:
        return `Search by ${type}`;
    }
  };

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
      placeholder={getPlaceholder()}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
