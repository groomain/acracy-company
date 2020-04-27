import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export const CustomButton = ({ loading, title, type, handleClick, variant, color, ...props }) => {
  const classes = styles();
  return (
    <Button
      variant={variant || "outlined"}
      color={color || "secondary"}
      type={type}
      onClick={handleClick}
      className={classes.button}
    >
      {loading ? <CircularProgress color={color || "secondary"} size={28} /> : title}
    </Button >
  );
};

export default CustomButton;