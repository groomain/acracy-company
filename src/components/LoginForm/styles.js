import makeStyles from '@material-ui/core/styles/makeStyles';
import {basierRegular} from "../../utils/configureMaterialTheme";

export default makeStyles(theme => ({
  navLink: {
    fontFamily: basierRegular,
    fontSize: 14,
    color: '#fff',
    '&:hover': {
      color: '#e4e4e4',
    },
  },
  container: {
    paddingTop: 30
  }
}));
