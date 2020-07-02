import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    position: 'sticky',
    top: 105,
    background: theme.palette.secondary.dark,
    height: 600,
    alignItems: 'center',
    width: 600
  },
  title: {
    fontSize: 35,
  },
  secondaryTitle: {
    backgroundColor: theme.palette.secondary.dark,
    fontSize: 22,
    zIndex: 5,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 30
  },
  indicator: {
    left: 0,
  },
  indicatorShadow: {
    width: 2,
    height: '100%',
    position: 'absolute',
    left: 0,
    backgroundColor: '#212a21',
    zIndex: 0
  }
}));
