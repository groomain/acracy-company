import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { RequestForm, SubmitForm } from '../../components/ForgotPasswordForm';
import { requestPasswordCodeLaunched, submitNewPasswordLaunched } from '../../components/App/reducer';
import styles from './styles';
import CustomNavLink from '../../components/CustomNavLink';

const ForgotPassword = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const { forgotPasswordStep } = useSelector(state => ({
    forgotPasswordStep: state.getIn(['app', 'forgotPasswordStep'])
  }));
  const { t } = useTranslation();

  //  Forms Data
  const RequestInitialValues = {
    email: ''
  };

  const SubmissionInitialValues = {
    code: '',
    password: '',
    confirmPassword: ''
  };

  // Forms Submitting Functions
  const requestCode = (payload) => {
    dispatch(requestPasswordCodeLaunched(payload));
  };

  const submitNewPassword = (payload) => {
    dispatch(submitNewPasswordLaunched(payload));
  };

  // Forms Validation Schemas
  const RequestValidationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('emailNotValid')
      .required('emailRequired')

  });

  const SubmissionValidationSchema = Yup.object().shape({
    code: Yup
      .string()
      .required('codeRequired'),
    password: Yup
      .string()
      .required('passwordRequired'),
    confirmPassword: Yup
      .string()
      .test('password-match', t('passwordMismatch'), function (confPass) {
        return confPass === this.parent.password;
      })
      .required('confirmPasswordRequired')
  });

  const renderForms = () => {
    if (forgotPasswordStep === 1) {
      return (
        // Requesting Code
        <Formik
          render={props => <RequestForm {...props} />}
          initialValues={RequestInitialValues}
          validationSchema={RequestValidationSchema}
          onSubmit={requestCode}
        />
      );
    }
    return (
      // Sending New Password
      <Formik
        render={props => <SubmitForm {...props} />}
        initialValues={SubmissionInitialValues}
        validationSchema={SubmissionValidationSchema}
        onSubmit={submitNewPassword}
      />
    );
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Typography className={classes.titleForgotYourPassword}>La Pilule Rouge</Typography>
      <Typography className={classes.titleFormForgotYourPassword}> Mot de passe oublié </Typography>
      {renderForms()}
      <CustomNavLink to="/login" text={t('loginButton')} />
    </Grid>
  );
};

export default ForgotPassword;
