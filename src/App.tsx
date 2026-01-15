// Import React
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

// Import components
import { Home, Image, SwitchSelect } from "components";

// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
import { ROUTES } from "components/routes";

const useStyles = makeStyles({
  mainApp: {
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    margin: "0 auto",
    WebkitUserSelect: "none",
    "& label": {
      position: "absolute",
      right: "29%",
      top: 45,
    },
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: 40,
    zIndex: 50,
  },
  dragWrapper: {
    WebkitAppRegion: "drag",
    height: "100%",
    width: "100%",
  },
  nav: {
    padding: "10px 0",
    width: 150,
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-evenly",
    "& button": {
      display: "inline-block",
      zIndex: 100,
      background: "transparent",
      transition: "transform 0.1s ease 0s",
      "&:hover": {
        transform: "scale(1.2)",
      },
    },
  },
  minimizeBtn: {
    "& span": {
      display: "block",
      width: 20,
      height: 2,
      background: "#000000",
    },
  },
  resizeBtn: {
    width: 20,
    height: 20,
    border: "2px solid #000000",
  },
  closeBtn: {
    position: "relative",
    width: 20,
    height: 20,
    "&::before, &::after": {
      position: "absolute",
      content: '""',
      right: 0,
      top: "50%",
      width: "100%",
      height: 2,
      backgroundColor: "#000000",
      borderRadius: 50,
    },
    "&::before": {
      transform: "translateY(-50%) rotate(45deg)",
    },
    "&::after": {
      transform: "translateY(-50%) rotate(-45deg)",
    },
  },
  sideBarBtn: {
    left: 10,
  },
  wrapper: {
    display: "flex",
  },
  navigation: {
    minHeight: "100vh",
    width: "20%",
    minWidth: "20%",
    background: "#21201E",
    paddingTop: 40,
    paddingRight: 40,
    paddingLeft: 40,
    borderRight: "1px solid transparent",
  },
  content: {
    width: "80%",
    minHeight: "100vh",
    paddingTop: "40px",
  },
  navigationDark: {
    borderRight: "1px solid #444444",
  },
  navigationLight: {
    boxShadow: "10px 0px 100px 15px #21201E",
  },
  navigationList: {
    minHeight: 170,
  },
  navigationLogo: {
    marginTop: 40,
    marginBottom: 60,
  },
  navigationItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    "& img": {
      marginRight: 20,
    },
    "& a": {
      display: "inline-block",
      color: "#ffffff",
      opacity: 0.7,
      fontSize: 16,
      cursor: "pointer",
      transition: "all .3s ease 0s",
    },
    "&:not(:last-child)": {
      marginBottom: 30,
    },
    "&:hover": {
      opacity: 1,
    },
    "&:has(a.active) a": {
      fontWeight: 700,
      fontSize: 30,
    },
    "&:has(a.active) img": {
      // transform: "scale(1.6)",
    },
  },

  navigationItemIndent: {
    marginBottom: "122px !important",
  },
  filmNotFound: {
    position: "absolute",
    bottom: 0,
    left: "45%",
    width: "auto",
    height: 500,
    marginLeft: -100,
    borderRadius: 50,
  },
});

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const classes = useStyles();

  return (
    <div
      className={classes.mainApp}
      style={!darkTheme ? { background: "#e9e9e9" } : { background: "#21201E" }}
    >
      <div
        className={classes.titleBar}
        style={
          !darkTheme
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: "#a7a7a7" }
        }
      >
        <div className={classes.dragWrapper}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/react_app/src/resources/icons/app_icon.png"
            }
            alt=""
          />
        </div>
        <div className={classes.nav}>
          <button className={classes.minimizeBtn} id="minimize_btn">
            <span></span>
          </button>
          <button className={classes.resizeBtn} id="resize_btn"></button>
          <button className={classes.closeBtn} id="close_btn"></button>
        </div>
      </div>
      <SwitchSelect theme={darkTheme} setTheme={setDarkTheme} />
      <div className={classes.wrapper}>
        <div
          className={
            !darkTheme
              ? cn(classes.navigation, classes.navigationLight)
              : cn(classes.navigation, classes.navigationDark)
          }
        >
          <Image.AppLogo className={classes.navigationLogo} />
          <ul className={classes.navigationList}>
            {Object.entries(ROUTES).map(([key, value]) => (
              <li
                key={key}
                className={cn(
                  classes.navigationItem,
                  key === "soon" || key === "social"
                    ? classes.navigationItemIndent
                    : ""
                )}
              >
                {value.icon}
                <NavLink to={value.path}>{value.text}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.content}>
          <Routes>
            <Route
              path={ROUTES.HOME.path}
              element={<Home darkTheme={darkTheme} />}
            />
            <Route
              path={ROUTES.FAVORITES.path}
              element={ROUTES.FAVORITES.element}
            />
            <Route
              path={ROUTES.TRENDING.path}
              element={ROUTES.TRENDING.element}
            />
            <Route path={ROUTES.SOON.path} element={ROUTES.SOON.element} />
            <Route
              path={ROUTES.COMMUNITY.path}
              element={ROUTES.COMMUNITY.element}
            />
            <Route path={ROUTES.SOCIAL.path} element={ROUTES.SOCIAL.element} />
            <Route
              path={ROUTES.SETTINGS.path}
              element={ROUTES.SETTINGS.element}
            />
            <Route path={ROUTES.LOGOUT.path} element={ROUTES.LOGOUT.element} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
