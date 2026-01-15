// Import Components
import { Image } from "components";
// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
// Import components

const useStyles = makeStyles({
  card: {
    fontFamily: "Dongle",
    position: "relative",
    width: 250,
    height: 320,
    marginRight: 65,
    marginBottom: 75,
    overflowY: "visible",
    color: "rgba(255, 255, 255, 0.82)",
    transition: ".2s ease-in-out 0s",
    cursor: "pointer",
    "&::before": {
      content: "1",
      position: "absolute",
      top: 30,
      left: 40,
    },
    "&:hover > div": {
      opacity: 0.95,
    },
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 25,
    },
  },
  cardInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 25,
    border: "1px solid transparent",
    "& h1": {
      fontWeight: 500,
      fontSize: 30,
      marginRight: 5,
      top: 0,
    },
    "& p": {
      fontFamily: "Quicksand",
      position: "absolute",
    },
  },
  cardInfoDark: {
    border: "1px solid #e9e9e9",
  },
  releaseDate: {
    position: "absolute",
    left: 7,
    top: 7,
    display: "inline-block",
    borderRadius: 15,
    padding: 7,
    background: "#0AA3E4",
    boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.56)",
    fontSize: 20,
  },
  language: {
    position: "absolute",
    right: 7,
    top: 7,
    display: "inline-block",
    borderRadius: 10,
    padding: "5px 10px 5px 10px",
    background: "#425f6bff",
    boxShadow: "0px 3px 3px 0px rgba(184, 104, 104, 0.56)",
    fontSize: 25,
  },
  voteAverage: {
    right: 7,
    bottom: 7,
    padding: 5,
    fontSize: 25,
    fontWeight: 300,
    borderRadius: 10,
  },
  title: {
    position: "absolute",
    bottom: -40,
    fontSize: 20,
    marginLeft: "auto",
  },
  titleLight: {
    color: "#333333",
  },
  titleDark: {
    color: "#ffffff",
  },
  overview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0,
    left: 0,
    top: 0,
    borderRadius: 15,
    background: "white",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
    fontWeight: 300,
    fontSize: 22,
    letterSpacing: 0.4,
    lineHeight: 0.6,
    padding: "20px 10px",
    transition: "0.4s ease-in-out 0s",
    "& p": {
      margin: "10px 0",
      fontSize: 30,
      textAlign: "center",
      color: "red",
    },
    "& img": {
      marginTop: 10,
      height: "auto",
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
  ...params
}) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const posterImage =
    poster === null ? (
      <Image.NotFound />
    ) : (
      <img src={IMG_URL + poster} alt="poster" />
    );
  const posterDescriptionImage =
    backdropPath === null ? (
      <Image.NotFound />
    ) : (
      <img src={IMG_URL + backdropPath} alt={title} />
    );

  const classes = useStyles();

  const getVoteStyle = () => {
    switch (true) {
      case average <= 4:
        return { background: "#800020" };
      case average <= 7:
        return { background: "#b38c17" };
      default:
        return { background: "#51612b" };
    }
  };
  return (
    <div className={classes.card}>
      {posterImage}
      <div
        className={
          darkTheme
            ? cn(classes.cardInfo, classes.cardInfoDark)
            : classes.cardInfo
        }
      >
        <span className={releaseDate ? classes.releaseDate : ""}>
          {releaseDate}
        </span>
        {name}
        <span className={language ? classes.language : ""}>{language}</span>
        <p
          className={average ? classes.voteAverage : ""}
          style={getVoteStyle()}
        >
          {average ? average.toFixed(1) + " / 10" : ""}
        </p>
        <p
          className={cn(
            classes.title,
            darkTheme ? classes.titleDark : classes.titleLight
          )}
        >
          {title}
        </p>
      </div>
      <div className={classes.overview}>
        {overview !== "" ? overview : "No description of the movie"}
        {posterDescriptionImage}
      </div>
    </div>
  );
};
