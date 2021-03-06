import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    width: 519,
    height: 419,
    minHeight: '30vh',
    minWidth: '30vw',
    margin: 0,
    padding: 30,
    borderRadius: 15,
    backgroundColor: theme.palette.secondary.modalGreen,
    overflowStyle: 'none', // IE scrollbar
    scrollbarWidth: 'none', // Firefox scrollbar
    scrollbarColor: 'transparent transparent', // Firefox scrollbar
    '& ::-webkit-scrollbar': {
      width: 0,
    }
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.secondary.main,
  },
  title: {
    marginTop: 30,
    marginBottom: 40
  },
  navLink: {
    cursor: 'pointer',
    position: 'absolute',
    textDecoration: 'underline',
    right: 0,
    fontFamily: "Basier Medium",
    color: theme.palette.secondary.main,
    paddingLeft: 25,
    paddingRight: 30,
    fontSize: 14,
    '&:hover': {
      color: '#e4e4e4',
    },
  }

}));
