// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";
// Import images
// import searchIcon from "resources/icons/search_icon.svg";

const useStyles = makeStyles({
  search: {
    position: "absolute",
    top: 50,
    left: "47%",
    width: 300,
    height: 40,
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
    border: "1px solid #21201E",
    color: "#21201E",
    backgroundColor: "#e9e9e9",
  },
  searchLight: {
    backgroundColor: "#e9e9e9",
  },
  searchDark: {
    backgroundColor: "#21201E",
    color: "#e9e9e9",
    border: "1px solid #e9e9e9",
  },
});

export const Search = ({ onChange, theme }) => {
  const classes = useStyles();
  return (
    <>
      <input
        className={
          theme === false
            ? cn(classes.search, classes.searchLight)
            : cn(classes.search, classes.searchDark)
        }
        type="text"
        onChange={onChange}
        placeholder="Enter your movie"
      />
    </>
  );
};
