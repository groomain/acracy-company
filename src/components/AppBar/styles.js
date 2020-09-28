import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  appbar: {
    backgroundColor: '#162217',
    boxShadow: 'none',
  },
  shadow: {
    boxShadow: '0px 1px 8px black'
  },
  toolbar: {
    height: 104,
    paddingLeft: 40,
    paddingRight: 40,
    '@media (max-width:960px)': {
      width: '55%',
      paddingLeft: 10,
      paddingRight: 1
    }
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
    width: '100%'
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
    color: 'black'
  },
  logo: {
    outlineStyle: 'none'
  },
  iconButton: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  navLink: {
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.secondary.black,
    paddingLeft: 25,
    paddingRight: 25,
    textDecoration: 'none'
  },
  textNav: {
    '@media (max-width:960px)': {
      fontSize: 13
    }
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
    transform: 'rotate(180deg)',
    '@media (max-width:960px)': {
      width: '20%'
    }
  },
  pen: {
    marginLeft: '1rem',
    '@media (max-width:960px)': {
      width: '12%'
    }
  },
  newBriefButton: {
    paddingRight: '32px'
  }
}));
