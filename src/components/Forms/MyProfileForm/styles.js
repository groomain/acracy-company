import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    marginTop: 40
  },
  leftContainer: {
    backgroundColor: theme.palette.secondary.dark,
    top: 0,
    position: 'sticky'
  },
  card: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 16,
    padding: 20
  },
  cardTitle: {
    paddingTop: 0,
    paddingBottom: 50,
    paddingLeft: 20
  },
  phoneBox: {
    height: '140px'
  }
}));