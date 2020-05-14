import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.light
  },
  paper: {
    borderRadius: '16px !important',
    border: `1px solid ${theme.palette.secondary.medium}`,
    background: fade(theme.palette.secondary.light, .2),
    '&.MuiToolbar-toolbar': {
      background: 'none'
    }
  },
}));
