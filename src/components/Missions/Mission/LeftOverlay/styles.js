import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  container: {
    backgroundColor: 'rgb(13, 17, 13, 0.96)',
    width: "100%",
    height: "100%",
    position: 'relative',
    right: '100%',
    borderRadius: '15px 0 0 15px',
    maxHeight: 323,
    padding: '54px 0'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 25px',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover svg g, &:hover svg path': {
      stroke: theme.palette.primary.main
    },
    '&:hover': {
      color: theme.palette.primary.main
    },
    '& svg': {
      marginTop: 6
    }
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    cursor: 'pointer',
    '&:hover g': {
      stroke: `${theme.palette.primary.main}`,
    },
  }
}));
