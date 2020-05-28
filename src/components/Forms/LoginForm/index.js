import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../Button';
import Grid from '@material-ui/core/Grid';
import CustomTextField, { CustomPasswordField } from "../../Inputs/CustomTextField";
import { NavLink } from "react-router-dom";

import styles from "./styles";

const LoginForm = (props) => {
  const classes = styles();

  const { loginLoading } = useSelector(state => ({
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
      <form onSubmit={handleSubmit}>
        <CustomTextField
          id="email"
          type='email'
          label={t('email') + '*'}
          placeholder={t('yourEmail')}
          value={email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email ? t(errors.email) : ''}
        />
        <CustomPasswordField
          id="password"
          label={t('password') + '*'}
          placeholder={t('yourPassword')}
          value={password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password ? t(errors.password) : ''}
        />
        <NavLink to={'/password'} className={classes.navLink}>{t('forgotPasswordButton')}</NavLink>
        <Grid container direction={'row'} justify={'flex-end'}>
          <CustomButton
            type="submit"
            loading={loginLoading}
            title={t('loginSubmit')}
            theme="filledButton"
          />
        </Grid>
      </form>
    </Grid>
  );
};

export default LoginForm;
