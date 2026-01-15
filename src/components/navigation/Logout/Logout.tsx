// Import styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  logout: {
    textAlign: "center",
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    color: "red",
    fontSize: 35,
  },
});

export const Logout = () => {
  const classes = useStyles();

  return (
    <div className={classes.logout}>
      <h1 className={classes.title}>Logout</h1>
    </div>
  );
};
