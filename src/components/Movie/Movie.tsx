import { makeStyles } from "@material-ui/styles";
import imgNotFound from "../../resources/img/imgNotFound.png";

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
    "&:before": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(24, 125, 157, 0.38)",
    },
    "&:hover > div": {
      opacity: 0.95,
    },
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  cardInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    "& span": {
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
    bottom: -60,
    color: "#ffffff",
    fontSize: 20,
  },
  overview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0,
    top: 0,
    left: 0,
    background: "white",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
    fontWeight: 300,
    fontSize: 27,
    lineHeight: 0.7,
    padding: "10px",
    transition: ".1000s ease-in-out 0s",
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

export const Movie = ({
  title,
  release_date,
  poster_path,
  overview,
  backdrop_path,
  vote_average,
}) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const poster = !`${IMG_URL}${poster_path}`.endsWith("null")
    ? IMG_URL + poster_path
    : imgNotFound;
  const descriptionPoster = !`${IMG_URL}${backdrop_path}`.endsWith("null")
    ? IMG_URL + backdrop_path
    : imgNotFound;

  const classes = useStyles();

  const getVoteStyle = () => {
    switch (true) {
      case vote_average <= 4:
        return { background: "#800020" };
      case vote_average <= 7:
        return { background: "#b38c17" };
      default:
        return { background: "#51612b" };
    }
  };

  return (
    <div className={classes.card}>
      <img src={poster} alt={title} />
      <div className={classes.cardInfo}>
        <span>{release_date}</span>
        <p className={classes.voteAverage} style={getVoteStyle()}>
          {vote_average.toFixed(1)}
        </p>
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.overview}>
        {overview !== "" ? overview : "No description of the movie"}
        <img src={descriptionPoster} alt={title} />
      </div>
    </div>
  );
};
