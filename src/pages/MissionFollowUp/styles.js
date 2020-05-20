import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    backgroundColor: `${theme.palette.secondary.black}`,
    height: '100%',
  },
  card: {
    padding: 25,
    width: '100%',
    height: 263,
    backgroundColor: "#283028",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20
  },
  typo:{
    padding: 3,
    width: '100%',
    textAlign: 'left'
  },
  blocTypoUp: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  blocTypoDown: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  bloc: {
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    marginBottom: 20
  }
}));
