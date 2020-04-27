import makeStyles from '@material-ui/core/styles/makeStyles';
import {fade} from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    width: 400,
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));
