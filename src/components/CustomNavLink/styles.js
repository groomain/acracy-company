import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  navLink: {
    color: theme.palette.secondary.main,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
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
