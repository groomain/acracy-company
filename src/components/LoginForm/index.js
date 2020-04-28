import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import Grid from '@material-ui/core/Grid';
import CustomTextField, { CustomPasswordField } from "../CustomTextField";
import Typography from "@material-ui/core/Typography";
import CustomSnackBar from "../SnackBar";

const LoginForm = (props) => {
  const [open, setOpen] = React.useState(false);

  const { loginErrorMessage, loginLoading } = useSelector(state => ({
    loginErrorMessage: state.getIn(['app', 'loginErrorMessage']),
    loginLoading: state.getIn(['app', 'loginLoading'])
  }));
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { email, password } = values;

  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <CustomTextField
        id="email"
        type='email'
        label={t('email')}
        placeholder={t('email')}
        value={email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email ? t(errors.email) : ''}
      />
      <CustomPasswordField
        id="password"
        label={t('password')}
        placeholder={t('password')}
        value={password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password ? t(errors.password) : ''}
      />
      <CustomButton
        type="submit"
        handleClick={() => handleSubmit({ email, password })}
        loading={loginLoading}
        title={t('loginSubmit')}
        theme="filledButton"
      />
      {/*<Typography variant={'subtitle2'}>{loginErrorMessage}</Typography>*/}
      <CustomSnackBar message={loginErrorMessage} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default LoginForm;
