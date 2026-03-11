import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { netflixTheme } from '../../../theme/colors';
import { useFavorites } from '../../../hooks/useFavorites';
import { fetchMovieTrailer } from '../../../helpers/fetchMovieTrailer';

const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--bg-overlay)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    '@media (max-width: 960px)': {
      padding: '12px',
    },
  },
  modal: {
    backgroundColor: netflixTheme.background.card,
    borderRadius: '8px',
    maxWidth: '850px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    '@media (max-width: 960px)': {
      maxWidth: '100%',
    },
    '@media (min-width: 2560px)': {
      maxWidth: '1200px',
      borderRadius: '12px',
    },
    '@media (min-width: 3840px)': {
      maxWidth: '1600px',
      borderRadius: '16px',
    },
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: netflixTheme.background.main,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2a2a2a',
    },
    '& svg': {
      width: '20px',
      height: '20px',
      fill: netflixTheme.text.primary,
    },
    '@media (min-width: 2560px)': {
      width: '48px',
      height: '48px',
      top: '20px',
      right: '20px',
      '& svg': {
        width: '28px',
        height: '28px',
      },
    },
    '@media (min-width: 3840px)': {
      width: '60px',
      height: '60px',
      top: '24px',
      right: '24px',
      '& svg': {
        width: '36px',
        height: '36px',
      },
    },
  },
  backdrop: {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
    '@media (max-width: 960px)': {
      height: '250px',
    },
    '@media (max-height: 700px)': {
      height: '200px',
    },
    '@media (min-width: 2560px)': {
      height: '600px',
    },
    '@media (min-width: 3840px)': {
      height: '800px',
    },
  },
  trailerContainer: {
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '8px 8px 0 0',
    overflow: 'hidden',
    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  },
  content: {
    padding: '32px',
    '@media (max-width: 960px)': {
      padding: '20px',
    },
    '@media (min-width: 2560px)': {
      padding: '44px',
    },
    '@media (min-width: 3840px)': {
      padding: '56px',
    },
  },
  header: {
    marginBottom: '24px',
    '@media (max-width: 960px)': {
      marginBottom: '16px',
    },
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: netflixTheme.text.primary,
    '@media (max-width: 960px)': {
      fontSize: '24px',
    },
    '@media (min-width: 2560px)': {
      fontSize: '44px',
    },
    '@media (min-width: 3840px)': {
      fontSize: '56px',
    },
    marginBottom: '12px',
    lineHeight: 1.2,
  },
  metadata: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '16px',
    color: netflixTheme.text.secondary,
    marginBottom: '16px',
    '@media (min-width: 2560px)': {
      fontSize: '22px',
      gap: '20px',
    },
    '@media (min-width: 3840px)': {
      fontSize: '28px',
      gap: '24px',
    },
  },
  matchScore: {
    color: '#46D369',
    fontWeight: 600,
  },
  rating: {
    padding: '2px 6px',
    border: `1px solid ${netflixTheme.text.secondary}`,
    borderRadius: '2px',
    fontSize: '14px',
  },
  overview: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: netflixTheme.text.primary,
    marginBottom: '24px',
    '@media (min-width: 2560px)': {
      fontSize: '22px',
    },
    '@media (min-width: 3840px)': {
      fontSize: '28px',
    },
  },
  details: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    fontSize: '14px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    color: netflixTheme.text.secondary,
    fontWeight: 600,
  },
  detailValue: {
    color: netflixTheme.text.primary,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  actionButton: {
    padding: '12px 24px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    '& svg': {
      width: '20px',
      height: '20px',
    },
    '@media (min-width: 2560px)': {
      padding: '16px 32px',
      fontSize: '22px',
      gap: '12px',
      '& svg': {
        width: '28px',
        height: '28px',
      },
    },
    '@media (min-width: 3840px)': {
      padding: '20px 40px',
      fontSize: '28px',
      gap: '16px',
      '& svg': {
        width: '36px',
        height: '36px',
      },
    },
  },
  primaryButton: {
    backgroundColor: netflixTheme.text.primary,
    color: netflixTheme.background.main,
    '&:hover': {
      backgroundColor: '#d0d0d0',
    },
  },
  secondaryButton: {
    backgroundColor: 'var(--card-hover)',
    color: 'var(--text-primary)',
    '&:hover': {
      opacity: 0.8,
    },
  },
  trailerButton: {
    backgroundColor: netflixTheme.accent,
    color: '#fff',
    '&:hover': {
      opacity: 0.85,
    },
  },
  voteAverage: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '14px',
    color: '#fff',
  },
});

