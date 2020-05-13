import React from 'react';
import { Checkbox } from '@material-ui/core';

import clsx from "clsx";
import styles from './styles';

const StyledCheckbox = ({ title, ...props }) => {
  const classes = styles();

  return (
    <Checkbox
      classes={{ root: classes.root, disabled: classes.disabled }}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>{title}</span>}
      icon={<span className={classes.icon}>{title}</span>}
      inputProps={{ 'aria-label': 'decorative checkbox', value: { title } }}
      {...props}
    />
  );
}

const Tag = ({ title, ...props }) => {

  return (
    <>
      <div>
        <StyledCheckbox title={title} />
        <StyledCheckbox disabled title={title} />
      </div>
    </>
  )
};

export default Tag;