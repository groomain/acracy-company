import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    margin: 0,
    borderRadius: 15,
    minHeight: '30vh',
    minWidth: '30vw',
    backgroundColor: theme.palette.secondary.modalGreen,
    padding: 15,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.secondary.main,
  },
}));
