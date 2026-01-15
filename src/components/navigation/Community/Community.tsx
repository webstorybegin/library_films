// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  community: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Community = () => {
  const classes = useStyles();

  return (
    <div className={classes.community}>
      <h1 className={classes.title}>Community</h1>
    </div>
  );
};
