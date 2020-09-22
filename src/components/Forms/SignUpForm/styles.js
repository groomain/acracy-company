import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  sidebarDiv: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.sidebarGreen,
    minHeight: '100vh'
  },
  formGridItem: {
    marginTop: 60,
    marginBottom: 60
  },
  stepper: {
    backgroundColor: theme.palette.secondary.black,
    paddingLeft: ".5rem",
  },
  step: {
    width: '40%',
    '&:not(:first-child)': {
      marginLeft: '2rem'
    }
  },
  stepButton: {
    padding: 0
  },
  signupRows: {
    paddingTop: theme.spacing(2)
  },
  icon: {
    background: theme.palette.secondary.medium,
    width: 37,
    height: 37,
    padding: '5.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.secondary.black,
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'transparent',
    backgroundClip: 'content-box',
    fontFamily: "Basier Bold"
  },
  active: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.medium,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    backgroundClip: 'content-box',
    padding: '5.5px'
  },
  inactiveLabel: {
    color: theme.palette.secondary.medium
  },
  link: {
    fontsize: 17,
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary.bright
    }
  }
}));
