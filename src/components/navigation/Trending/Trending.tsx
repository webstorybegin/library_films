import { useState, useEffect } from "react";
import { MovieCard, Spinner } from "components";
import { Pagination } from "../../ui/Pagination/Pagination";
import { fetchTrendingMovies } from "../../../helpers/fetchTrendingMovies";
import { fetchPopularMovies } from "../../../helpers/fetchPopularMovies";
import { fetchTopRated } from "../../../helpers/fetchTopRated";
import { netflixTheme } from "../../../theme/colors";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  trending: {
    position: "relative",
    paddingTop: "24px",
    minHeight: "100vh",
  },
  header: {
    padding: "48px 48px 24px",
    '@media (max-width: 960px)': {
      padding: "32px 24px 16px",
    },
    '@media (min-width: 2560px)': {
      padding: "64px 72px 32px",
    },
    '@media (min-width: 3840px)': {
      padding: "80px 96px 40px",
    },
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    color: netflixTheme.text.primary,
    marginBottom: 8,
    '@media (max-width: 960px)': {
      fontSize: 32,
    },
    '@media (min-width: 2560px)': {
      fontSize: 64,
    },
    '@media (min-width: 3840px)': {
      fontSize: 84,
    },
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
    color: netflixTheme.text.secondary,
    marginBottom: 24,
    '@media (max-width: 960px)': {
      fontSize: 14,
      marginBottom: 16,
    },
    '@media (min-width: 2560px)': {
      fontSize: 24,
      marginBottom: 32,
    },
    '@media (min-width: 3840px)': {
      fontSize: 32,
      marginBottom: 40,
    },
  },
  tabs: {
    display: "flex",
    gap: "8px",
    padding: "0 48px 24px",
    flexWrap: "wrap",
    '@media (max-width: 960px)': {
      padding: "0 24px 16px",
      gap: "6px",
    },
    '@media (min-width: 2560px)': {
      padding: "0 72px 32px",
      gap: "12px",
    },
    '@media (min-width: 3840px)': {
      padding: "0 96px 40px",
      gap: "16px",
    },
  },
  tab: {
    padding: "10px 24px",
    borderRadius: "4px",
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: netflixTheme.background.card,
    color: netflixTheme.text.secondary,
    "&:hover": {
      backgroundColor: "var(--card-hover)",
    },
    '@media (max-width: 960px)': {
      padding: "8px 16px",
      fontSize: 12,
    },
    '@media (min-width: 2560px)': {
      padding: "14px 32px",
      fontSize: 18,
    },
    '@media (min-width: 3840px)': {
      padding: "18px 40px",
      fontSize: 24,
    },
  },
  tabActive: {
    backgroundColor: netflixTheme.accent,
    color: "#fff",
    "&:hover": {
      backgroundColor: netflixTheme.accent,
    },
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
});

const CATEGORIES = [
  { key: "today", label: "Trending Today" },
  { key: "week", label: "Trending This Week" },
  { key: "popular", label: "Popular" },
  { key: "topRated", label: "Top Rated" },
];

interface TrendingProps {
  darkTheme?: boolean;
  onMovieClick?: (movie: any) => void;
}

export const Trending = ({ darkTheme, onMovieClick }: TrendingProps) => {
  const [activeTab, setActiveTab] = useState("today");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const classes = useStyles();

  const loadData = async (category: string, page: number) => {
    try {
      setLoading(true);
      let data;
      switch (category) {
        case "today":
          data = await fetchTrendingMovies("day", page);
          break;
        case "week":
          data = await fetchTrendingMovies("week", page);
          break;
        case "popular":
          data = await fetchPopularMovies(page);
          break;
        case "topRated":
          data = await fetchTopRated(page);
          break;
        default:
          data = { results: [], totalPages: 0 };
      }
      setMovies(data.results || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Error loading trending data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab, currentPage);
  }, [activeTab, currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={classes.trending}>
      <div className={classes.header}>
        <h1 className={classes.title}>Trending</h1>
        <p className={classes.subtitle}>
          Discover what's popular and trending right now
        </p>
      </div>
      <div className={classes.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`${classes.tab} ${activeTab === cat.key ? classes.tabActive : ""}`}
            onClick={() => handleTabChange(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div className={classes.loadingContainer}>
          <Spinner theme={darkTheme} />
        </div>
      ) : (
        <>
          <div className={classes.grid}>
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} darkTheme={darkTheme} onClick={onMovieClick} {...movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
