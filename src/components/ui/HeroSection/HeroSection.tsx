import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { netflixTheme } from '../../../theme/colors';
import { fetchMovieTrailer } from '../../../helpers/fetchMovieTrailer';

const useStyles = makeStyles(() => ({
  hero: {
    position: 'relative',
    width: '100%',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      height: '55vh',
    },
    '@media (max-height: 700px)': {
      height: '60vh',
    },
    '@media (min-width: 2560px)': {
      height: '75vh',
    },
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  trailerFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    border: 'none',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(to right,
      var(--bg-main) 0%,
      color-mix(in srgb, var(--bg-main) 70%, transparent) 40%,
      transparent 100%),
      linear-gradient(to top,
      var(--bg-main) 0%,
      transparent 30%,
      transparent 70%,
      color-mix(in srgb, var(--bg-main) 80%, transparent) 100%)`,
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '0 48px',
    maxWidth: '600px',
    color: netflixTheme.text.primary,
    '@media (max-width: 960px)': {
      padding: '0 24px',
      maxWidth: '450px',
    },
    '@media (min-width: 2560px)': {
      padding: '0 72px',
      maxWidth: '900px',
    },
    '@media (min-width: 3840px)': {
      padding: '0 96px',
      maxWidth: '1200px',
    },
  },
  title: {
    fontSize: '60px',
    fontWeight: 700,
    marginBottom: '16px',
    lineHeight: 1.1,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    '@media (max-width: 960px)': {
      fontSize: '36px',
      marginBottom: '10px',
    },
    '@media (min-width: 2560px)': {
      fontSize: '80px',
    },
    '@media (min-width: 3840px)': {
      fontSize: '110px',
    },
  },
  metadata: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    fontSize: '16px',
    fontWeight: 500,
    '@media (min-width: 2560px)': {
      fontSize: '22px',
      gap: '16px',
      marginBottom: '20px',
    },
    '@media (min-width: 3840px)': {
      fontSize: '28px',
      gap: '20px',
      marginBottom: '28px',
    },
  },
  rating: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#46D369',
  },
  year: {
    color: netflixTheme.text.secondary,
  },
  overview: {
    fontSize: '18px',
    lineHeight: 1.5,
    marginBottom: '24px',
    color: netflixTheme.text.secondary,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    '@media (max-width: 960px)': {
      fontSize: '14px',
      marginBottom: '16px',
      WebkitLineClamp: 2,
    },
    '@media (min-width: 2560px)': {
      fontSize: '24px',
      marginBottom: '32px',
    },
    '@media (min-width: 3840px)': {
      fontSize: '32px',
      marginBottom: '40px',
    },
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    '@media (max-width: 960px)': {
      gap: '10px',
    },
  },
  button: {
    padding: '12px 32px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '@media (max-width: 960px)': {
      padding: '8px 20px',
      fontSize: '13px',
    },
    '@media (min-width: 2560px)': {
      padding: '16px 44px',
      fontSize: '22px',
      gap: '12px',
      borderRadius: '6px',
    },
    '@media (min-width: 3840px)': {
      padding: '22px 56px',
      fontSize: '28px',
      gap: '16px',
      borderRadius: '8px',
    },
  },
  playButton: {
    background: netflixTheme.text.primary,
    color: netflixTheme.background.main,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9)',
    },
  },
  infoButton: {
    background: 'rgba(109, 109, 110, 0.7)',
    color: netflixTheme.text.primary,
    '&:hover': {
      background: 'rgba(109, 109, 110, 0.5)',
    },
  },
  playIcon: {
    width: '0',
    height: '0',
    borderLeft: '12px solid currentColor',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
  },
}));

interface Movie {
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

interface HeroSectionProps {
  movie: Movie | null;
  onMoreInfo?: (movie: Movie) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie, onMoreInfo }) => {
  const classes = useStyles();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setTrailerKey(null);
    setShowTrailer(false);
    setIsPaused(false);
    playerRef.current = null;
    if (movie?.id) {
      fetchMovieTrailer(movie.id).then((key: string | null) => setTrailerKey(key));
    }
  }, [movie?.id]);

  // Load YouTube IFrame API once
  useEffect(() => {
    if ((window as any).YT) return;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }, []);

  const onIframeReady = useCallback(() => {
    if (!iframeRef.current || playerRef.current) return;
    const check = () => {
      if ((window as any).YT?.Player) {
        playerRef.current = new (window as any).YT.Player(iframeRef.current, {
          events: {},
        });
      } else {
        setTimeout(check, 200);
      }
    };
    check();
  }, []);

  useEffect(() => {
    if (showTrailer && trailerKey) {
      const timer = setTimeout(onIframeReady, 500);
      return () => clearTimeout(timer);
    } else {
      playerRef.current = null;
      setIsPaused(false);
    }
  }, [showTrailer, trailerKey, onIframeReady]);

  if (!movie) {
    return null;
  }

  const title = movie.title || movie.name || 'Unknown Title';
  const overview = movie.overview || 'No description available.';
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
    ? new Date(movie.first_air_date).getFullYear()
    : '';

  const handlePlay = () => {
    if (trailerKey) {
      setShowTrailer(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (playerRef.current?.pauseVideo) {
      playerRef.current.pauseVideo();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (playerRef.current?.playVideo) {
      playerRef.current.playVideo();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    setShowTrailer(false);
    setIsPaused(false);
    playerRef.current = null;
  };

  return (
    <div className={classes.hero}>
      {showTrailer && trailerKey ? (
        <iframe
          ref={iframeRef}
          className={classes.trailerFrame}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&controls=0&showinfo=0&enablejsapi=1`}
          title={`${title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        backdropUrl && (
          <img
            src={backdropUrl}
            alt={title}
            className={classes.backdrop}
          />
        )
      )}
      <div className={classes.gradientOverlay} />
      <div className={classes.content}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.metadata}>
          <span className={classes.rating}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {rating}
          </span>
          {year && <span className={classes.year}>{year}</span>}
        </div>
        <p className={classes.overview}>{overview}</p>
        <div className={classes.buttons}>
          {showTrailer ? (
            <>
              {isPaused ? (
                <button
                  className={`${classes.button} ${classes.playButton}`}
                  onClick={handleResume}
                >
                  <div className={classes.playIcon} />
                  Resume
                </button>
              ) : (
                <button
                  className={`${classes.button} ${classes.playButton}`}
                  onClick={handlePause}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  Pause
                </button>
              )}
              <button
                className={`${classes.button} ${classes.infoButton}`}
                onClick={handleStop}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h12v12H6z" />
                </svg>
                Stop
              </button>
            </>
          ) : (
            <button
              className={`${classes.button} ${classes.playButton}`}
              onClick={handlePlay}
              disabled={!trailerKey}
              style={!trailerKey ? { opacity: 0.5, cursor: 'default' } : {}}
            >
              <div className={classes.playIcon} />
              {trailerKey ? 'Play Trailer' : 'No Trailer'}
            </button>
          )}
          <button
            className={`${classes.button} ${classes.infoButton}`}
            onClick={() => movie && onMoreInfo && onMoreInfo(movie)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
