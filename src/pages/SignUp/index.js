import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SignUpForm from '../../components/SignUpForm';
import { signupLaunched } from '../../components/App/reducer';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import styles from '../../utils/styles';
import CustomNavLink from "../../components/CustomNavLink";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();

  // Form data
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Form Submitting Function
  const signup = (credentials) => {
    dispatch(signupLaunched(credentials));
  };

  // Form Validation Schema
  const ValidationSchema = Yup.object().shape({
    email: Yup
      .string()
      .required(),
    password: Yup
      .string()
      .required(),
    confirmPassword: Yup
      .string()
      .test('password-match', t('passwordMismatch'), function (confPass) {
        return confPass === this.parent.password;
      })
      .required()
  });

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.connectionDiv}
    >
      <Typography className={classes.titleConnection}>La Pilule Rouge</Typography>
      <Typography className={classes.titleFormConnection}>{t('signUpPageTitle')}</Typography>
      <Formik
        render={props => <SignUpForm {...props} />}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={signup}
      />
      <CustomNavLink to={"/login"} text={t('loginButton')}/>
    </Grid>
  );
};

export default SignUpPage;
