import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Grid, Typography, Container } from '@material-ui/core';
import LoginForm from '../../components/Forms/LoginForm';
import { loginLaunched, handleCurrentStep } from '../../components/App/reducer';
import styles from '../../utils/styles';
import { NavLink } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();

  useEffect(() => {
    dispatch(handleCurrentStep(0))
  }, [dispatch]);

  // Form data
  const initialValues = {
    email: '',
    password: ''
  };

  // Form Submitting Function
  const login = (credentials) => {
    dispatch(loginLaunched(credentials));
  };

  // Form Validation Schema
  const ValidationSchema = Yup.object().shape({
    email: Yup
      .string()
      .required('emailRequired'),
    password: Yup
      .string()
      .required('passwordRequired')
  });

  return (
    <Container>
      <Grid
        container
        direction="column"
        className={classes.connectionDiv}
      >
        <Grid xs={12} md={7} container className={classes.container} alignItems="center" style={{flex: 1}}>
          <Grid item xs={false} md={3} />
          <Grid item xs={12} md={7}>
            <Grid container direction="column">
              <Typography variant="h2">acracy entreprise</Typography>
              <Typography variant="h1" className={classes.titleSignIn}>Je m'identifie</Typography>
              <Formik
                render={props => <LoginForm {...props} />}
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={login}
              />
              <div className={classes.hrdivider} />
              <Typography variant={'body1'} className={classes.typo} >{t('haveAccount')}</Typography>
              <NavLink to={'/createAccount'} className={classes.navLink}>{t('signUpButton')}</NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
