import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles';
import CustomLoader from '../Loader';


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
      {loading
        ? (
          <div style={{ paddingTop: '4%' }}>
            <CustomLoader size={28} />
          </div>
        )
        : title
      }
    </Button >
  );
};

export default CustomButton;
