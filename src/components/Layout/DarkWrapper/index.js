import React from 'react';

import { Grid } from '@material-ui/core/';
import styles from './styles';

const DarkWrapper = ({ children, justify, direction, alignItems, alignContent, ...props }) => {
  const classes = styles();
  return (
    <Grid container
      className={classes.darkWrapper}
      justify={justify}
      alignItems={alignItems}
      direction={direction}>
      {children}
    </Grid>
  )
};

export default DarkWrapper;