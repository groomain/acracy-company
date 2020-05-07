import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";
import basierRegular from '../../utils/configureMaterialTheme';
import profilIcon from '../../assets/icons/profil-roll-out-black.svg';
import projectIcon from '../../assets/icons/livrable-black.svg';

export default makeStyles(theme => ({
  root: {
    borderRadius: 15,
    padding: '0 30px',
    background: theme.palette.secondary.main,
    '& .MuiAutocomplete-endAdornment': {
      transform: 'translate(-30px)',
    }
  },
  input: {
    height: 84,
    borderRadius: 15,
    padding: '0 30px',
    fontFamily: basierRegular,
    border: 'none',
    boxSizing: 'border-box',
    fontSize: 17,
    color: theme.palette.secondary.medium,
    margin: '0 15px'
  },
  paper: {
    margin: '.7rem 0',
    borderRadius: 15,
    '& ::-webkit-scrollbar': {
      width: '0 !important',
    },
    overflowStyle: 'none', // IE scrollbar
    scrollbarWidth: 'none', // Firefox scrollbar
    scrollbarColor: 'transparent transparent', // Firefox scrollbar
  },
  listbox: {
    minHeight: 400,
  },
  option: {
    height: 60,
    transition: '.2s',
    color: theme.palette.secondary.medium,
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${fade(theme.palette.secondary.light, 0.05)}`
    },
    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  groupLabel: {
    color: theme.palette.secondary.black,
    fontSize: 17,
    padding: '.7rem 3rem',

    '&:nth-of-type(odd)': {
      backgroundImage: `url(${projectIcon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 45%'
    }
  }
}));
