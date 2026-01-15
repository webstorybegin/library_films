// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  coming: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Coming = () => {
  const classes = useStyles();

  return (
    <div className={classes.coming}>
      <h1 className={classes.title}>Coming Soon</h1>
    </div>
  );
};
