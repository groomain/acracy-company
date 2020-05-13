import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    margin: 0,
    borderRadius: 15,
    backgroundColor: 'transparent'
  },
  dialog: {
    borderRadius: 15,
    backgroundColor: theme.palette.secondary.modalGreen,
    padding: 30,
    minHeight: '30vh',
    minWidth: '30vw',
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.secondary.main,
  },

}));
