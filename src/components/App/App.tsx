// Import React
import { useEffect, useState, FC } from "react";
// Import components
import { Image, Search, Spinner, SwitchSelect, Movie } from "components";

// Import hooks
import { fetchMovies } from "components/hooks/fetchMovies";
// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";

const navBar = {
  home: {
    icon: <Image.IconHome />,
    text: "Home",
  },
  favorites: {
    icon: <Image.IconFavorites />,
    text: "Favorites",
  },
  trending: {
    icon: <Image.IconTrending />,
    text: "Trending",
  },
  soon: {
    icon: <Image.IconSoon />,
    text: "Coming Soon",
  },
  community: {
    icon: <Image.IconCommunity />,
    text: "Community",
  },
  social: {
    icon: <Image.IconSocial />,
    text: "Social",
  },
  settings: {
    icon: <Image.IconSettings />,
    text: "Settings",
  },
  logout: {
    icon: <Image.IconLogout />,
    text: "Logout",
  },
};

const useStyles = makeStyles({
  mainApp: {
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    margin: "0 auto",
    WebkitUserSelect: "none",
    "& label": {
      // SwitchSelect
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
  containerMovies: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    padding: "110px 20px 0px",
  },
  search: {
    width: 300,
    fontSize: 35,
  },
  wrapper: {
    display: "flex",
  },
  navigation: {
    minHeight: "100vh",
    width: 350,
    background: "#21201E",
    paddingTop: 40,
    paddingRight: 40,
    paddingLeft: 40,
    borderRight: "1px solid transparent",
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
interface generateNavigationItemsProps extends CommonProps {}

const AddIndent: FC<AddIntentProps> = ({ key, classes }) => {
  return key === "soon" || key === "social" ? classes.navigationItemIndent : "";
};

const generateNavigationItems: FC<generateNavigationItemsProps> = ({
  classes,
}) => {
  return (
    <ul>
      {Object.entries(navBar).map(([key, value]) => (
        <li
          key={key}
          className={cn(classes.navigationItem, AddIndent({ key, classes }))}
        >
          {value.icon}
          {value.text}
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [theme, setTheme] = useState(false);
  const [moviesFound, setMoviesFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchMovies.trim() === "") {
        setMovies([]);
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const data = await fetchMovies(searchMovies);
        setMovies(data);
        setMoviesFound(data.length > 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchMovies]);

  const classes = useStyles();

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
      <Search
        onChange={(e: any) => setSearchMovies(e.target.value)}
        theme={theme}
      />
      <div className={classes.wrapper}>
        <div
          className={
            theme === false
              ? cn(classes.navigation, classes.navigationLight)
              : cn(classes.navigation, classes.navigationDark)
          }
        >
          <Image.AppLogo className={classes.navigationLogo} />
          {generateNavigationItems({ classes })}
        </div>
        <div className={classes.containerMovies}>
          {loading && <Spinner theme={theme} />}
          {!loading &&
            moviesFound &&
            movies.map((movie) => (
              <Movie key={movie.id} theme={theme} {...movie} />
            ))}
          {!loading && !moviesFound && searchMovies.trim() !== "" && (
            <Image.NotFoundAnimate className={classes.filmNotFound} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
