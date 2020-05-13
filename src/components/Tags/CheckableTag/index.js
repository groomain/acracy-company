import React from 'react';
import { Checkbox } from '@material-ui/core';

import clsx from "clsx";
import styles from './styles';

const CheckableTag = ({ title, isGrey, ...props }) => {
  const classes = styles();

  return (
    <Checkbox
      title={title}
      isGrey={isGrey}
      classes={{ root: classes.root, disabled: classes.disabled }}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>{title}</span>}
      icon={<span className={clsx(classes.icon, isGrey && classes.greyTag)}>{title}</span>}
      inputProps={{ 'aria-label': 'decorative checkbox', value: { title } }}
      {...props}
    />
  )
};

export default CheckableTag;