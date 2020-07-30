import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signupLaunched } from '../../components/App/reducer';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import SignUpForm from '../../components/Forms/SignUpForm';
import SearchResultPannel from '../../components/SearchResultPannel';
import PartnersList from '../../components/PartnersList';
import styles from '../../utils/styles';

const SignUpPage = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();
  const queryString = require('query-string');
  let test = 1

  const [initialValues, setInitialValues] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    role: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    phonePrefix: 'Fr : +33',
    searchValue: '',
    searchType: 'DELIVERABLE',
    searchCode: 'BB-8',
    conditions: false
  });
  // Form data
  // const initialValues = {
  //   companyName: '',
  //   firstName: '',
  //   lastName: '',
  //   role: '',
  //   phoneNumber: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   phonePrefix: 'Fr : +33',
  //   searchValue: '',
  //   searchType: 'DELIVERABLE',
  //   searchCode: 'BB-8',
  //   conditions: false
  // };

  useEffect(() => {
    console.log(initialValues)
    setInitialValues({ ...initialValues, searchValue: queryString.parse(props.location.search).search })

    initialValues.searchValue = queryString.parse(props.location.search).search
    test++
  }, []);


  // Form Submitting Function
  const signup = (credentials) => {
    dispatch(signupLaunched(credentials));
  };

  // Form Validation Schema
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required(),
    companyName: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    role: Yup.string().required(),
    phoneNumber: Yup.number().required(),
    phonePrefix: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().test('password-match', t('passwordMismatch'), function (confPass) {
      return confPass === this.parent.password;
    }).required(),
    conditions: Yup.bool().required(),
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.connectionDiv}
    >
      <Grid container className={classes.container}>
        <Main>
          <Formik
            render={props => <SignUpForm {...props} />}
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={signup}
          />
        </Main>
        <Sidebar>
          <Grid className={classes.pannel}>
            <SearchResultPannel searchValue={initialValues.searchValue} />
            <PartnersList />
          </Grid>
        </Sidebar>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
