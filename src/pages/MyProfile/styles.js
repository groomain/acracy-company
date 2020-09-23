import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    paddingTop: theme.navbar.height
  },
  leftContainer: {
    backgroundColor: theme.palette.secondary.dark,
    top: 0,
    position: 'sticky'
  },
  card: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '15px',
    padding: 20,
  },
  element: {
    width: '80%',
  },
  cardTitle: {
    padding: 20,
    marginBottom: 5
  },
  textfield: {
    marginTop: 15,
    marginBottom: 15
  }
}));