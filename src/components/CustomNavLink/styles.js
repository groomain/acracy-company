import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  navLink: {
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 14,
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      color: '#e4e4e4',
    },
  },
}));
