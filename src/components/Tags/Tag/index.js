import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import clsx from "clsx";

import styles from './styles';
import CustomCheckbox from '../../CheckBox';

const Tag = ({ title, isPrimaryColor, multipleChoice, isWithInput, placeholder, isWithCheckbox, tagType, onCheckChange, checkedArray, isGrey, isDisabled, ...props }) => {
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
  let disabled = checkedArray?.length > 2 && checkedArray?.indexOf(title) === -1

  if (isWithCheckbox) {
    content = (
      <div className={classes.checkboxTagContainer}>
        <span>{title}</span>
        <span className={clsx(classes.tag, classes.checkboxTagContent)}>
          {tagType}
          <CustomCheckbox
            shape="rounded"
            onChange={onCheckChange}
            className={classes.checkbox}
            disabled={isDisabled || disabled}
            checked={checkedArray}
          />
        </span>
      </div>
    )
  };


  if (multipleChoice) {
    let checked = checkedArray?.indexOf(title)
    content = (
      <div className={classes.checkboxTagContainer}>
        <span>{title}</span>
        <span className={clsx(classes.tag, classes.checkboxTagContent)}
          onClick={!disabled && onCheckChange}
          style={{ 'cursor': 'pointer' }}
        >
          {tagType}
          <CustomCheckbox
            shape="rounded"
            className={classes.checkbox}
            disabled={disabled}
            checked={checked > -1}
          />
        </span>
      </div>
    )
  };

  return (
    <Box m={0.5} className={clsx(classes.tag, isPrimaryColor && classes.primaryColor, isWithInput && classes.withInput, isGrey ? classes.isGrey : null)} >
      {content}
    </Box>
  )
};

export default Tag;