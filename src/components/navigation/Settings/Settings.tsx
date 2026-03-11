import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 40px)",
    padding: "48px 32px",
  },
  title: {
    fontSize: 48,
    fontWeight: 300,
    letterSpacing: "-0.02em",
    marginBottom: 16,
    transition: "color 0.2s ease",
    '@media (min-width: 2560px)': {
      fontSize: 64,
    },
    '@media (min-width: 3840px)': {
      fontSize: 84,
    },
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    opacity: 0.6,
    letterSpacing: "0.01em",
    '@media (min-width: 2560px)': {
      fontSize: 22,
    },
    '@media (min-width: 3840px)': {
      fontSize: 28,
    },
  },
  titleLight: {
    color: "#212121",
  },
  titleDark: {
    color: "#FFFFFF",
  },
});

interface SettingsProps {
  darkTheme?: boolean;
}

export const Settings = ({ darkTheme }: SettingsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={`${classes.title} ${darkTheme ? classes.titleDark : classes.titleLight}`}>
        Settings
      </h1>
      <p className={`${classes.subtitle} ${darkTheme ? classes.titleDark : classes.titleLight}`}>
        Coming soon
      </p>
    </div>
  );
};
