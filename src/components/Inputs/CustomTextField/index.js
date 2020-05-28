import React from 'react';
import { InputAdornment, Typography, FilledInput, Box, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styles from '../styles';
// import CustomIconButton from '../../IconButton';
// import eyeOpened from '../../../assets/icons/eye-opened.svg';
// import eyeClosed from '../../../assets/icons/eye-closed.svg';

export const CustomTextField = ({ label, placeholder, type, error, helperText, ...props }) => {
  const classes = styles();
  return (
    <Box style={{ height: '140px' }}>
      <Typography variant='h4'>{label}</Typography >
      <FilledInput
        type={type}
        placeholder={placeholder}
        fullWidth
        error={error}
        classes={{ root: `${classes.root} ${error ? classes.error : null}`, focused: classes.focused }}
        disableUnderline
        {...props}
      />
    </Box >
  );
};

export const CustomPasswordField = ({ label, placeholder, error, helperText, ...props
}) => {
  const classes = styles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box style={{ height: '140px' }}>
      <Typography variant='h4'>{label}</Typography>
      <FilledInput
        classes={{ root: `${classes.root} ${error ? classes.error : null}`, focused: classes.focused, select: classes.select }}
        placeholder={placeholder}
        fullWidth
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        disableUnderline
        error={error}
        {...props}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color="secondary"
            >
              {/* {values.showPassword ? <CustomIconButton icon={eyeOpened} />
                : <CustomIconButton icon={eyeClosed} />}          */}
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )}
      />
    </Box >
  );
};

export default CustomTextField;
