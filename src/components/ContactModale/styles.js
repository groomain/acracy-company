import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  modale: {
    backgroundColor: 'transparent'
  },
  modaleContainer: {
    prosition: 'absolute',
    backgroundColor: theme.palette.secondary.modalGreen,
    borderRadius: '15px',
    width: 520,
    padding: 30,
    paddingTop: 40,
    textAlign: 'left'
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.secondary.main,
  },
}));
