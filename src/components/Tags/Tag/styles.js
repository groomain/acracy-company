import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  tag: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.dark,
    padding: '.5rem 1rem',
    borderRadius: 50,
    cursor: 'default'
  },
  primaryColor: {
    background: theme.palette.primary.main
  },
  withInput: {
    background: theme.palette.secondary.light,
    '& input': {
      border: 'none',
      boxShadow: 'none',
      background: 'transparent',
      '&:focus': {
        outline: 'none'
      }
    }
  }
}));
