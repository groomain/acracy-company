import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 490,
    backgroundColor: "#353f36",
  },
  title: {
    marginLeft: 10
  },
  list: {
    marginTop: 25,
    width: '100%',
  },
  listItem: {
    height: 75,
    marginTop: 5,
    marginBottom: 5
  },
  avatar: {
    width: 64,
    marginRight: 30
  },
  littleIcon: {
    margin: 6
  },
  textItem: {
    width: 280
  },
  text: {
    fontFamily: "Basier Regular",
    fontSize: 22,
  },
  secondaryText: {
    color: "#fff",
    fontFamily: "Basier Regular",
    fontSize: 17,
  },
  textDone: {
    color: `${theme.palette.primary.main}`
  }
}));
