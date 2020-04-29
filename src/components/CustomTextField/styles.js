import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.secondary.medium}`,
    height: 84,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'rgba(86, 94, 86, 0.1)',
    transition: theme.transitions.create(['border-color']),
    caretColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    fontWeight: 500,
    '&$focused': {
      backgroundColor: 'inherit',
      borderColor: theme.palette.secondary.main,
    },
    '& .MuiFilledInput-input': {
      padding: '0 30px',
      color: theme.palette.secondary
    }
  },
  focused: {},
  label: {
    fontSize: 17,
    color: theme.palette.secondary.main,
    fontWeight: 500
  }
}));
