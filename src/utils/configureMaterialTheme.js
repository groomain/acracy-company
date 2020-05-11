import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ecf805',
      bright: '#fafe00',
      danger: '#ff565c'
    },
    secondary: {
      main: '#fff',
      medium: '#565e56',
      dark: '#151D15',
      light: '#C5CAB3',
      lighter: '#e4e4e4',
      mid: '#212A21',
      greyButtonActive: '#737a73',
      black: '#162217',
      sidebarGreen: '#353f36',
      overlay: '#0d110d',
      inputFadeFilter: '#585858' //add a filter that lightens a bg color
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#162217',
          fontFamily: "Basier Medium"
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: 34,
      fontFamily: 'Basier Regular',
      color: '#fff',
      letterSpacing: '-1.26px',
    },
    h2: {
      fontSize: 17,
      fontFamily: 'Basier Medium',

      color: '#ecf805',
      letterSpacing: '-0.45px',
    },
    h3: {
      fontSize: 22,
      fontFamily: 'Basier Bold',
      color: '#fff',
    },
    h4: {
      fontSize: 17,
      fontFamily: 'Basier Medium',
      color: '#fff',
      letterSpacing: '-0.45px',
    },
    subtitle1: {
      fontSize: 21,
      fontFamily: 'Basier Medium',
      letterSpacing: '-0.75px',
      color: '#ecf805'
    },
    body1: {
      fontSize: 17,
      fontFamily: 'Basier Regular',
      color: '#fff',
      letterSpacing: '-0.45px',
    },
    body2: {
      fontSize: 14,
      fontFamily: 'Basier Regular',
      color: '#fff',
    },
    fontFamily: "Basier Medium"
  }
});
