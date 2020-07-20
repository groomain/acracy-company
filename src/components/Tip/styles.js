import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    minHeight: 252,
    minWidth: 339,
    borderRadius: 15,
    padding: 20
  },
  description: {
    padding: '8px 0'
  },
  link: {
    fontsize: 17,
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary.bright
    }
  }
}));