import React from 'react';
import { Checkbox } from '@material-ui/core';

import clsx from "clsx";
import styles from './styles';

const CheckableTag = ({ title, isGrey, handleChecked, ...props }) => {
  const classes = styles();

  return (
    <Checkbox
      onChange={handleChecked}
      title={title}
      classes={{ root: classes.root, disabled: classes.disabled }}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>{title}</span>}
      icon={<span className={clsx(classes.icon, isGrey ? classes.greyTag : null)}>{title}</span>}
      inputProps={{ 'aria-label': 'decorative checkbox', value: { title } }}
      {...props}
    />
  )
};

export default CheckableTag;