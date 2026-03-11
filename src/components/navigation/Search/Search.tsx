import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "components";
import { Pagination } from "../../ui/Pagination/Pagination";
import { netflixTheme } from "../../../theme/colors";
import { SEARCH_TYPES } from "../../../constants";
import { searchMovies } from "../../../hooks/searchMovies";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  search: {
    position: "relative",
    paddingTop: "24px",
    minHeight: "100vh",
  },
  resultsInfo: {
    padding: "24px 48px 16px",
    fontSize: 16,
    color: netflixTheme.text.secondary,
    '@media (max-width: 960px)': {
      padding: "16px 24px 12px",
      fontSize: 14,
    },
    '@media (min-width: 2560px)': {
      padding: "32px 72px 20px",
      fontSize: 22,
    },
    '@media (min-width: 3840px)': {
      padding: "40px 96px 24px",
      fontSize: 28,
    },
  },
  resultsQuery: {
    color: netflixTheme.text.primary,
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    padding: "0 48px",
    '@media (max-width: 960px)': {
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px",
      padding: "0 24px",
    },
    '@media (min-width: 2560px)': {
      gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
      gap: "36px",
      padding: "0 72px",
    },
    '@media (min-width: 3840px)': {
      gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))",
      gap: "48px",
      padding: "0 96px",
    },
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "120px 48px",
    textAlign: "center",
    '@media (max-width: 960px)': {
      padding: "80px 24px",
    },
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 24,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: netflixTheme.text.primary,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: netflixTheme.text.secondary,
    maxWidth: 400,
  },
});

interface SearchProps {
  darkTheme?: boolean;
  onMovieClick?: (movie: any) => void;
}

export const Search = ({ darkTheme, onMovieClick }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState(SEARCH_TYPES.TITLE);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");
  const [processedKey, setProcessedKey] = useState("");

  const classes = useStyles();

  const performSearch = useCallback(
    async (query: string, type: string, page: number) => {
      if (query.trim() === "") {
        setResults([]);
        setTotalPages(0);
        setHasSearched(false);
        return;
      }
      try {
        const data = await searchMovies(query, type, page);
        setResults(data.results || []);
        setTotalPages(data.totalPages || 0);
        setHasSearched(true);
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  // Pick up query from URL (from nav bar search)
  useEffect(() => {
    const q = searchParams.get("q");
    const type = searchParams.get("type") || SEARCH_TYPES.TITLE;
    const key = `${q}|${type}`;
    if (q && key !== processedKey) {
      setProcessedKey(key);
      setCurrentQuery(q);
      setSearchType(type);
      setCurrentPage(1);
      setSearchParams({}, { replace: true });
      performSearch(q, type, 1);
    }
  }, [searchParams, setSearchParams, processedKey, performSearch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    performSearch(currentQuery, searchType, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTypeLabel = () => {
    switch (searchType) {
      case SEARCH_TYPES.GENRE: return "genre";
      case SEARCH_TYPES.YEAR: return "year";
      default: return "title";
    }
  };

  const renderContent = () => {
    if (!hasSearched) {
      return (
        <div className={classes.emptyState}>
          <div className={classes.emptyIcon}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <h2 className={classes.emptyTitle}>Search for movies</h2>
          <p className={classes.emptyText}>
            Use the search bar in the navigation to find movies by title, genre, or year.
          </p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className={classes.emptyState}>
          <div className={classes.emptyIcon}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <h2 className={classes.emptyTitle}>No movies found</h2>
          <p className={classes.emptyText}>
            No results for "{currentQuery}". Try a different search term.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className={classes.resultsInfo}>
          {results.length} {results.length === 1 ? "result" : "results"} for{" "}
          <span className={classes.resultsQuery}>"{currentQuery}"</span> by {getTypeLabel()}
        </div>
        <div className={classes.grid}>
          {results.map((movie) => (
            <MovieCard key={movie.id} darkTheme={darkTheme} onClick={onMovieClick} {...movie} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className={classes.search}>
      {renderContent()}
    </div>
  );
};
