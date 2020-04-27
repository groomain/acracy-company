import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  button: {
    height: 50,
    // width: 200,
    paddingLeft: 50,
    paddingRight: 50,
    border: '3px solid',
    textTransform: 'none',
    fontSize: 18,
    fontWeight: 'bold',
    margin: '1rem 0',
    '&:hover': {
      border: '3px solid',
    },
  }
}));
