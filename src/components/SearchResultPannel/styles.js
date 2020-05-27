import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  pannel: {
    padding: '15.3rem 0 5rem 0',
    position: 'sticky',
    top: 0,
  },
  researchGridItem: {
    padding: '30px 0',
    height: 33,
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.palette.primary.main,
    height: 22,
    margin: '.5rem .5rem 0 0'
  },
  collaboratorsGridItem: {
    padding: '35px 0'
  },
  iconContainer: {
    height: '30vh',
    alignItems: 'center'
  }
}));
