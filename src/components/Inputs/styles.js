import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.secondary.medium}`,
    height: 84,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'rgba(86, 94, 86, 0.1)',
    transition: theme.transitions.create(['border-color']),
    caretColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    fontWeight: 500,
    margin: '.8rem auto 0',
    boxSizing: 'border-box',
    '&$focused': {
      backgroundColor: 'inherit',
      borderColor: theme.palette.secondary.main,
    },
    '& .MuiFilledInput-input': {
      padding: '0 30px',
      color: theme.palette.secondary
    }
  },
  focused: {},
  input: {
    padding: '0 0 0 30px',
    display: 'flex',
    alignItems: 'center',
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
    transform: 'translate(-30px, 7px) scale(1.5)',
    transition: '.3s'
  },
  iconClosed: {
    transform: 'translate(-30px, 7px) scale(1.5) rotate(180deg)'
  },
  dropdownStyle: {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.main,
    borderRadius: 15,
    border: `1px solid ${theme.palette.secondary.medium}`,
    boxShadow: 'none',
    margin: '.5rem -1rem',
    '& .MuiList-root': {
      padding: 0,
    }
  },
  menuItem: {
    margin: 0,
    height: 61,
    fontSize: 17,
    padding: '0 30px',
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.palette.secondary.medium}`,
    },
    '&:hover, &:focus': {
      background: theme.palette.primary.main,
      color: `${fade(theme.palette.secondary.black, 0.9)}`,
    }
  },
  selected: {
    background: `${theme.palette.primary.main} !important`,
    color: `${fade(theme.palette.secondary.black, 0.9)}`,
  }
}));
