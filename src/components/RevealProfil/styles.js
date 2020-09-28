import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    width: 705,
    minHeight: '100vh',
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
    position: 'absolute',
    zIndex: 3
  },
  avatar: {
    width: 214,
    height: 214,
    backgroundColor: theme.palette.secondary.black,
    '@media (max-width: 960px)': {
      width: '80%',
      height: '75%',
      marginTop: '20%',
      right: '65%'
    }
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
    width: 121,
    '@media (max-width:960px)': {
      width: 2
    }
  },
  profession: {
    fontFamily: 'basierRegular',
    color: '#ecf805',
    marginTop: 7
  },
  checkContainer: {
    marginTop: 40,
    maxWidth: 360,
  },
  missionMobile: {
    '@media (max-width:960px)': {
      position: 'absolute',
      marginTop: '30%',
      right: '52%',
      width: '45%',
      textAlign: 'center'
    },
  },
  blackCard: {
    backgroundColor: theme.palette.secondary.mid,
    minHeight: 287,
    maxWidth: 337,
    borderRadius: 15,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    direction: 'column',
    '@media (max-width:960px)': {
      minHeight: 10,
      maxWidth: '50%',
    }
  },
  blackCardModeMission: {
    height: 287,
    minWidth: 337,
  },
  blackCardModeMissionMobile: {
    '@media (max-width:960px)': {
      display: 'none',
    }
  },
  name: {
    fontFamily: 'BodoniBook',
    fontSize: 68,
    lineHeight: 1,
    '@media (max-width:960px)': {
      fontSize: 35
    }
  },
  nameModeMission: {
    fontSize: 34,
  },
  textContainer: {
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    fontFamily: 'BodoniBook',
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
    width: '100%',
    '@media (max-width: 960px)': {
      right: '50%',
      marginTop: '120%',
      width: '80%'
    }
  },
  topButton: {
    '@media (max-width: 960px)': {
      left: '110%',
      marginBottom: '130%'
    }
  },
  middleButton: {
    margin: '0 1rem',
    '@media (max-width: 960px)': {
      left: '10%',
    }
  },
  buttonButton: {
    '@media (max-width: 960px)': {
      right: '90%',
      marginTop: '130%'
    }
  },
  customButtonContainer: {
    width: '100%',
    marginTop: 80,
    '@media (max-width:960px)': {
      width: '50%',
      marginTop: '75%'
    }
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
    width: 215,
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
    minHeight: 87
  },
  middleProfilElementItem: {
    margin: '.5rem auto'
  },
  profilElementItemModeMission: {
    width: 235,
    minHeight: 87
  },
  profilElementContainer: {
    marginLeft: '.8rem'
  },
  profilElementContainerModeMission: {
    maxHeight: 287,
    maxWidth: 235
  },
  firstBlock: {
    width: '100%',
    margin: 'auto'
  },
  firstBlockModeMission: {
    width: '90%',
  }
}));
