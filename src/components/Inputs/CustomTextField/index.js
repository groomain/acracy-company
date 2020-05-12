import React from 'react';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import styles from '../styles';
import CustomIconButton from '../../IconButton';
import eyeOpened from '../../../assets/icons/eye-opened.svg';
import eyeClosed from '../../../assets/icons/eye-closed.svg';

export const CustomTextField = ({ label, placeholder, type, error, helperText, ...props }) => {
  const classes = styles();
  return (
    <Box style={{ height: '140px' }}>
      <Typography variant='body1' error={error}>{label}</Typography >
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
      <Typography error={error} htmlFor="filled-adornment-password" variant='body1'>{label}*</Typography>
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
              {/* {values.showPassword ? <CustomIconButton icon={eyeOpened} />
                : <CustomIconButton icon={eyeClosed} />}          */}
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
