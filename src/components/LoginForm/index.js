import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import Grid from '@material-ui/core/Grid';
import CustomTextField, { CustomPasswordField } from "../Inputs/CustomTextField";
import CustomSnackBar from "../SnackBar";
import {NavLink} from "react-router-dom";
import styles from "./styles";

const LoginForm = (props) => {
  const classes = styles();
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
      className={classes.container}
    >
      <CustomTextField
        id="email"
        type='email'
        label={t('email')}
        placeholder={t('yourEmail')}
        value={email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email ? t(errors.email) : ''}
      />
      <CustomPasswordField
        id="password"
        label={t('password')}
        placeholder={t('yourPassword')}
        value={password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password ? t(errors.password) : ''}
      />
      <NavLink to={'/password'} className={classes.navLink}>{t('forgotPasswordButton')}</NavLink>
      <Grid container direction={'row'} jusitfy={'flex-end'}>
        <Grid item xs={9}/>
        <Grid item xs={3}>
      <CustomButton
        type="submit"
        handleClick={() => handleSubmit({ email, password })}
        loading={loginLoading}
        title={t('loginSubmit')}
        theme="filledButton"
      />
        </Grid>
      </Grid>
      <CustomSnackBar message={loginErrorMessage} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default LoginForm;
