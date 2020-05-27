import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.secondary.medium}`,
    borderRadius: 15,
    minHeight: 140,
    margin: '.8rem auto',
    backgroundColor: `${fade(theme.palette.secondary.inputFadeFilter, 0.1)}`,
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: 17,
    lineHeight: '34px',
    paddingTop: '27px',
    alignItems: 'flex-start'
  },
  label: {
    fontSize: 17,
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
  error: {
    borderColor: theme.palette.primary.danger
  },
  inputLength: {
    color: theme.palette.secondary.medium
  }
}));
