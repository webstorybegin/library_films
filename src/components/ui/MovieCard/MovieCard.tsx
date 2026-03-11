// Import Components
import { Image } from "components";
// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
import { netflixTheme } from "../../../theme/colors";
import { useFavorites } from "../../../hooks/useFavorites";

const useStyles = makeStyles({
  card: {
    fontFamily: "'Roboto', sans-serif",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s ease, z-index 0s 0.3s",
    zIndex: 1,
    flexShrink: 0,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 4,
    },
  },
  cardGrid: {
    width: 250,
    height: 320,
    marginRight: 48,
    marginBottom: 64,
    "&:hover": {
      transform: "translateY(-4px)",
      zIndex: 10,
    },
    "@media (max-width: 960px)": {
      width: 180,
      height: 240,
      marginRight: 24,
      marginBottom: 48,
    },
    "@media (min-width: 2560px)": {
      width: 350,
      height: 450,
      marginRight: 56,
      marginBottom: 80,
    },
    "@media (min-width: 3840px)": {
      width: 480,
      height: 620,
      marginRight: 64,
      marginBottom: 96,
    },
  },
  cardHorizontal: {
    width: 300,
    height: 170,
    "@media (max-width: 960px)": {
      width: 220,
      height: 125,
    },
    "@media (min-width: 2560px)": {
      width: 420,
      height: 240,
    },
    "@media (min-width: 3840px)": {
      width: 560,
      height: 315,
    },
    "&:hover": {
      transform: "scale(1.4)",
      zIndex: 100,
      transition: "transform 0.3s ease, z-index 0s 0s",
    },
    "&:hover $cardInfo": {
      opacity: 1,
    },
    "&:hover $expandedInfo": {
      opacity: 1,
    },
  },
  cardInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 4,
    "& p": {
      fontFamily: "'Roboto', sans-serif",
      position: "absolute",
    },
  },
  releaseDate: {
    position: "absolute",
    left: 8,
    top: 8,
    display: "inline-block",
    borderRadius: 4,
    padding: "4px 8px",
    background: netflixTheme.accent,
    fontSize: 12,
    fontWeight: 500,
    color: "#FFFFFF",
    letterSpacing: "0.02em",
    zIndex: 2,
    "@media (min-width: 2560px)": {
      fontSize: 16,
      padding: "6px 12px",
      left: 12,
      top: 12,
    },
    "@media (min-width: 3840px)": {
      fontSize: 20,
      padding: "8px 16px",
      left: 16,
      top: 16,
    },
  },
  language: {
    position: "absolute",
    right: 8,
    top: 8,
    display: "inline-block",
    borderRadius: 4,
    padding: "4px 8px",
    background: "rgba(0, 0, 0, 0.6)",
    fontSize: 12,
    fontWeight: 500,
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    zIndex: 2,
    "@media (min-width: 2560px)": {
      fontSize: 16,
      padding: "6px 12px",
      right: 12,
      top: 12,
    },
    "@media (min-width: 3840px)": {
      fontSize: 20,
      padding: "8px 16px",
      right: 16,
      top: 16,
    },
  },
  voteAverage: {
    position: "absolute",
    right: 8,
    bottom: 8,
    padding: "4px 8px",
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 4,
    color: "#FFFFFF",
    zIndex: 2,
    "@media (min-width: 2560px)": {
      fontSize: 18,
      padding: "6px 12px",
      right: 12,
      bottom: 12,
    },
    "@media (min-width: 3840px)": {
      fontSize: 24,
      padding: "8px 16px",
      right: 16,
      bottom: 16,
    },
  },
  title: {
    position: "absolute",
    bottom: -48,
    left: 0,
    right: 0,
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: 1.4,
    color: netflixTheme.text.primary,
    "@media (min-width: 2560px)": {
      fontSize: 22,
      bottom: -60,
    },
    "@media (min-width: 3840px)": {
      fontSize: 28,
      bottom: -72,
    },
  },
  overview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0,
    left: 0,
    top: 0,
    borderRadius: 4,
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "auto",
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: 1.5,
    padding: 16,
    transition: "opacity 0.3s ease",
    zIndex: 3,
    "& img": {
      marginTop: 16,
      height: "auto",
      borderRadius: 4,
    },
    "@media (min-width: 2560px)": {
      fontSize: 18,
      padding: 22,
    },
    "@media (min-width: 3840px)": {
      fontSize: 24,
      padding: 28,
    },
  },
  expandedInfo: {
    position: "absolute",
    bottom: -80,
    left: 0,
    right: 0,
    background: netflixTheme.background.card,
    borderRadius: "0 0 4px 4px",
    padding: "12px",
    opacity: 0,
    transition: "opacity 0.3s ease 0.3s",
    zIndex: 99,
    "@media (min-width: 2560px)": {
      bottom: -110,
      padding: "16px",
    },
    "@media (min-width: 3840px)": {
      bottom: -140,
      padding: "20px",
    },
  },
  expandedTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: netflixTheme.text.primary,
    marginBottom: 8,
    "@media (min-width: 2560px)": {
      fontSize: 20,
      marginBottom: 12,
    },
    "@media (min-width: 3840px)": {
      fontSize: 26,
      marginBottom: 16,
    },
  },
  expandedMeta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: netflixTheme.text.secondary,
    marginBottom: 8,
    "@media (min-width: 2560px)": {
      fontSize: 16,
      gap: 12,
      marginBottom: 12,
    },
    "@media (min-width: 3840px)": {
      fontSize: 20,
      gap: 16,
      marginBottom: 16,
    },
  },
  matchScore: {
    color: "#46D369",
    fontWeight: 600,
  },
  expandedActions: {
    display: "flex",
    gap: 8,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: `2px solid ${netflixTheme.text.secondary}`,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border-color 0.2s ease",
    "&:hover": {
      borderColor: netflixTheme.text.primary,
    },
    "& svg": {
      width: 14,
      height: 14,
      fill: netflixTheme.text.primary,
    },
    "@media (min-width: 2560px)": {
      width: 38,
      height: 38,
      "& svg": {
        width: 20,
        height: 20,
      },
    },
    "@media (min-width: 3840px)": {
      width: 48,
      height: 48,
      "& svg": {
        width: 26,
        height: 26,
      },
    },
  },
  actionButtonActive: {
    borderColor: netflixTheme.text.primary,
  },
  removeButton: {
    position: "absolute",
    top: -15,
    right: -15,
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: "var(--bg-card)",
    border: "2px solid var(--text-secondary)",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.2s ease, background-color 0.2s ease",
    zIndex: 10,
    "&:hover": {
      backgroundColor: "#E53935",
      borderColor: "#E53935",
      color: "#fff",
    },
    "& svg": {
      width: 14,
      height: 14,
      fill: "currentColor",
    },
  },
  cardWithRemove: {
    "&:hover $removeButton": {
      opacity: 1,
    },
  },
});

