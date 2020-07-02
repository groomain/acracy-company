import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  underSecondaryTitle: {
    opacity: 100,
    textAlign: 'left',
    fontSize: 10,
    '&:hover': {
      cursor: 'pointer',
      color: `${theme.palette.primary.main}`,
    },
  },
  wrapper: {
    paddingLeft: 60,
    display: 'block',
    minWidth: 350
  },
  selected: {
    color: `${theme.palette.primary.main}`,
  },
  root: {
    minWidth: 320,
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
}));
