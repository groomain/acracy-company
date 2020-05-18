import React from 'react';

import { Grid } from '@material-ui/core/';
import styles from './styles';

const DarkWrapper = ({ children, ...props }) => {
  const classes = styles();
  return (
    <Grid container className={classes.darkWrapper}>
      {children}
    </Grid>
  )
};

export default DarkWrapper;