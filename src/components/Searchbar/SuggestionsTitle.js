import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  span: {
    height: '50px',
    display: 'flex',
    alignItems: 'center'
  }
}));

const SuggestionTitle = ({ icon, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.span}>
      <img src={icon} />
      {title}
    </div>
  )
};

export default SuggestionTitle;