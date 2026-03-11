import { useState, useEffect } from "react";
import { MovieCard, Spinner } from "components";
import { Pagination } from "../../ui/Pagination/Pagination";
import { fetchUpcoming } from "../../../helpers/fetchUpcoming";
import { netflixTheme } from "../../../theme/colors";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  coming: {
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
    '@media (max-width: 960px)': {
      fontSize: 14,
    },
    '@media (min-width: 2560px)': {
      fontSize: 24,
    },
    '@media (min-width: 3840px)': {
      fontSize: 32,
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
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 48px",
    color: netflixTheme.text.secondary,
    fontSize: 18,
  },
});

interface ComingProps {
  darkTheme?: boolean;
  onMovieClick?: (movie: any) => void;
}

export const Coming = ({ darkTheme, onMovieClick }: ComingProps) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const classes = useStyles();

  const loadData = async (page: number) => {
    try {
      setLoading(true);
      const data = await fetchUpcoming(page);
      const { results, totalPages: tp } = data;
      const sorted = results.sort((a: any, b: any) => {
        const dateA = new Date(a.release_date || 0).getTime();
        const dateB = new Date(b.release_date || 0).getTime();
        return dateB - dateA;
      });
      setUpcomingMovies(sorted);
      setTotalPages(tp);
    } catch (error) {
      console.error("Error loading upcoming movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner theme={darkTheme} />
      </div>
    );
  }

  return (
    <div className={classes.coming}>
      <div className={classes.header}>
        <h1 className={classes.title}>Coming Soon</h1>
        <p className={classes.subtitle}>
          Get ready for these upcoming releases
        </p>
      </div>
      {upcomingMovies.length > 0 ? (
        <>
          <div className={classes.grid}>
            {upcomingMovies.map((movie: any) => (
              <MovieCard key={movie.id} darkTheme={darkTheme} onClick={onMovieClick} {...movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className={classes.emptyState}>
          No upcoming movies available at the moment
        </div>
      )}
    </div>
  );
};
