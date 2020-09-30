import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    height: '100vh',
    minHeight: 800,
    paddingTop: 30
  },
  briefTipRoot: {
    minHeight: 5,
    minWidth: '100%',
    borderRadius: 15,
  },
  icon: {
    margin: 0,
  },
  image: {
    display: 'block',
    width: 75,
    height: 75
  },
  description: {
    fontSize: 17,
    fontFamily: 'Basier Regular',
    color: '#fff',
    letterSpacing: '-0.45px',
    padding: '15px 0 0 0'
  },
  description2: {
    padding: '1rem 0'
  },
  yellowText: {
    fontFamily: 'Basier Regular',
    color: theme.palette.primary.main,
    letterSpacing: '-0.45px',
  },
  appbar: {
    backgroundColor: '#162217',
    boxShadow: 'none',
  },
  shadow: {
    boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 3px 5px -1px rgba(0, 0, 0, 0.2)',
  },
  toolbar: {
    height: theme.navbar.height,
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
  logo: {
    outlineStyle: 'none'
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
