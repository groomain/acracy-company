import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#26a69a',
    },
    secondary: {
      main: '#fff',
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
