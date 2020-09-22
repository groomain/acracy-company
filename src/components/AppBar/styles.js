import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  appbar: {
    backgroundColor: '#162217',
    boxShadow: 'none',
  },
  shadow: {
    boxShadow: "0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14)"
  },
  toolbar: {
    height: theme.navbar.height,
    paddingLeft: 40,
    paddingRight: 40
  },
  grow: {
    flexGrow: 1,
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
    width: 390,
  },
  login: {
    width: 360,
  },
  signup: {
    width: 340,
  },
  home: {
    width: 270,
  },
  password: {
    width: 525,
  },
  root: {
    top: 0,
    width: "100%"
  },
  snackbar: {
    display: 'flex',
    marginTop: 0,
    paddingRight: 30,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: 70
  },
  typo: {
    margin: 'auto',
    color: "black"
  },
  logo: {
    outlineStyle: 'none'
  },
  iconButton: {
    marginTop: "auto",
    marginBottom: 'auto'
  },
  navLink: {
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.secondary.black,
    paddingLeft: 25,
    paddingRight: 25,
    textDecoration: 'none',
  },
  newbrief: {
    position: 'absolute',
    left: '35%'
  },
  missionNavButton: {
    marginLeft: '7%',
    cursor: 'pointer',
    '& img:first-of-type': {
      marginRight: '1rem'
    },
    '&:hover h2': {
      color: theme.palette.secondary.lighter
    }
  },
  missionNavImage: {
    transform: 'rotate(180deg)'
  },
  pen: {
    marginLeft: '1rem'
  },
  newBriefButton: {
    paddingRight: '32px'
  }
}));
