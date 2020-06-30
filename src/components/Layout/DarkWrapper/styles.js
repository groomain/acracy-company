import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  darkWrapper: {
    background: theme.palette.secondary.dark,
    minHeight: 230,
    borderRadius: 15,
    padding: '15px',
    margin: '1rem 0',
    position: 'relative'
  }
}));