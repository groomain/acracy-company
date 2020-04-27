import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import CustomTextField, { CustomPasswordField } from "../CustomTextField";

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

const SignUpForm = (props) => {
  const { t } = useTranslation();
  const { signupErrorMessage, signupLoading } = useSelector(state => ({
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
    signupLoading: state.getIn(['app', 'signupLoading'])
  }));
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { email, password, confirmPassword } = values;

  console.log(errors);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <CustomTextField
        name="email"
        type="email"
        value={email}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('email')}
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email ? t('emailRequired') : ''}
      />
      <CustomPasswordField
        name="password"
        value={password}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('password')}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password ? t('passwordRequired') : ''}
      />
      <CustomPasswordField
        name="confirmPassword"
        value={confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('confirmPassword')}
        error={!!touched.confirmPassword && !!errors.confirmPassword}
        helperText={touched.confirmPassword && errors.confirmPassword ? t('confirmPasswordRequired') : ''}
      />
      <CustomButton
        type="submit"
        handleClick={() => handleSubmit({ email, password })}
        loading={signupLoading}
        title={t('signUpSubmit')}
      >
      </CustomButton>
      <Typography variant={'subtitle2'}>{signupErrorMessage}</Typography>
    </Grid>
  );
};

export default SignUpForm;
