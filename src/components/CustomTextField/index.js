import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
// import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './styles';

export const CustomTextField = ({ error, errorMessage, ...props }) => {
  const classes = styles();
  return (
    <div style={{ height: '90px' }}>
      <TextField variant="filled" error={error} InputProps={{ classes, disableUnderline: true }} {...props} />
    </div>
  );
};

export const CustomPasswordField = ({
  label, error, helperText, ...props
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
    <div style={{ height: '90px' }}>
      <FormControl variant="filled">
        <InputLabel error={error} htmlFor="filled-adornment-password">{label}</InputLabel>
        <FilledInput
          classes={{ root: classes.root, focused: classes.focused }}
          id="filled-adornment-password"
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
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
        />
        <FormHelperText error={error} htmlFor="filled-adornment-password">{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default CustomTextField;
