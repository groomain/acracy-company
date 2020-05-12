import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';

const DraftWrapper = ({ children, ...props }) => {
  const classes = styles();
  return (
    <Grid className={classes.draft} {...props}>
      {children}
    </Grid>
  );
};

export default DraftWrapper;