import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
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
  underSecondaryTitle: {
    opacity: 100,
    textAlign: 'left',
    fontSize: 10,
    '&:hover': {
      cursor: 'pointer',
      color: `${theme.palette.primary.main}`,
    },
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
  },
  tabs: {
    paddingRight: 40,

  },
  wrapper: {
    display: 'block',
    width: '100%'
  },
  labelIcon: {
    width: 500,
    paddingLeft: 40,
    paddingRight: 40,
    minHeight: 0,
    textTransform: 'none',
    fontSize: 17,
    fontFamily: 'Basier Medium',
    color: '#fff',
    letterSpacing: '-0.45px',
  },
  selected: {
    color: `${theme.palette.primary.main}`,
  },
  flexContainerVertical: {
    width: '100%'
  },
  root: {
    width: '100%'
  }
}));
