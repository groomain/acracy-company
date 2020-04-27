import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ecf805',
      bright: '#fafe00'
    },
    secondary: {
      main: '#565e56',
      dark: '#151D15',
      light: '#2B362C',
      mid: '#212A21',
      greyButtonActive: '#737a73',
      black: '#162217'
    },
  },
  typography: {
    subtitle1: {
      fontSize: 30,
      fontWeight: 'italic',
      fontFamily: 'Segeo UI'
    },
    subtitle2: {
      color: 'red',
      fontSize: 13,
      margin: 10,
      height: 20
    },
    body1: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: "bold"
    },
    body2: {
      fontSize: 20,
      marginTop: 10,
    },
    fontFamily: [
      'Roboto',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});
