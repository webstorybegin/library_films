import { makeStyles } from "@material-ui/styles";
import imgNotFound from "../../resources/img/imgNotFound.png";

const useStyles = makeStyles({
  card: {
    fontFamily: "Dongle",
    background: "#0c3246",
    position: "relative",
    width: 320,
    marginRight: 20,
    marginBottom: 10,
    overflowY: "hidden",
    borderRadius: 20,
    color: "rgba(255, 255, 255, 0.62)",
    transition: ".2s ease-in-out 0s",
    cursor: "pointer",
    "&:hover > div": {
      transform: "translateY(0)",
    },
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginBottom: 10,
    },
  },
  cardInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    "& h1": {
      fontWeight: 500,
      fontSize: 35,
      marginRight: 5,
    },
    "& p": {
      width: 50,
      height: 50,
      fontSize: 30,
      fontWeight: 300,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  overview: {
    width: "100%",
    position: "absolute",
    opacity: 0.95,
    top: 0,
    bottom: 0,
    background: "white",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
    fontWeight: 300,
    fontSize: 27,
    lineHeight: 0.7,
    padding: "10px 10px 0px 10px",
    transform: "translateY(100%)",
    transition: ".2s ease-in-out 0s",
    "& p": {
      margin: "10px 0",
      fontSize: 30,
      textAlign: "center",
    },
    "& img": {
      marginTop: 10,
      boxShadow: "-1px -3px 5px #000",
      borderRadius: 20,
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

  return (
    <div className={classes.card}>
      <img src={poster} alt={title} />
      <div className={classes.cardInfo}>
        <h1>{title}</h1>
        <p
          style={
            vote_average <= 4
              ? { background: "#800020" }
              : vote_average <= 7
              ? { background: "#b38c17" }
              : { background: "#51612b" }
          }
        >
          {vote_average}
        </p>
      </div>
      <div className={classes.overview}>
        <p>
          Release <br /> {release_date}
        </p>
        {overview !== "" ? overview : "No description of the movie"}
        <img src={descriptionPoster} alt={title} />
      </div>
    </div>
  );
};
