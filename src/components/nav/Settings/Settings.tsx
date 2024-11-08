// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  settings: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.settings}>
      <h1 className={classes.title}>Settings</h1>
    </div>
  );
};
