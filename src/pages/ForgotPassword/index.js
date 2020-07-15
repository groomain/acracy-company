import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Grid } from '@material-ui/core';
import { RequestForm, SubmitForm } from '../../components/Forms/ForgotPasswordForm';
import { requestPasswordCodeLaunched, submitNewPasswordLaunched, handleCurrentStep } from '../../components/App/reducer';
import sharedStyles from '../../utils/styles';

const ForgotPassword = () => {
  const sharedClasses = sharedStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleCurrentStep(0));
  }, [dispatch]);

  const { forgotPasswordStep } = useSelector(state => ({
    forgotPasswordStep: state.getIn(['app', 'forgotPasswordStep'])
  }))

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
    <Grid className={`${sharedClasses.pannelLayout} ${sharedClasses.container}`}
    >
      <Grid item xs={7} container>
        <Grid item xs={3} />
        <Grid item xs={7} >
          {renderForms()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
