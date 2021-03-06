import makeStyles from '@material-ui/core/styles/makeStyles';
import { basierRegular } from "./configureMaterialTheme";

export default makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  connectionDiv: {
    backgroundColor: `${theme.palette.secondary.black}`,
    minHeight: '100vh',
  },
  Connection: {
    borderRadius: 5,
    width: 450,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
  },
  titleConnection: {
    color: theme.palette.secondary.main,
    fontStyle: 'italic',
    fontSize: 60,
    marginBottom: 20
  },
  titleFormConnection: {
    fontSize: 30,
    color: theme.palette.secondary.main,
    margin: 30,
    fontWeight: 'bold'
  },
  sidebarDiv: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.sidebarGreen,
    '@media (min-width:960px)': {
      minHeight: '100vh',
    }
  },
  navLink: {
    color: `${theme.palette.primary.main}`,
    fontFamily: basierRegular,
  },
  typo: {
    fontSize: 17,
    height: 30
  },
  titleSignIn: {
    paddingBottom: 10
  },
  divider: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: `${theme.palette.secondary.medium}`,
  },
  hrdivider: {
    height: "1px",
    backgroundColor: `${theme.palette.secondary.medium}`,
    marginTop: 40,
    marginBottom: 40,

  },
  pannel: {
    padding: '30px 0',
    position: 'sticky',
    top: 0,
  },
  pannelLayout: {
    paddingTop: 164,
    paddingBottom: '10rem'
  },
  midWidth: {
    '@media (min-width:960px)': {
      width: '50%',
    }
  },
  email: {
    color: theme.palette.primary.main
  },
  fullPage: {
    paddingLeft: '14vw',
    paddingRight: '14vw',
    '@media (max-width:960px)': {
      paddingLeft: '2rem',
      paddingRight: '2rem',
    }
  },
  disabledText: {
    textAlign: 'center',
    opacity: '.5'
  },
  container: {
    marginTop: theme.navbar.height
  },
  titleForgotPassword: {
    marginBottom: 10
  },
  marginTextfield: {
    marginTop: 28
  },
  forgotPasswordStep2Margin: {
    marginBottom: 84
  },
  marginButton: {
    marginTop: 32,
    marginBottom: 4
  }
}));
