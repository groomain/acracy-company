import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core';

export default makeStyles(theme => ({
  appbar: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  toolbar: {
    height: 104,
    paddingLeft: 40,
    paddingRight: 40
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: 390,
  },
  login: {
    width: 390,
  },
  signup: {
    width: 340,
  },
  home: {
    width: 270,
  },
  password: {
    width: 550,
  },
  div2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: 340,
  },
  div4: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: 550,
  }
}));
