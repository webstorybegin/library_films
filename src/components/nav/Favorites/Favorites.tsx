// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  favorites: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Favorites = () => {
  const classes = useStyles();

  return (
    <div className={classes.favorites}>
      <h1 className={classes.title}>Favorites</h1>
    </div>
  );
};
