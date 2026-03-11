import { useState, useEffect } from "react";
import { HeroSection } from "../../ui/HeroSection/HeroSection";
import { ContentRow } from "../../ui/ContentRow/ContentRow";
import { Spinner } from "components";
import { fetchFeaturedMovie } from "../../../helpers/fetchFeaturedMovie";
import { fetchTrendingMovies } from "../../../helpers/fetchTrendingMovies";
import { fetchPopularMovies } from "../../../helpers/fetchPopularMovies";
import { fetchTopRated } from "../../../helpers/fetchTopRated";
import { fetchUpcoming } from "../../../helpers/fetchUpcoming";
import { fetchByGenre, GENRES } from "../../../helpers/fetchByGenre";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  home: {
    position: "relative",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
});

export const Home = ({ darkTheme, onMovieClick }: { darkTheme?: boolean; onMovieClick?: (movie: any) => void }) => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          featured,
          trending,
          popular,
          topRated,
          upcoming,
          action,
          comedy,
        ] = await Promise.all([
          fetchFeaturedMovie(),
          fetchTrendingMovies("week"),
          fetchPopularMovies(),
          fetchTopRated(),
          fetchUpcoming(),
          fetchByGenre(GENRES.ACTION),
          fetchByGenre(GENRES.COMEDY),
        ]);

        setFeaturedMovie(featured);
        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
        setActionMovies(action);
        setComedyMovies(comedy);
      } catch (error) {
        console.error("Error loading home page data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner theme={darkTheme} />
      </div>
    );
  }

  return (
    <div className={classes.home}>
      <HeroSection movie={featuredMovie} onMoreInfo={onMovieClick} />
      <ContentRow title="Trending Now" movies={trendingMovies} darkTheme={darkTheme} onMovieClick={onMovieClick} />
      <ContentRow title="Popular on Netflix" movies={popularMovies} darkTheme={darkTheme} onMovieClick={onMovieClick} />
      <ContentRow title="Top Rated" movies={topRatedMovies} darkTheme={darkTheme} onMovieClick={onMovieClick} />
      <ContentRow title="Coming Soon" movies={upcomingMovies} darkTheme={darkTheme} onMovieClick={onMovieClick} />
      <ContentRow title="Action Movies" movies={actionMovies} darkTheme={darkTheme} onMovieClick={onMovieClick} />
      <ContentRow title="Comedy Movies" movies={comedyMovies} darkTheme={darkTheme} onMovieClick={onMovieClick} />
    </div>
  );
};
