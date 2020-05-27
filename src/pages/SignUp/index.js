import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signupLaunched } from '../../components/App/reducer';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import SignUpForm from '../../components/SignUpForm';
import SearchResultPannel from '../../components/SearchResultPannel';
import styles from '../../utils/styles';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();

  // Form data
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    phonePrefix: 'Fr : +33',
    searchValue: 'Social Media Strategist',
    searchType: '',
    searchCode: '',
    conditions: false
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
    companyName: Yup
      .string()
      .required(),
    firstName: Yup
      .string()
      .required(),
    lastName: Yup
      .string()
      .required(),
    role: Yup
      .string()
      .required(),
    phoneNumber: Yup
      .number()
      .required(),
    phonePrefix: Yup
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
      .required(),
    conditions: Yup
      .bool()
      .required(),
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.connectionDiv}
      >
        <Main>
          <Formik
            render={props => <SignUpForm {...props} />}
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={signup}
          />
        </Main>
        <Sidebar>
          <SearchResultPannel
            searchValue={initialValues.searchValue}
          />
        </Sidebar>
      </Grid>
    </>
  );
};

export default SignUpPage;
