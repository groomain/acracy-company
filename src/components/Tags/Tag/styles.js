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
    padding: '0 3px 0 1rem',
  },
  checkboxTagContent: {
    padding: '.3rem 1rem',
    marginLeft: '1rem'
  }
}));
