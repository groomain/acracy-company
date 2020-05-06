import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  connectionDiv: {
    backgroundColor: `${theme.palette.secondary.black}`,
    height: '100vh',
    minHeight: 800
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
    fontSize: 100,
    marginBottom: 20
  },
  link_Connection: {
    fontSize: 19,
    color: '#ffffff',
  },
  titleFormConnection: {
    fontSize: 30,
    color: '#ffffff',
    margin: 30,
    fontWeight: 'bold'
  }
}));
