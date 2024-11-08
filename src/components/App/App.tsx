// Import React
import { useState, FC } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";

// Import components
import { Image, SwitchSelect } from "components";

// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
import {
  Home,
  Favorites,
  Trending,
  Coming,
  Community,
  Social,
  Settings,
  Logout,
} from "components";

const navBar = {
  home: {
    icon: <Image.IconHome />,
    text: "Home",
    path: "/home",
  },
  favorites: {
    icon: <Image.IconFavorites />,
    text: "Favorites",
    path: "/favorites",
  },
  trending: {
    icon: <Image.IconTrending />,
    text: "Trending",
    path: "/trending",
  },
  soon: {
    icon: <Image.IconSoon />,
    text: "Coming Soon",
    path: "/coming",
  },
  community: {
    icon: <Image.IconCommunity />,
    text: "Community",
    path: "/community",
  },
  social: {
    icon: <Image.IconSocial />,
    text: "Social",
    path: "/social",
  },
  settings: {
    icon: <Image.IconSettings />,
    text: "Settings",
    path: "/settings",
  },
  logout: {
    icon: <Image.IconLogout />,
    text: "Logout",
    path: "/logout",
  },
};

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
  navigationLogo: {
    marginTop: 40,
    marginBottom: 60,
  },
  navigationItem: {
    position: "relative",
    color: "#ffffff",
    opacity: 0.7,
    fontSize: 16,
    minHeight: 24,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.1s ease 0s",
    "&:not(:last-child)": {
      marginBottom: 30,
    },
    "&:hover": {
      opacity: 1,
    },
    "& img": {
      marginRight: 20,
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

interface CommonProps {
  classes: any;
}
interface AddIntentProps extends CommonProps {
  key: string;
}

const AddIndent: FC<AddIntentProps> = ({ key, classes }) => {
  return key === "soon" || key === "social" ? classes.navigationItemIndent : "";
};

function App() {
  const [theme, setTheme] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigationClick = (path) => {
    console.log(path);
    navigate(path);
  };

  return (
    <div
      style={
        theme === false ? { background: "#e9e9e9" } : { background: "#21201E" }
      }
      className={classes.mainApp}
    >
      <div
        className={classes.titleBar}
        style={
          theme === false
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
      <SwitchSelect theme={theme} setTheme={setTheme} />
      <div className={classes.wrapper}>
        <div
          className={
            theme === false
              ? cn(classes.navigation, classes.navigationLight)
              : cn(classes.navigation, classes.navigationDark)
          }
        >
          <Image.AppLogo className={classes.navigationLogo} />
          <ul>
            {Object.entries(navBar).map(([key, value]) => (
              <li
                key={key}
                className={cn(
                  classes.navigationItem,
                  AddIndent({ key, classes })
                )}
                onClick={() => handleNavigationClick(value.path)}
              >
                <NavLink to={value.path}></NavLink>
                {value.icon}
                {value.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.content}>
          <Routes>
            <Route path="/home" element={<Home theme={theme} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/coming" element={<Coming />} />
            <Route path="/community" element={<Community />} />
            <Route path="/social" element={<Social />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
