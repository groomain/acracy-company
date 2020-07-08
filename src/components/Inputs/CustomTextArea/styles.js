import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    borderRadius: 15,
    margin: '1rem auto',
    backgroundColor: `${fade(theme.palette.secondary.inputFadeFilter, 0.1)}`,
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: 17,
    lineHeight: '34px',
    alignItems: 'flex-start',
    padding: 0,
  },
  label: {
    fontSize: 17,
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
  inputLength: {
    color: theme.palette.secondary.medium
  },
  input: {
    padding: 30,
    borderRadius: 15,
    border: `1px solid ${theme.palette.secondary.medium}`,
    minHeight: 100,
    '&:focus': {
      border: `1px solid ${theme.palette.secondary.main}`,
    }
  },
  large: {
    minHeight: 210
  },
  error: {
    borderColor: theme.palette.primary.danger
  },
}));