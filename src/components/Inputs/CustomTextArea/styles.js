import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    borderRadius: 15,
    margin: '1rem auto',
    backgroundColor: `${fade(theme.palette.secondary.inputFadeFilter, 0.1)}`,
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '25px',
    alignItems: 'flex-start',
    padding: 0,
  },
  label: {
    fontSize: 14,
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
  inputLength: {
    color: theme.palette.secondary.medium
  },
  input: {
    padding: 22,
    borderRadius: 15,
    border: `1px solid ${theme.palette.secondary.medium}`,
    minHeight: 100,
    '&:focus': {
      border: `1px solid ${theme.palette.secondary.main}`,
    }
  },
  large: {
    minHeight: 240
  },
  error: {
    borderColor: theme.palette.primary.danger
  },
}));