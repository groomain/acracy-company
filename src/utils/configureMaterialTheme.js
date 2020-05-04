import { createMuiTheme } from '@material-ui/core/styles';
import BasierCircleRegular from '../assets/fonts/BasierCircleRegular.otf';
import BasierCircleMedium from '../assets/fonts/BasierCircleRegular.otf';
import BasierCircleBold from '../assets/fonts/BasierCircleRegular.otf';

const basierRegular = {
  fontFamily: 'BasierRegular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url(${BasierCircleRegular})`
};

const basierMedium = {
  fontFamily: 'BasierMedium',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url(${BasierCircleMedium})`
};

const basierBold = {
  fontFamily: 'BasierBold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url(${BasierCircleBold})`
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ecf805',
      bright: '#fafe00'
    },
    secondary: {
      main: '#fff',
      medium: '#565e56',
      dark: '#151D15',
      light: '#2B362C',
      mid: '#212A21',
      greyButtonActive: '#737a73',
      black: '#162217',
      overlay: '#0d110d',
      inputFadeFilter: '#585858' //add a filter that lightens a bg color
    },
  },
  typography: {
    h1: {
      fontSize: 34,
      fontFamily: basierRegular,
      color: '#fff',
      letterSpacing: '-1.26px',
    },
    h2: {
      fontSize: 17,
      fontFamily: basierMedium,
      color: '#ecf805',
      letterSpacing: '-0.45px',
    },
    h3: {
      fontSize: 22,
      fontFamily: basierRegular,
      color: '#fff',
    },
    h4: {
      fontSize: 17,
      fontFamily: basierMedium,
      color: '#fff',
      letterSpacing: '-0.45px',
    },
    body1: {
      fontSize: 17,
      fontFamily: basierRegular,
      color: '#fff',
      letterSpacing: '-0.45px',
    },
    body2: {
      fontSize: 14,
      fontFamily: basierRegular,
      color: '#fff',
    },
    fontFamily: [basierRegular, basierMedium, basierBold].join(','),
  }
});
