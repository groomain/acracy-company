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
    top: 10,
    right: -5,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  uploadIconWrapper: {
    maxWidth: '7rem',
    textAlign: 'center'
  },
  maxedFileSize: {
    color: theme.palette.primary.danger
  },
  img: {
    '&:hover': {
      cursor: 'pointer',
    },
  }
}));
