import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import styles from '../styles';

export const CustomTextField = ({ label, placeholder, type, error, helperText, ...props }) => {
  const classes = styles();
  return (
    <Box style={{ height: '140px' }}>
      <InputLabel variant='body1' error={error}>{label}*</InputLabel >
      <FilledInput
        type={type}
        placeholder={placeholder}
        fullWidth
        error={error}
        classes={{ root: classes.root, focused: classes.focused }}
        disableUnderline
        {...props}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
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
      <InputLabel error={error} htmlFor="filled-adornment-password" variant='body1'>{label}*</InputLabel>
      <FilledInput
        classes={{ root: classes.root, focused: classes.focused, select: classes.select }}
        id="filled-adornment-password"
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
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )}
      />
      <FormHelperText error={error} htmlFor="filled-adornment-password">{helperText}</FormHelperText>
    </Box>
  );
};

export default CustomTextField;