interface MovieModalProps {
  movie: {
    id?: number;
    title?: string;
    name?: string;
    overview?: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    original_language?: string;
    genres?: { id: number; name: string }[];
  } | null;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const classes = useStyles();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    setTrailerKey(null);
    setShowTrailer(false);
    if (movie?.id) {
      fetchMovieTrailer(movie.id).then((key: string | null) => setTrailerKey(key));
    }
  }, [movie?.id]);

  if (!movie) return null;
  const IMG_URL = 'https://image.tmdb.org/t/p/original';

  const backdropUrl = movie.backdrop_path || movie.poster_path;
  const title = movie.title || movie.name || 'Unknown';
  const releaseDate = movie.release_date || movie.first_air_date || '';
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const matchScore = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;
  const rating = movie.vote_average || 0;
  const isInFavorites = movie.id ? isFavorite(movie.id) : false;

  const getVoteStyle = () => {
    switch (true) {
      case rating <= 4:
        return { background: '#E53935' };
      case rating <= 7:
        return { background: '#757575' };
      default:
        return { background: '#43A047' };
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFavoriteClick = () => {
    if (movie.id) {
      toggleFavorite({
        id: movie.id,
        title: movie.title,
        name: movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date || movie.first_air_date,
        original_language: movie.original_language,
      });
    }
  };

  const handlePlayTrailer = () => {
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {showTrailer && trailerKey ? (
          <div className={classes.trailerContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          backdropUrl && (
            <img
              src={IMG_URL + backdropUrl}
              alt={title}
              className={classes.backdrop}
            />
          )
        )}

        <div className={classes.content}>
          <div className={classes.header}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.metadata}>
              <span className={classes.matchScore}>{matchScore}% Match</span>
              {year && <span>{year}</span>}
              {rating > 0 && (
                <span className={classes.voteAverage} style={getVoteStyle()}>
                  {rating.toFixed(1)} / 10
                </span>
              )}
              {movie.original_language && (
                <span className={classes.rating}>
                  {movie.original_language.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className={classes.actions}>
            {trailerKey && !showTrailer && (
              <button
                className={`${classes.actionButton} ${classes.trailerButton}`}
                onClick={handlePlayTrailer}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </button>
            )}
            {showTrailer && (
              <button
                className={`${classes.actionButton} ${classes.secondaryButton}`}
                onClick={() => setShowTrailer(false)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                Close Trailer
              </button>
            )}
            <button
              className={`${classes.actionButton} ${classes.secondaryButton}`}
              onClick={handleFavoriteClick}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                {isInFavorites ? (
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                ) : (
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                )}
              </svg>
              {isInFavorites ? 'Remove from My List' : 'Add to My List'}
            </button>
          </div>

          {movie.overview && (
            <p className={classes.overview}>
              {movie.overview}
            </p>
          )}

          <div className={classes.details}>
            {releaseDate && (
              <div className={classes.detailItem}>
                <span className={classes.detailLabel}>Release Date:</span>
                <span className={classes.detailValue}>{releaseDate}</span>
              </div>
            )}
            {movie.original_language && (
              <div className={classes.detailItem}>
                <span className={classes.detailLabel}>Language:</span>
                <span className={classes.detailValue}>
                  {movie.original_language.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
