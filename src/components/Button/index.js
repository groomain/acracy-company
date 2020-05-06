import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export const CustomButton = ({ loading, title, theme, rippleDisabled, type, handleClick, variant, color, ...props }) => {
  const classes = styles();

  return (
    <Button
      type={type}
      onClick={handleClick}
      disableRipple={rippleDisabled}
      className={`${classes.button} ${classes[theme]}`}
      {...props}
    >
      {loading ? <CircularProgress color={color || "secondary"} size={28} /> : title}
    </Button >
  );
};

export default CustomButton;
