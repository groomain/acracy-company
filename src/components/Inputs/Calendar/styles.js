import makeStyles from '@material-ui/core/styles/makeStyles';

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
      height: 64,
      padding: '0 22px'
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
