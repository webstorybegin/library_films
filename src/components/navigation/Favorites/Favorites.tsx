import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "components";
import { Pagination } from "../../ui/Pagination/Pagination";
import { netflixTheme } from "../../../theme/colors";
import { useFavorites } from "../../../hooks/useFavorites";

import { makeStyles } from "@material-ui/styles";

const ITEMS_PER_PAGE = 20;

const useStyles = makeStyles({
  favorites: {
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
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 48px",
    textAlign: "center",
    '@media (max-width: 960px)': {
      padding: "40px 24px",
    },
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: "var(--bg-card)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "var(--accent)",
      color: "#fff",
      transform: "scale(1.1)",
    },
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: netflixTheme.text.primary,
    marginBottom: 12,
    '@media (min-width: 2560px)': {
      fontSize: 32,
    },
    '@media (min-width: 3840px)': {
      fontSize: 44,
    },
  },
  emptyText: {
    fontSize: 16,
    color: netflixTheme.text.secondary,
    maxWidth: 400,
    '@media (min-width: 2560px)': {
      fontSize: 22,
      maxWidth: 560,
    },
    '@media (min-width: 3840px)': {
      fontSize: 28,
      maxWidth: 700,
    },
  },
});

interface FavoritesProps {
  darkTheme?: boolean;
  onMovieClick?: (movie: any) => void;
}

export const Favorites = ({ darkTheme, onMovieClick }: FavoritesProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFavorites = favorites.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleRemove = (movieId: number) => {
    const movie = favorites.find((m: any) => m.id === movieId);
    if (movie) {
      toggleFavorite(movie);
    }
    // If current page becomes empty after removal, go back one page
    const remaining = favorites.length - 1;
    const maxPage = Math.ceil(remaining / ITEMS_PER_PAGE);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={classes.favorites}>
      <div className={classes.header}>
        <h1 className={classes.title}>My List</h1>
        <p className={classes.subtitle}>
          {favorites.length > 0
            ? `${favorites.length} ${favorites.length === 1 ? "title" : "titles"} in your list`
            : "Your favorite movies and shows"}
        </p>
      </div>
      {favorites.length > 0 ? (
        <>
          <div className={classes.grid}>
            {paginatedFavorites.map((movie) => (
              <MovieCard key={movie.id} darkTheme={darkTheme} onClick={onMovieClick} showRemove onRemove={handleRemove} {...movie} />
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
          <div className={classes.emptyIcon} onClick={() => navigate("/home")} title="Browse movies">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
          <h2 className={classes.emptyTitle}>Your list is empty</h2>
          <p className={classes.emptyText}>
            Click "+" to browse movies and add them to your list.
          </p>
        </div>
      )}
    </div>
  );
};
