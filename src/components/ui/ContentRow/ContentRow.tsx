import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MovieCard } from "../MovieCard/MovieCard";
import { netflixTheme } from "../../../theme/colors";

const useStyles = makeStyles(() => ({
  row: {
    padding: "0 48px",
    marginBottom: "48px",
    '@media (max-width: 960px)': {
      padding: "0 24px",
      marginBottom: "32px",
    },
    '@media (min-width: 2560px)': {
      padding: "0 72px",
      marginBottom: "64px",
    },
    '@media (min-width: 3840px)': {
      padding: "0 96px",
      marginBottom: "80px",
    },
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: netflixTheme.text.primary,
    marginBottom: "16px",
    '@media (max-width: 960px)': {
      fontSize: "16px",
      marginBottom: "12px",
    },
    '@media (min-width: 2560px)': {
      fontSize: "28px",
      marginBottom: "20px",
    },
    '@media (min-width: 3840px)': {
      fontSize: "36px",
      marginBottom: "28px",
    },
  },
  carouselContainer: {
    position: "relative",
    "&:hover $navButton": {
      opacity: 1,
    },
  },
  carousel: {
    display: "flex",
    gap: "8px",
    overflowX: "scroll",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    '@media (min-width: 2560px)': {
      gap: "12px",
    },
    '@media (min-width: 3840px)': {
      gap: "16px",
    },
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "100%",
    background: "var(--bg-overlay)",
    border: "none",
    color: netflixTheme.text.primary,
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.3s ease, background 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    "&:hover": {
      background: "var(--bg-card)",
    },
    "& svg": {
      width: "32px",
      height: "32px",
    },
    '@media (min-width: 2560px)': {
      width: "52px",
      "& svg": {
        width: "44px",
        height: "44px",
      },
    },
    '@media (min-width: 3840px)': {
      width: "68px",
      "& svg": {
        width: "56px",
        height: "56px",
      },
    },
  },
  navButtonLeft: {
    left: 0,
  },
  navButtonRight: {
    right: 0,
  },
}));

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  original_language?: string;
}

interface ContentRowProps {
  title: string;
  movies: Movie[];
  darkTheme?: boolean;
  onMovieClick?: (movie: Movie) => void;
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  movies,
  darkTheme = true,
  onMovieClick,
}) => {
  const classes = useStyles();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className={classes.row}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.carouselContainer}>
        <button
          className={`${classes.navButton} ${classes.navButtonLeft}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div className={classes.carousel} ref={carouselRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name || "Unknown"}
              name={movie.name || movie.title || ""}
              release_date={movie.release_date || movie.first_air_date || ""}
              poster_path={movie.poster_path}
              backdrop_path={movie.backdrop_path}
              overview={movie.overview || ""}
              vote_average={movie.vote_average || 0}
              original_language={movie.original_language || "en"}
              darkTheme={darkTheme}
              horizontal={true}
              onClick={() => onMovieClick && onMovieClick(movie)}
            />
          ))}
        </div>

        <button
          className={`${classes.navButton} ${classes.navButtonRight}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

