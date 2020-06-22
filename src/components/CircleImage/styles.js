import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core';

export default makeStyles(theme => ({
  icon: {
    backgroundBlendMode: 'hue',
    backgroundImage: 'linear-gradient(to bottom, #000000, #000000)',
    filter: 'saturate(0)',
  },
  avatarLarge: {
    width: '123px',
    height: '122px',
    backgroundColor: theme.palette.secondary.mid
  },
  avatarMedium: {
    width: 91,
    height: 91
  },
  avatarSmall: {
    width: '50px',
    height: '50px',
    backgroundColor: theme.palette.secondary.mid
  },
  partner: {
    width: 94,
    height: 94,
    background: `${fade(theme.palette.secondary.medium, 0.3)}`,
  }
}));