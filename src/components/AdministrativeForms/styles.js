import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '15px',
    padding: 20,
  },
  container: {
    width: '100%',
    padding: 25
  },
  columnContainer: {
    width: '50%',
    padding: 25
  },
  cardTitle: {
    padding: 20,
    marginBottom: 5
  },
  textfield: {
    maxWidth: '100%',
    marginTop: 15,
    marginBottom: 15,
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    }
  },
  switch: {
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 25
  },
  tva: {
    width: 215,
    paddingLeft: 15
  },
  saveButton: {
    width: 191
  },
  city: {
    marginTop: 15,
    marginBottom: 15,
    width: '68%',
    marginLeft: '4%'
  },
  zipCode: {
    marginTop: 15,
    marginBottom: 15,
    width: '28%',
  },
  phoneMargin: {
    marginTop: -20
  },
  charteContainer: {
    marginTop: 25,
  },
  chart: {
    width: 83,
    height: 84,
    margin: 30,
    '&:hover': {
      cursor: 'pointer'
    },
    '&:active': {
      border: '1px solid transparent'
    },
  }
}));
