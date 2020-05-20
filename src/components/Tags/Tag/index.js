import React, { useState } from 'react';
import { Box } from '@material-ui/core';
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
    <div className={classes.smallTagContentBox}>{title}</div>
  );

  if (isWithInput) {
    content = (
      <div className={classes.contentBox}>
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
          <CustomCheckbox
            size="small"
            shape="rounded"
            className={classes.checkbox}
          />
        </span>
      </div>
    )
  };

  return (

    <Box m={0.5} className={clsx(classes.tag, isPrimaryColor && classes.primaryColor, isWithInput && classes.withInput)} >
      {content}
    </Box>
  )
};

export default Tag;