import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    height: '100vh',
    minHeight: 800
  },
  briefTipRoot: {
    backgroundColor: theme.palette.secondary.dark,
    minHeight: 185,
    minWidth: 139,
    borderRadius: 15,
    // padding: 20,
    // padding: '15.3rem 0 5rem 0',
    position: 'sticky',
    top: '10rem',
  },
  icon: {
    padding: ' 2rem 0 0 2rem',
    margin: 0,
  },
  description: {
    padding: '2rem 2rem'
  },
  yellowText: {
    fontSize: 17,
    fontFamily: 'Basier Medium',
    color: theme.palette.primary.main,
    letterSpacing: '-0.45px',
  },
  appbar: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  toolbar: {
    height: 104,
    paddingLeft: 40,
    paddingRight: 40
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  save: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: 390,
  },
  buttonSave: {
    paddingLeft: 25,
    paddingRight: 25
  }
}));
