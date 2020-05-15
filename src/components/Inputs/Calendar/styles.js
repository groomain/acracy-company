import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    borderRadius: 16,
    border: `1px solid ${theme.palette.secondary.medium}`,
    color: theme.palette.secondary.main,
    '&::before, &::after': {
      display: 'none'
    },
    '&:focus-within': {
      borderColor: theme.palette.secondary.main
    },
    '& input': {
      height: 84,
      padding: '0 30px'
    }
  },
  paper: {
    '&.MuiPaper-rounded': {
      borderRadius: 16,
      margin: '.8rem 30px',
      '&.MuiPickersDay-day': {
        color: 'blue'
      }
    }
  },
  error: {
    borderColor: theme.palette.primary.danger
  },
}));
