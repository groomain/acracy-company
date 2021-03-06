import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import styles from './styles';
import clsx from 'clsx';

export const CustomCheckBox = ({ size, shape, checked, disabled, noPadding, ...props }) => {
  const classes = styles();

  return (
    <Checkbox
      className={clsx(classes.root, noPadding ? classes.noPadding : null)}
      disableRipple
      color="default"
      checked={checked}
      disabled={disabled}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon, classes[size], classes[shape])} />}
      icon={<span className={clsx(classes.icon, classes[size], classes[shape])} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
};

export default CustomCheckBox;
