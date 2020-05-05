import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";
import basierRegular from '../../utils/configureMaterialTheme';

export default makeStyles(theme => ({
  input: {
    width: '50%',
    height: 84,
    borderRadius: 15,
    padding: '0 30px',
    fontFamily: basierRegular,
    border: 'none',
    boxSizing: 'border-box',
    fontSize: 17,
    color: theme.palette.secondary.medium
  },
  focused: {
    borderRadius: 15,
    outline: 'none'
  },
  suggestionsContainerOpen: {
    background: 'white',
    borderRadius: 15,
  },
  suggestionsList: {
    listStyle: 'none',
    color: theme.palette.secondary.medium,
    padding: 0,
    fontSize: 14
  },
  suggestion: {
    height: 55,
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${fade(theme.palette.secondary.mid, 0.1)}`,
    }
  },
  highlighted: {
    background: theme.palette.primary.main,
    cursor: 'pointer',
    '&:first-of-type': {
      borderRadius: '15px 15px 0 0'
    },
    '&:last-of-type': {
      borderRadius: '0 0 15px 15px'
    }
  }
}));
