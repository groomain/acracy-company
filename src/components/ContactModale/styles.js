import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  modale: {
    backgroundColor: 'transparent',
    '@media (max-width:960px)': {
      right: '6%',
    }
  },
  modaleContainer: {
    prosition: 'absolute',
    backgroundColor: theme.palette.secondary.modalGreen,
    borderRadius: '15px',
    width: 520,
    padding: 30,
    paddingTop: 40,
    textAlign: 'left',
    '@media (max-width:960px)': {
      width: '60%',
      height: '130%',
      marginRight: '15%',
    }
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.secondary.main,
    '@media (max-width:960px)': {
      marginRight: '45%',
    }
  },
}));
