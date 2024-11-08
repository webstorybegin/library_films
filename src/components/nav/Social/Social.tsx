// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  social: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Social = () => {
  const classes = useStyles();

  return (
    <div className={classes.social}>
      <h1 className={classes.title}>Social</h1>
    </div>
  );
};
