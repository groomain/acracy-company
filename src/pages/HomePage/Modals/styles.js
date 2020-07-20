import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    overflowStyle: 'none', // IE scrollbar
    scrollbarWidth: 'none', // Firefox scrollbar
    scrollbarColor: 'transparent transparent', // Firefox scrollbar
    '& ::-webkit-scrollbar': {
      width: 0,
    }
  },
  root: {
    width: 519,
    minHeight: '30vh',
    minWidth: '30vw',
    margin: 0,
    padding: 30,
    borderRadius: 15,
    backgroundColor: theme.palette.secondary.modalGreen,
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
    position: 'absolute',
    right: 0,
    fontFamily: "Basier Medium",
    color: theme.palette.secondary.main,
    paddingLeft: 25,
    paddingRight: 30,
    fontSize: 14,
    '&:hover': {
      color: '#e4e4e4',
    },
  },
  bigModal: {
    marginTop: 30,
    width: 519,
    minHeight: '30vh',
    minWidth: '40vw',
    margin: 0,
    padding: 30,
    borderRadius: 15,
    backgroundColor: `${theme.palette.secondary.modalGreen}`
  },
  validationComment: {
    margin: '16px',
    padding: '16px',
    borderRadius: '15px',
    backgroundColor: '#212a21'
  },
  snackBar: {
    width: 'auto',
    backgroundColor: '#ecf805',
    color: 'black',
    borderRadius: '28px',
    height: 46,
    paddingLeft: 15,
    paddingRight: 15
  },
  typoSnackBar: {
    fontSize: 17,
    fontFamily: 'Basier Regular',
    color: theme.palette.secondary.black,
    marginRight: 10,
    marginLeft: 10
  }
}));
