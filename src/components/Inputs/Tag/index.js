import React from 'react';
import { Checkbox } from '@material-ui/core';

import clsx from "clsx";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& span': {
      textAlign: 'left',
      padding: '.5rem 1rem',
      fontSize: 14,
      fontFamily: "Basier Regular",
      color: theme.palette.secondary.medium,
      border: `2px solid transparent`,
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      marginTop: 2
    }
  },
  icon: {
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    '$root.Mui-focusVisible &': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      color: 'inherit',
      background: theme.palette.secondary.main,
    }
  },
  input: {
    textAlign: 'left'
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
    '&:before': {
      display: 'block',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
  }
}));

const StyledCheckbox = ({ title, ...props }) => {
  const classes = useStyles();

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