import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  connectionDiv: {
    backgroundColor: '#162217',
    height: '100vh',
    minHeight: 800,

  },
  Connection: {
    borderRadius: 5,
    width: 450,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  titleConnection: {
    color: '#ffffff',
    fontStyle: 'italic',
    fontSize: 60,
    marginBottom: 20
  },
  titleFormConnection: {
    fontSize: 30,
    color: '#ffffff',
    margin: 30,
    fontWeight: 'bold'
  },
  searchedTerms: {
    fontSize: 21,
    color: '#ecf805',

  },
  text: {
    fontSize: 34,
    color: '#ffffff',

  },
  textSmall: {
    color: '#ffffff',
    fontSize: 17
  },
  textSmallYellow: {
    fontSize: 17,
    color: '#ecf805'
  },
  textLink: {
    textDecoration: 'underline'
  },
  sidebarDiv: {
    margin: '0 auto',
    backgroundColor: '#353f36',
    height: '100vh'
  },
  stepper: {
    backgroundColor: '#162217'

  },
  formGridItem: {
    paddingLeft: '20vh',
    paddingTop: '10vh'
  }
}));
