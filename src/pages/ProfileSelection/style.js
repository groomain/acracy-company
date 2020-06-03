import { makeStyles } from '@material-ui/core/styles';
import {bodoniBook} from "../../utils/configureMaterialTheme";

export const styles = makeStyles(theme => ({
  container: {
    height: '100vh',
    margin: 'auto'
  },
  divider: {
    width: '100%',
    height: 16,
    boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 3px 5px -1px rgba(0, 0, 0, 0.2)'
  },
  logoAcracyContainer: {
    height: 100
  },
  logoAcracy: {
    position: 'absolute',
    left: 20,
    top: '103vh',
    width: 35,
    height: 36
  },
  bottomContainer: {

  },
  firstMiddleContainer: {
    height: '100vh',
    minHeight: 1100
  },
  middleContainer: {
    marginTop: 100
  },
  card: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 15,
    padding: 15,
    width: 215,
    height: 322,
    marginTop: 100
  },
  cardTitle: {
    paddingTop: 10,
    paddingBottom: 10
  },
  mainTitle: {
    fontFamily: "BodoniBook",
    fontSize: 68,
    fontWeight: 100,
    lineHeight: '88px',
    maxWidth: '70%',
    marginBottom: 55
  },
  word: {
    fontFamily: "BodoniBook",
    fontWeight: 100,
    fontSize: 28,
    lineHeight: '46px',
    maxWidth: "70%"
  },
  authorContainer: {
    marginTop: 8,
    marginBottom: 35
  },
  authorTypo: {
    marginLeft: 10
  },
  list: {
    width: '100%',
    maxWidth: 250,
    position: 'sticky',
    top: 0,
    paddingTop: "30vh"
  },
  avatar: {
    border: '3px yellow solid'
  }
}));
