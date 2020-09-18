import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";
import smallIcon from '../../assets/icons/checkbox-checked-black.svg';

export default makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.secondary.medium}`,
    height: 64,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'rgba(86, 94, 86, 0.1)',
    transition: theme.transitions.create(['border-color']),
    caretColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: 14,
    margin: '10px auto 0',
    boxSizing: 'border-box',
    '&$focused': {
      backgroundColor: 'inherit',
      borderColor: theme.palette.secondary.main,
    },
    '& .MuiFilledInput-input': {
      padding: '0 22px',
      color: theme.palette.secondary
    }
  },
  error: {
    borderColor: theme.palette.primary.danger
  },
  focused: {},
  input: {
    padding: '22px 50px 22px 30px !important;',
    alignItems: 'center',
    fontFamily: "Basier Medium",
    '&:hover, &:focus': {
      borderRadius: 15,
      borderColor: theme.palette.secondary.main,
      background: theme.palette.secondary.dark,
    }
  },
  open: {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  icon: {
    fill: '#fff',
    transform: 'translate(-22px, 7px)',
    transition: '.3s'
  },
  iconClosed: {
    transform: 'translate(-22px, 7px) rotate(180deg)'
  },
  dropdownStyle: {
    overflowStyle: 'none', // IE scrollbar
    scrollbarWidth: 'none', // Firefox scrollbar
    scrollbarColor: 'transparent transparent', // Firefox scrollbar
    '&::-webkit-scrollbar': {
      width: 0,
    },
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.main,
    borderRadius: 15,
    border: `1px solid ${theme.palette.secondary.medium}`,
    boxShadow: 'none',
    margin: '.5rem 0',
    '& .MuiList-root': {
      padding: 0,

    }
  },
  menuItem: {
    margin: 0,
    height: 51,
    fontSize: 14,
    padding: '0 17px',
    fontFamily: "Basier Medium",
    '& div span': {
      fontFamily: "Basier Medium",
    },
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.palette.secondary.medium}`,
    },
    '&:hover': {
      background: `${theme.palette.primary.main} !important`,
      color: `${fade(theme.palette.secondary.black, 0.9)}`,
    },
    '&:hover div span': {
      color: `${fade(theme.palette.secondary.black, 0.9)}`,
    },
  },
  menutItemWithFocus: {
    '&:hover, &:focus': {
      background: `${theme.palette.primary.main} !important`,
      color: `${fade(theme.palette.secondary.black, 0.9)}`,
    },
  },
  selected: {
    '& div span': {
      color: `white`,
    },
    '&:hover span span span:before': {
      backgroundImage:
        `url(${smallIcon})`
    }
  }
}));
