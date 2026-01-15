// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  trending: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Trending = () => {
  const classes = useStyles();

  return (
    <div className={classes.trending}>
      <h1 className={classes.title}>Trending</h1>
    </div>
  );
};
