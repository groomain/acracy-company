import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../../utils/styles';

const Sidebar = ({ children }) => {
  const classes = styles();

  return (
    <Grid item xs={5} container className={classes.sidebarDiv}>
      <Grid item xs={2}></Grid>
      <Grid item xs={7}>
        {children}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Sidebar;