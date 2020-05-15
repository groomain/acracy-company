import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.mid,
    height: 89,
    maxWidth: 357,
    borderRadius: 15,
    padding: 10,
    paddingLeft: 20,
    alignItems: 'center'
  },
  text: {
    padding: '8px 0'
  }
}));
