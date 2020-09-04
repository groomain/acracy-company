import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    width: 705
  },
  rootModeMission: {
    backgroundColor: '#151d15',
    borderRadius: 15,
    padding: 30,
    width: 643
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
  avatarModeMission: {
    width: 162,
    height: 162,
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
    fontFamily: 'basierRegular',
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
    display: 'flex',
    alignItems: 'center',
    direction: "column"
  },
  blackCardModeMission: {
    height: 287,
    minWidth: 337,
  },
  name: {
    fontFamily: "BodoniBook",
    fontSize: 68,
    lineHeight: 1
  },
  nameModeMission: {
    fontSize: 34,
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
  textModeMission: {
    fontSize: 17,
  },
  selected: {
    color: theme.palette.primary.main
  },
  button: {
    width: '100%'
  },
  middleButton: {
    margin: '0 1rem'
  },
  customButtonContainer: {
    width: '100%',
    marginTop: 80
  },
  customButtonContainerModeMission: {
    marginTop: 20
  },
  customButtonLeft: {
    marginRight: 'auto',
    width: 215
  },
  customButtonRight: {
    marginLeft: 'auto',
    width: 215
  },
  customButton: {
    margin: 'auto',
    width: 215
  },
  customButtonModeMission: {
    marginLeft: 5,
    width: 150
  },
  star: {
    padding: 10,
    paddingTop: 25
  },
  profilElementItem: {
    width: 357,
    maxHeight: 87
  },
  profilElementItemModeMission: {
    width: 235,
    maxHeight: 87
  },
  profilElementContainer: {
    maxHeight: 287,
  },
  profilElementContainerModeMission: {
    maxHeight: 287,
    maxWidth: 235
  },
  firstBlock: {
    width: "100%",
    margin: 'auto'
  },
  firstBlockModeMission: {
    width: "90%",
  }
}));
