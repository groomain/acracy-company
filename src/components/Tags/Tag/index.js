import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import clsx from "clsx";

import styles from './styles';

const Tag = ({ title, isPrimaryColor, ...props }) => {
  const classes = styles();
  return (
    <Grid
      container
    >
      <Typography
        variant={"body2"}
        className={clsx(classes.tag, isPrimaryColor && classes.primaryColor)}

      >
        {title}
      </Typography>
    </Grid>
  )
};

export default Tag;