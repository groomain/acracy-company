import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  navLink: {
    fontSize: 19,
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      color: '#e4e4e4',
    },
  },
  yellowLink: {
    fontsize: 17,
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary.bright,
    },
  }
}));
