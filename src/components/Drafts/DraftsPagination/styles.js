import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  pagination: {
    position: 'absolute',
    top: '-1.5rem',
    right: -5,
    display: 'flex'
  },
  paginationContainer: {
    margin: '0 3rem',
    alignItems: 'flex-end'
  },
  paginationButton: {
    height: 45,
    width: 45,
    margin: '0 .3rem',
    border: `1px solid ${theme.palette.secondary.medium}`,
    '&:hover': {
      borderColor: theme.palette.secondary.main
    }
  }
}));