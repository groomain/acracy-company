import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import styles from './styles';
import CustomLoader from '../Loader';


export const CustomButton = ({ loading, title, theme, rippleDisabled, type, handleClick, ...props }) => {
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

CustomButton.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  /**
   * Defines the button's standard + disabled colors
   */
  theme: PropTypes.oneOf(['primaryButton', 'secondaryButton', 'filledButton', 'asLink', 'disabledFilled', 'disabledOutlined']),
  rippleDisabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  handleClick: PropTypes.func,
};

CustomButton.defaultProps = {
  loading: false,
  theme: null,
  rippleDisabled: false,
  type: 'button',
  handleClick: () => { },
};
export default CustomButton;
