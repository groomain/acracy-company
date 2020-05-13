import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& span': {
      textAlign: 'left',
      padding: '.5rem 1rem',
      fontSize: 14,
      fontFamily: "Basier Regular",
      color: theme.palette.secondary.medium,
      border: `2px solid transparent`,
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      marginTop: 2
    }
  },
  icon: {
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    '$root.Mui-focusVisible &': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      color: 'inherit',
      background: theme.palette.secondary.main,
    }
  },
  greyTag: {
    backgroundColor: theme.palette.secondary.light,
    'input:disabled ~ &': {
      boxShadow: 'none',
      color: 'inherit',
      background: theme.palette.secondary.light,
    }
  },
  input: {
    textAlign: 'left'
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
    '&:before': {
      display: 'block',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
  }
}));
