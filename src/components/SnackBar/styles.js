import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    top: 0,
    width: "100%"
  },
  snackbar: {
    display: 'flex',
    marginTop: 0,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: 30
  },
  typo: {
    margin: 'auto'
  }
}));
