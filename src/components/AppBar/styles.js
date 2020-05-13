import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
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
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: 390,
  },
  login: {
    width: 360,
  },
  signup: {
    width: 340,
  },
  home: {
    width: 270,
  },
  password: {
    width: 480,
  },
  root: {
    top: 0,
    width: "100%"
  },
  snackbar: {
    display: 'flex',
    marginTop: 0,
    paddingRight: 30,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: 70
  },
  typo: {
    margin: 'auto',
    color: "black"
  },
  iconButton: {
    marginTop: "auto",
    marginBottom: 'auto'
  }
}));
