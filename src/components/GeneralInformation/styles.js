import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    position: 'sticky',
    paddingTop: 80,
    background: theme.palette.secondary.dark,
    height: 600,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 30
  },
  primaryTitle: {
    paddingBottom: 25,
    paddingLeft: 20,
    display: 'block'
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
