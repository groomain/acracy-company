import { makeStyles } from '@material-ui/core/styles';
import {bodoniBook} from "../../utils/configureMaterialTheme";

export const styles = makeStyles(theme => ({
  container: {
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
    minHeight: 900
  },
  middleContainer: {
    paddingLeft: '6%',
    marginTop: 100,
    marginBottom: 200
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
  listItem: {
    marginBottom: 10,
    cursor: 'pointer'
  },
  listItemTextActive: {
    color: theme.palette.primary.main
  },
  listItemText: {
    color: theme.palette.secondary.medium,
    size: 20
  },
  avatarCheck: {
    position: "absolute",
    zIndex: 3,
    left: 8,
    top: 5,
    width: 25,
    height: 25
  },
  avatarActive: {
    border: '3px yellow solid',
  },
  avatar: {
    width: 46,
    height: 46
  },
  borderAvatar: {
    backgroundColor: theme.palette.secondary.black,
    width: 46,
    height: 46
  },
  borderAvatarAcracy: {
    border: `2px ${theme.palette.secondary.medium} solid`,
    backgroundColor: theme.palette.secondary.black,
    width: 46,
    height: 46
  },
  borderAvatarActive: {
    border: '3px yellow solid',
    // backgroundColor: theme.palette.secondary.black,
  },
  footerCard: {
    padding: 25,
    width: '80%',
    height: 263,
    backgroundColor: "#283028",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20
  },
  typo:{
    padding: 3,
    width: '100%',
    textAlign: 'left'
  },
  blocTypoUp: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  blocTypoDown: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  bloc: {
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    marginBottom: 20
  },
  secondTitle: {
    marginTop: 100,
    marginBottom: 20
  },
  titleFreelance: {
    marginBottom: 20,
    marginLeft: "5%"
  },
  waitingProfile: {
    width: '100%',
    height: 261,
    backgroundColor: `${theme.palette.secondary.dark}`,
    borderRadius: 15,
    textAlign: 'center',
    padding: 20,
    marginTop: 10,
    marginBottom: 150
  },
  waitingProfilTitle: {
    marginTop: 10,
    marginBottom: 5
  },
  waitingProfileText: {
    color: `${theme.palette.secondary.medium}`,
    width: "70%"
  },
  cart: {
    backgroundColor: 'yellow',
    width: '100%',
    height: 104,
  }
}));
