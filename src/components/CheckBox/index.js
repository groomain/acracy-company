import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import styles from './styles';
import clsx from 'clsx';

export const CustomCheckBox = ({ size, ...props }) => {
  const classes = styles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon, classes[size])} />}
      icon={<span className={clsx(classes.icon, classes[size])} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
};

export default CustomCheckBox;