export const MovieCard = ({
  title,
  release_date: releaseDate,
  poster_path: poster,
  overview,
  backdrop_path: backdropPath,
  vote_average: average,
  darkTheme,
  original_language: language,
  name,
  horizontal = false,
  showRemove = false,
  onRemove = null,
  onClick,
  ...params
}) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const imageUrl = horizontal && backdropPath ? backdropPath : poster;

  const movieImage =
    imageUrl === null ? (
      <Image.NotFound />
    ) : (
      <img src={IMG_URL + imageUrl} alt={title || name} />
    );

  const classes = useStyles();

  const getVoteStyle = () => {
    switch (true) {
      case average <= 4:
        return { background: "#E53935" };
      case average <= 7:
        return { background: "#757575" };
      default:
        return { background: "#43A047" };
    }
  };

  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const matchScore = average ? Math.round(average * 10) : 0;

  const { toggleFavorite, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(params.id);

  const handleClick = () => {
    if (onClick) {
      onClick({
        title,
        name,
        release_date: releaseDate,
        poster_path: poster,
        backdrop_path: backdropPath,
        overview,
        vote_average: average,
        original_language: language,
        ...params,
      });
    }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(params.id);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({
      id: params.id,
      title,
      name,
      poster_path: poster,
      backdrop_path: backdropPath,
      overview,
      vote_average: average,
      release_date: releaseDate,
      original_language: language,
    });
  };

  return (
    <div
      className={cn(
        classes.card,
        horizontal ? classes.cardHorizontal : classes.cardGrid,
        showRemove && classes.cardWithRemove,
      )}
      onClick={handleClick}
    >
      {showRemove && (
        <button
          className={classes.removeButton}
          onClick={handleRemoveClick}
          title="Remove from My List"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
      {movieImage}
      <div className={classes.cardInfo}>
        {!horizontal && releaseDate && (
          <span className={classes.releaseDate}>{releaseDate}</span>
        )}
        {!horizontal && language && (
          <span className={classes.language}>{language}</span>
        )}
        {!horizontal && average && (
          <p className={classes.voteAverage} style={getVoteStyle()}>
            {average.toFixed(1)} / 10
          </p>
        )}
        {!horizontal && <p className={classes.title}>{title || name}</p>}
      </div>
      {!horizontal && (
        <div className={classes.overview}>
          {overview !== "" ? overview : "No description of the movie"}
        </div>
      )}
      {horizontal && (
        <div className={classes.expandedInfo}>
          <div className={classes.expandedTitle}>{title || name}</div>
          <div className={classes.expandedMeta}>
            <span className={classes.matchScore}>{matchScore}% Match</span>
            {year && <span>{year}</span>}
          </div>
          <div className={classes.expandedActions}>
            <button className={classes.actionButton} title="Play">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button
              className={cn(
                classes.actionButton,
                isInFavorites && classes.actionButtonActive,
              )}
              title={isInFavorites ? "Remove from My List" : "Add to My List"}
              onClick={handleFavoriteClick}
            >
              <svg viewBox="0 0 24 24">
                {isInFavorites ? (
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                ) : (
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                )}
              </svg>
            </button>
            <button className={classes.actionButton} title="Like">
              <svg viewBox="0 0 24 24">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
