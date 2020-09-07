import { makeStyles } from '@material-ui/core/styles';
// import {bodoniBook} from "../../utils/configureMaterialTheme";

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
    width: 17,
    height: 17,
    paddingLeft: 2
  },
  bottomContainer: {

  },
  firstMiddleContainer: {
    // height: '100vh',
    // minHeight: 900
    padding: '2rem 0'
  },
  middleContainer: {
    paddingLeft: '6%',
    marginTop: 100,
    marginBottom: 200
  },
  loader: {
    width: '100vh',
    height: '100vh'
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
    marginTop: '1rem',
    marginBottom: 35,
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
  cartText: {
    color: theme.palette.secondary.dark,
    size: 20
  },
  cartTextSecondary: {
    color: theme.palette.secondary.dark,
    size: 16
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
  typo: {
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
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'yellow',
    width: '100%',
    height: 104,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: 20,
    backgroundColor: theme.palette.secondary.dark,
    width: 253,
    maxWidth: 253,
    height: 213,
    borderRadius: '15px',
    position: 'absolute',
    top: 10, right: 30
  },
  popoverTypoTitle: {
    fontSize: 14,
    fontFamily: 'Basier Regular',
    color: '#fff',
    letterSpacing: '-0.37px',
    marginBottom: 5
  },
  popoverTypo: {
    fontSize: 14,
    fontFamily: 'Basier Regular',
    color: '#fff',
    letterSpacing: '-0.37px',
  },
  modale: {
    backgroundColor: 'transparent'
  },
  modaleContainer: {
    prosition: 'absolute',
    backgroundColor: theme.palette.secondary.modalGreen,
    borderRadius: '15px',
    width: 520,
    padding: 30,
    paddingTop: 40,
    textAlign: 'left'
  },
  paperPopover: {
    padding: theme.spacing(1),
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.secondary.main,
  },
  tjmContainer: {
    backgroundColor: theme.palette.secondary.mid,
    width: 215,
    height: 141,
    borderRadius: '15px 15px 0 0',
    marginBottom: 2,
    padding: 20
  },
  infoTjm: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  tjm: {
    fontSize: 34,
    fontFamily: 'Basier Regular',
    color: theme.palette.primary.main
  },
  tjmWithTax: {
    fontFamily: 'Basier Regular',
    color: theme.palette.secondary.black,
    fontSize: 14,
    textAlign: 'center'
  },
  tjmWithTaxContainer: {
    color: 'black',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '15px',
    width: 70,
    marginLeft: 5,
    marginRight: 5
  },
  tjmText: {
    fontSize: 14,
    fontFamily: 'Basier Regular',
    color: theme.palette.primary.main
  },
  firstGridElement: {
    position: 'absolute',
    marginTop: 70,
    width: 215,
    left: '80%'
  },
  tjmSecondContainer: {
    backgroundColor: '#1b251c',
    width: 215,
    height: 123,
    borderRadius: '0 0 15px 15px'
  },
  tjmSecondtext: {
    width: 165, textAlign: 'center'
  },
  revealProfil: {
    paddingTop: 70, paddingBottom: 70
  },
  briefContainer: {
    width: '70%', marginLeft: "5%"
  },
  briefSeniority: {
    width: '100%',
    padding: 30,
    backgroundColor: theme.palette.secondary.modalGreen,
    borderRadius: 15
  },
  tagContainer: {
    width: '80%', marginTop: 5
  },
  miniSwitch: {
    width: 34,
    height: 17,
    top: 4,
    position: 'relative'
  },
  cartTitle: {
    fontSize: 17,
    fontFamily: 'Basier Medium',
    width: 200,
    padding: 15,
    textAlign: 'left',
    color: 'black',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  cartAvatar: {
    width: 46,
    height: 46,
  },
  cartList: {
    display: 'flex'
  },
  cartButton1: {
    width: 221, marginRight: 20
  },
  cartButton2: {
    width: 172, marginRight: 20
  },
  cartButton3: {
    width: 219, marginRight: 20
  },
  cartButton4: {
    width: 219, marginRight: 15
  },
  selectedProfilesContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  selectedProfileInfos: {
    color: theme.palette.secondary.black,
    margin: '0 1rem'
  },
  link: {
    fontsize: 17,
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.bright
    }
  }
}));
