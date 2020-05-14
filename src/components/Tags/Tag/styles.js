import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  tag: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.medium,
    borderRadius: 50,
    cursor: 'default',
    fontFamily: "Basier Regular",
    fontSize: 14
  },
  primaryColor: {
    background: theme.palette.primary.main
  },
  contentBox: {
    margin: '.5rem 1rem'
  },
  smallTagContentBox: {
    margin: '.2rem 1rem'
  },
  withInput: {
    background: theme.palette.secondary.light,
    '& input': {
      border: 'none',
      boxShadow: 'none',
      background: 'transparent',
      '&:focus': {
        outline: 'none'
      }
    }
  },
  checkboxTagContainer: {
    color: theme.palette.secondary.medium,
    padding: '4px 3px 2px 1rem',
  },
  checkboxTagContent: {
    padding: '.3rem 0 .3rem 1rem',
    marginLeft: '1rem',
  },
  checkbox: {
    padding: 0,
    marginLeft: '1rem'
  }
}));
