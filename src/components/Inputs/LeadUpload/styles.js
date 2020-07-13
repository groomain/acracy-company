import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  uploadContainer: {
    position: 'relative'
  },
  invisible: {
    padding: 50,
    width: 80,
    position: 'absolute',
    top: 0,
    left: -3,
    opacity: 0
  },
  closeButton: {
    position: 'absolute',
    top: -2,
    right: -15,
    '& span svg g': {
      stroke: theme.palette.primary.main,
      transition: '.1s'
    },
    '&:hover span svg g': {
      stroke: theme.palette.secondary.main
    }
  },
  uploadIconWrapper: {
    maxWidth: '7rem',
    textAlign: 'center'
  },
  maxedFileSize: {
    color: theme.palette.primary.danger
  }
}));
