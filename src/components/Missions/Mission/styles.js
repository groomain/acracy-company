import makeStyles from '@material-ui/core/styles/makeStyles';
import { basierRegular } from "../../../utils/configureMaterialTheme";

export default makeStyles(theme => ({
  container: {
    height: 323,
    maxHeight: 323,
    width: '100%',
    flexGrow: 1,
    backgroundColor: "#283028",
    borderRadius: 15,
  },
  gridLeft: {
    borderRadius: '15px 0 0 15px',
    width: '28%',
    backgroundColor: `${theme.palette.secondary.mid}`,
    maxHeight: 323,
  },
  gridCenter: {
    paddingLeft: '2%',
    paddingRight: '2%',
    width: '62%',
    backgroundColor: "#283028"
  },
  gridCenterFinished: {
    backgroundColor: "#151d15"
  },
  gridLeftFinished: {
    backgroundColor: "#111711"
  },
  gridRight: {
    borderRadius: '0 15px 15px 0',
    width: '10%',
    backgroundColor: `${theme.palette.primary.main}`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  withoutButton: {
    backgroundColor: "#151d15",
    '&:hover': {
      cursor: 'initial'
    },
  },
  rightRed: {
    backgroundColor: "#ff565c",
  },
  button: {
    padding: 20,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Basier Medium',
    color: `${theme.palette.secondary.black}`,
    letterSpacing: '0px',
  },
  blocAvatar: {
    marginTop: '20%',
    marginBottom: '2%',
    width: '100%',
  },
  typo: {
    padding: 3,
    width: '100%',
    textAlign: 'left'
  },
  blocTypoUp: {
    marginTop: '30%',
    width: '100%',
  },
  blocTypoDown: {
    marginTop: '23%',
    width: '100%',
  },
  blocTypoDownAvatar: {
    marginTop: '3%',
    width: '100%',
  },
  icon: {
    width: 40,
    position: 'relative',
    top: 11
  },
  statusTitle: {
    fontSize: 14,
    fontFamily: basierRegular,
    color: '#ecf805',
    paddingTop: 7
  },
  statusTitleRed: {
    color: '#ff565c',
  },
  buttonIcon: {
    width: 25,
    height: 25,
    marginTop: 6
  },
  statusContainer: {
    height: '12%',
    padding: 5,
    paddingLeft: 15
  },
  titleContainer: {
    height: '47%',
    paddingTop: '8%',
    paddingLeft: 30,
    paddingRight: 38
  },
  title: {
    fontSize: 22,
    fontFamily: 'Basier Medium'
  },
  description: {
    height: '41%',
    paddingLeft: 30,
    paddingRight: 38
  },
  menuIcon: {
    position: 'absolute',
    top: 6,
    left: 10
  },
  outsideContainer: {
    marginTop: 8
  },
  outsideTypo: {
    marginLeft: 10
  }
}));
