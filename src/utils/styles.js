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
    height: '100vh',
    minHeight: 800
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
    paddingBottom: 20
  },
  divider: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: `${theme.palette.secondary.medium}`,
  }
}));
