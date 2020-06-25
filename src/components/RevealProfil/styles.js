import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    width: 705
  },
  upCard: {
    height: 240
  },
  avatarContainer: {
    position: "absolute",
    zIndex: 3
  },
  avatar: {
    width: 214,
    height: 214,
    backgroundColor: theme.palette.secondary.black
  },
  authorContainer: {
    marginTop: 8,
    marginBottom: 35
  },
  authorTypo: {
    marginLeft: 10
  },
  tagPreSelect: {
    height: 35
  },
  preSelect: {
    width: 108
  },
  noSelect: {
    width: 120
  },
  switch: {
    width: 121
  },
  profession: {
    color: '#ecf805',
    marginTop: 7
  },
  checkContainer: {
    marginTop: 40,
    maxWidth: 360
  },
  blackCard: {
    backgroundColor: theme.palette.secondary.mid,
    height: 287,
    maxWidth: 337,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center'
  },
  name: {
    fontFamily: "BodoniBook",
    fontSize: 68,
    lineHeight: 1
  },
  textContainer: {
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    fontFamily: "BodoniBook",
    fontSize: 32,
    textAlign: 'justify'
  },
  selected: {
    color: theme.palette.primary.main
  },
  customButtonContainer: {
    width: '100%',
    marginTop: 80
  },
  customButton: {
    marginRight: 'auto',
    width: 215
  },
  star: {
    padding: 10,
    paddingTop: 25
  },
  tagContainer: {
    padding: 20,
    paddingTop: 5
  },
  tag: {
    width: 'auto',
    margin: 5
  },
  profilElementItem: {
    width: 357,
    maxHeight: 87
  },
  profilElementContainer: {
    maxHeight: 287
  }
}));
