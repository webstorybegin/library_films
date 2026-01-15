import { FC } from "react";

// Import styles
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";

const useStyles = makeStyles({
  spinnerSquare: {
    display: "flex",
    flexDirection: "row",
    width: 90,
    height: 120,
  },
  square: {
    width: 17,
    height: 80,
    margin: "auto auto",
    transform: "translateX(-50px)",
    borderRadius: 8,
    border: "3px solid #e9e9e9",
  },
  squareLight: {
    border: "1px solid transparent",
  },
  squareDark: {
    border: "1px solid #e9e9e9",
  },
  square1: {
    animation:
      "$square-anim 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s infinite",
  },
  square2: {
    animation:
      "$square-anim 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 200ms infinite",
  },
  square3: {
    animation:
      "$square-anim 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 400ms infinite",
  },
  "@keyframes square-anim": {
    "0%": {
      height: 80,
      backgroundColor: "#0AA3E4",
    },
    "20%": {
      height: 80,
    },
    "40%": {
      height: 120,
      backgroundColor: "#0AA3E4",
    },
    "80%": {
      height: 80,
    },
    "100%": {
      height: 80,
      backgroundColor: "#0AA3E4",
    },
  },
});

interface SpinnerProps {
  theme: boolean;
}
export const Spinner: FC<SpinnerProps> = ({ theme }) => {
  const classes = useStyles();

  return (
    <div className={classes.spinnerSquare}>
      <div
        className={
          theme === false
            ? cn(classes.square1, classes.square, classes.squareLight)
            : cn(classes.square1, classes.square, classes.squareDark)
        }
      ></div>
      <div
        className={
          theme === false
            ? cn(classes.square2, classes.square, classes.squareLight)
            : cn(classes.square2, classes.square, classes.squareDark)
        }
      ></div>
      <div
        className={
          theme === false
            ? cn(classes.square3, classes.square, classes.squareLight)
            : cn(classes.square3, classes.square, classes.squareDark)
        }
      ></div>
    </div>
  );
};
