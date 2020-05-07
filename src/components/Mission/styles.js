import makeStyles from '@material-ui/core/styles/makeStyles';
import {basierMedium, basierRegular} from "../../utils/configureMaterialTheme";

export default makeStyles(theme => ({
  container: {
    height: 323,
    maxHeight: 323,
    maxWidth: 1195,
    flexGrow: 1,
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
  gridRight: {
    borderRadius: '0 15px 15px 0',
    width: '10%',
    backgroundColor: `${theme.palette.primary.main}`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  button: {
    padding: 20,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: basierRegular,
    color: `${theme.palette.secondary.black}`,
    letterSpacing: '0px',
  },
  blocAvatar: {
    marginTop: '20%',
    marginBottom: '2%',
    width: '100%',
  },
  typo:{
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
}));
