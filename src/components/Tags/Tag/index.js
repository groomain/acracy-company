import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import clsx from "clsx";

import styles from './styles';

const Tag = ({ title, isPrimaryColor, isWithInput, placeholder, ...props }) => {
  const classes = styles();

  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let content = title;
  if (isWithInput) {
    content = (
      <input
        id="tagInput"
        placeholder={placeholder}
        value={value}
        autoFocus
        onChange={handleChange}
      />
    );
  };

  return (
    <Grid container {...props}>
      <Typography
        variant={"body2"}
        className={clsx(classes.tag, isPrimaryColor && classes.primaryColor, isWithInput && classes.withInput)}
      >
        {content}
      </Typography>
    </Grid>
  )
};

export default Tag;