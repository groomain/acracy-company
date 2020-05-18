import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    height: '100vh',
    minHeight: 800
  },
  briefTipRoot: {
    backgroundColor: theme.palette.secondary.dark,
    minHeight: 185,
    minWidth: 139,
    borderRadius: 15,
    // padding: 20,
    // padding: '15.3rem 0 5rem 0',
    position: 'sticky',
    top: '10rem',
  },
  icon: {
    padding: ' 2rem 0 0 2rem',
    margin: 0,
  },
  description: {
    padding: '2rem 2rem'
  },
  yellowText: {
    fontSize: 17,
    fontFamily: 'Basier Medium',
    color: theme.palette.primary.main,
    letterSpacing: '-0.45px',
  }

}));