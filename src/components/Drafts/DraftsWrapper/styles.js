import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  draftsWrapper: {
    background: theme.palette.secondary.dark,
    borderRadius: 15,
    padding: '27px 15px',
    minHeight: '256px',
    alignItems: 'center',
    display: 'block'
  },
  noDrafts: {
    color: theme.palette.secondary.medium,
    lineHeight: 1.4
  }
}));