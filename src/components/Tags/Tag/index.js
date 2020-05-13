import React, { useState } from 'react';
import { Typography, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import clsx from "clsx";

import styles from './styles';
import CustomCheckbox from '../../CheckBox';

const Tag = ({ title, isPrimaryColor, isWithInput, placeholder, isWithCheckbox, tagType, ...props }) => {
  const classes = styles();

  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let content = (
    <div style={{ margin: '.5rem 1rem' }}>{title}</div>
  );

  if (isWithInput) {
    content = (
      <div style={{ margin: '.5rem 1rem' }}>
        <input
          id="tagInput"
          placeholder={placeholder}
          value={value}
          autoFocus
          onChange={handleChange}
        />
      </div>
    );
  };

  if (isWithCheckbox) {
    content = (
      <div className={classes.checkboxTagContainer}>
        <span>{title}</span>
        <span className={clsx(classes.tag, classes.checkboxTagContent)}>
          {tagType}
          <FormControlLabel
            control={
              <Checkbox
                icon={
                  <CustomCheckbox
                    size="small"
                    shape="rounded"
                  />
                }
              />
            }
          />
        </span>
      </div>
    )
  };

  return (
    <Grid container {...props}>
      <div className={clsx(classes.tag, isPrimaryColor && classes.primaryColor, isWithInput && classes.withInput)} >
        {content}
      </div>
    </Grid>
  )
};

export default Tag;