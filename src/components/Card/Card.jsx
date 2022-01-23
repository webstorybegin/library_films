import { makeStyles } from "@material-ui/styles";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const useStyles = makeStyles({
  card: {
    fontFamily: 'Dongle',
    background: '#0c3246',
    position: 'relative',
    width: 320,
    marginRight: 20,
    marginBottom: 10,
    overflowY: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: 'white',
    transition: '.2s ease-in-out 0s',
    "&:hover > div": {
      transform: 'translateY(0)',
    },
    "& img": {
      maxWidth: "100%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginBottom: 10,
    },
  },
  cardInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    "& h1": {
      fontWeight: 500,
      fontSize: 35,
      marginRight: 5,
    },
    "& p": {
      width: 40,
      height: 40,
      fontSize: 30,
      padding: 15,
      fontWeight: 300,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  overview: {
    cursor: 'default',    
    position: 'absolute',
    opacity: 0.95,
    top: 0,
    bottom: 0,
    background: 'white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    fontWeight: 300,
    fontSize: 27,
    lineHeight: 0.7,
    padding: '10px 10px 0px 10px',
    transform: 'translateY(100%)',
    transition: '.2s ease-in-out 0s',
    "& p": {
      margin: "10px 0",
      fontSize: 30,
      textAlign: 'center',
    },
    "& img": {
      marginTop: 10,
      boxShadow: '-1px -3px 5px #000',
      borderRadius: 10,
    }
  }
});

export const Card = ({
  title,
  release_date,
  poster_path,
  overview,
  backdrop_path,
  vote_average,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <img src={IMG_URL + poster_path} />
      <div className={classes.cardInfo}>
        <h1>{title}</h1>
        <p style={
          vote_average <= 4 ? {background: '#800020'} :
          vote_average <= 7 ? {background: '#b38c17'} : 
          {background: '#51612b'}
        }>
          {vote_average}
        </p>
      </div>
      <div className={classes.overview}>
        <p>Release <br /> {release_date}</p>
        {overview}
        <img src={IMG_URL + backdrop_path} />
      </div>
    </div>
  );
};
