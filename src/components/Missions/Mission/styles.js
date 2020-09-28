import makeStyles from '@material-ui/core/styles/makeStyles';
import { basierRegular } from "../../../utils/configureMaterialTheme";

export default makeStyles(theme => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.secondary.modalGreen,
    borderRadius: 15,
    '@media (max-width:960px)': {
      flexDirection: 'column'
    },
    '@media (min-width:960px)': {
      minHeight: 323,
    }
  },
  gridLeft: {
    borderRadius: '15px 15px 0 0',
    backgroundColor: theme.palette.secondary.mid,
    position: 'relative',
    '@media (min-width:960px)': {
      width: '28%',
      borderRadius: '15px 0 0 15px',
    },
    '@media (max-width:960px)': {
      height: 323
    }
  },
  gridCenter: {
    display: 'flex',
    textDecoration: 'none',
    paddingLeft: 31,
    width: '62%',
    '@media (max-width:960px)': {
      flexDirection: 'column',
      width: '100%',
      height: 323,
      justifyContent: 'space-around'
    }
  },
  gridCenterFinished: {
    backgroundColor: theme.palette.secondary.dark
  },
  gridLeftFinished: {
    backgroundColor: "#111711"
  },
  gridRight: {
    borderRadius: '0 15px 15px 0',
    width: '10%',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media (max-width:960px)': {
      width: '100%',
      borderRadius: '0 0 15px 15px'
    }
  },
  gridRightNoCursor: {
    borderRadius: '0 15px 15px 0',
    width: '10%',
    '&:hover': {
      cursor: 'initial',
    },
  },
  noCursor: {
    '&:hover': {
      cursor: 'initial',
    },
  },
  withoutButton: {
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      cursor: 'initial'
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  rightRed: {
    backgroundColor: theme.palette.primary.danger,
  },
  button: {
    padding: 20,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Basier Medium',
    color: theme.palette.secondary.black,
    letterSpacing: '0px',
  },
  blocAvatar: {
    paddingTop: '44px',
    paddingBottom: '5px',
    width: '100%'
  },
  typo: {
    // padding: 5,
    width: '100%',
    textAlign: 'left'
  },
  bloc: {
    height: '55%'
  },
  typoH4: {
    lineHeight: 2,
    width: '100%',
    textAlign: 'left'
  },
  blocTypoUp: {
    marginTop: '2rem',
    width: '100%',
    '@media (min-width:960px)': {
      marginTop: '30%',
    }
  },
  blocTypoDown: {
    width: '100%',
  },
  blocTypoDownAvatar: {
    width: '100%',
  },
  icon: {
    width: 40,
  },
  statusTitleBase: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: basierRegular,
    color: theme.palette.primary.main
  },
  statusTitleRed: {
    color: theme.palette.primary.main,
  },
  buttonIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 26,
    right: 10,
    '&:hover span svg g g': {
      fill: theme.palette.primary.main
    }
  },
  statusContainer: {
    height: '20%',
    padding: '8px 5px 0',
    position: 'relative',
  },
  titleContainer: {
    padding: '28px 30px 30px 30px'
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
  outsideContainer: {
    marginTop: 10
  },
  outsideTypo: {
    marginLeft: 10
  },
  finishedMission: {
    color: theme.palette.secondary.main
  },
  missionContent: {
    '@media (max-width:960px)': {
      flexDirection: 'column'
    }
  }
}));
