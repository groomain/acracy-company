import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import styles from '../../../utils/styles';

const Sidebar = ({ children }) => {
  const classes = styles();

  return (
    <Grid item xs={12} md={6} className={classes.sidebarDiv}>
        <Grid container justify="center" className={classes.sidebarWrapper}>
          <Grid item xsd={6}>
            {children}
          </Grid>
        </Grid>
    </Grid>
  );
};

export default Sidebar;