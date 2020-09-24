import { createMuiTheme } from '@material-ui/core/styles';
import BasierCircleRegular from '../assets/fonts/BasierCircleRegular.otf';
import BasierCircleMedium from '../assets/fonts/BasierCircleMedium.otf';
import BasierCircleBold from '../assets/fonts/BasierCircleBold.otf';

export const basierRegular = {
  fontFamily: 'BasierRegular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url(${BasierCircleRegular})`
};

export const basierMedium = {
  fontFamily: 'BasierMedium',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url(${BasierCircleMedium})`
};

export const basierBold = {
  fontFamily: 'BasierBold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url(${BasierCircleBold})`
};

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: 600,
      md: 1000
    },
  },
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
      inputFadeFilter: '#585858', // add a filter that lightens a bg color
      modalGreen: '#283028',
      switchGreen: '#333d34',
      switchThumb: '#c5cab3'
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#162217',
          fontFamily: 'Basier Medium'
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
      '@media (max-width:960px)': {
        fontSize: 27,
      }
    },
    h2: {
      fontSize: 17,
      fontFamily: 'Basier Medium',
      color: '#ecf805',
      letterSpacing: '-0.45px',
      lineHeight: 2,
      '@media (max-width:960px)': {
        fontSize: 15,
      }
    },
    h3: {
      fontSize: 22,
      fontFamily: 'Basier Bold',
      color: '#fff',
      '@media (max-width:960px)': {
        fontSize: 16,
      }
    },
    h4: {
      fontSize: 17,
      fontFamily: 'Basier Medium',
      color: '#fff',
      letterSpacing: '-0.45px',
      lineHeight: 2,
      '@media (max-width:960px)': {
        fontSize: 15,
      }
    },
    subtitle1: {
      fontSize: 21,
      fontFamily: 'Basier Medium',
      letterSpacing: '-0.75px',
      color: '#ecf805',
      '@media (max-width:960px)': {
        fontSize: 16,
      }
    },
    subtitle2: {
      fontSize: 21,
      fontFamily: 'Basier Regular',
      letterSpacing: '-0.75px',
      color: '#fff',
      '@media (max-width:960px)': {
        fontSize: 16,
      }
    },
    body1: {
      fontSize: 17,
      fontFamily: 'Basier Regular',
      color: '#fff',
      letterSpacing: '-0.45px',
      '@media (max-width:960px)': {
        fontSize: 15,
      }
    },
    body2: {
      fontSize: 14,
      fontFamily: 'Basier Regular',
      color: '#fff',
    },
    fontFamily: 'Basier Medium'
  }
});
