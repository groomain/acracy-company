import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { confirmSignupLaunched } from '../../components/App/reducer';
import { Grid, Typography, Box } from '@material-ui/core/';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import ConfirmSignupForm from '../../components/Forms/ConfirmSignupForm';
import styles from './styles';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();
  const [emailAddress] = useState('prénomnom@email.com')

  // Form data
  const initialValues = {
    code: '',
    username: ''
  };

  // Form Submitting Function
  const confirmSignup = (credentials) => {
    dispatch(confirmSignupLaunched(credentials));
  };

  // Form Validation Schema
  const ValidationSchema = Yup.object().shape({
    code: Yup
      .string()
      .required(),
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.connectionDiv}
      >
        <Main>
          <Box my={3}>
            <Typography variant="h1">{t('confirmSignupPage.title')}</Typography>
            <Box my={2}>
              <Typography variant="body1">{t('confirmSignupPage.subtitle')} <span className={classes.email}>{emailAddress}</span></Typography>
            </Box>
          </Box>
          <Formik
            render={props => <ConfirmSignupForm {...props} />}
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={confirmSignup}
          />
        </Main>
        <Sidebar>
          Say something here
        </Sidebar>
      </Grid>
    </>
  );
};

export default SignUpPage;
