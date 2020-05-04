import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  draftsWrapper: {
    background: theme.palette.secondary.dark,
    minHeight: 230,
    borderRadius: 15,
    padding: '15px',
    margin: '1rem 0',
    alignItems: 'center',
    position: 'relative'
  },
  noDrafts: {
    color: theme.palette.secondary.medium,
    lineHeight: 1.4
  }
}));