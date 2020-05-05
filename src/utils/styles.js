import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  connectionDiv: {
    backgroundColor: theme.palette.secondary.black,
    minHeight: '100vh',
    paddingBottom: '20vh'
  },
  Connection: {
    borderRadius: 5,
    width: 450,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
  },
  titleConnection: {
    color: theme.palette.secondary.main,
    fontStyle: 'italic',
    fontSize: 60,
    marginBottom: 20
  },
  titleFormConnection: {
    fontSize: 30,
    color: theme.palette.secondary.main,
    margin: 30,
    fontWeight: 'bold'
  },
  searchedTerms: {
    fontSize: 21,
    color: theme.palette.primary.main,

  },
  text: {
    fontSize: 34,
    color: theme.palette.secondary.main,

  },
  textSmall: {
    color: theme.palette.secondary.main,
    fontSize: 17
  },
  textSmallYellow: {
    fontSize: 17,
    color: theme.palette.primary.main
  },
  textLink: {
    textDecoration: 'underline'
  },
  sidebarDiv: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.sidebarGreen,
    height: '100vh'
  },
  formGridItem: {
    paddingTop: '10vh'
  },
  stepper: {
    backgroundColor: theme.palette.secondary.black,
  },
  step: {
    color: theme.palette.secondary.main
  }
}));
