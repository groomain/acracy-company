import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  dot: {
    height: '18px',
    width: '18px',
    background: theme.palette.primary.main,
    borderRadius: '50%',
    marginRight: '.8rem'
  }
}));

const Dot = () => {
  const classes = useStyles();
  return <div className={classes.dot}></div>
};

export default Dot;