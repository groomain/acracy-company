import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  draftsWrapper: {
    background: theme.palette.secondary.dark,
    minHeight: 230,
    borderRadius: 15,
    padding: '15px',
    alignItems: 'center',
    position: 'relative',
    transform: 'translate(-2rem) !important',
    width: 'calc(100% + 4rem)'
  },
  noDrafts: {
    color: theme.palette.secondary.medium,
    lineHeight: 1.4
  }
}));
