import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";


export default makeStyles(theme => ({
  root: {
    '& .MuiPaper-root': {
      borderRadius: 16
    }
  },
  panel: {
    background: `${fade(theme.palette.secondary.medium, 0.1)}`,
    border: `1px solid ${theme.palette.secondary.medium}`,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 84,
    '& .MuiExpansionPanelSummary-expandIcon': {
      transform: 'rotate(0)'
    }
  },
  detailsContainer: {
    borderTop: `1px solid ${theme.palette.secondary.medium}`,
  },
  arrowIcon: {
    border: `1px solid ${theme.palette.secondary.medium}`,
    padding: '.2rem',
    borderRadius: 50,
    transform: 'scale(1.5)',
    fill: theme.palette.secondary.light
  },
  addIcon: {
    fill: theme.palette.secondary.light
  }
}));
