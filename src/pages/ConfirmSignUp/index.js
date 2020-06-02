import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { confirmSignupLaunched, resendCodeLaunched } from '../../components/App/reducer';
import { Grid, Typography, Box, Divider } from '@material-ui/core/';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import CustomButton from '../../components/Button';
import ConfirmSignupForm from '../../components/Forms/ConfirmSignupForm';
import SearchResultPannel from '../../components/SearchResultPannel';
import sharedStyles from '../../utils/styles';
import styles from './styles';

const ConfirmSignUpPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();
  const sharedClasses = sharedStyles();

  const { email, resendCodeSuccessMessage } = useSelector(state => ({
    email: state.getIn(['router', 'location', 'state', 'email']),
    resendCodeSuccessMessage: state.getIn(['app', 'resendCodeSuccessMessage'])
  }))

  // Form data
  const initialValues = {
    code: '',
    username: email
  };

  const [searchValue] = useState('Social Media Strategist');

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

  const resendCode = () => {
    dispatch(resendCodeLaunched(email))
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
      >
        <Main>
          <Grid className={sharedClasses.pannelLayout}>
            <Typography variant="h1">{t('confirmSignupPage.title')}</Typography>
            <Box my={2}>
              <Typography variant="body1">{t('confirmSignupPage.subtitle')} <span className={sharedClasses.email}>{email}</span></Typography>
            </Box>
            <Formik
              render={props => <ConfirmSignupForm {...props} />}
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={confirmSignup}
            />
            <Divider className={sharedClasses.divider} />
            <Typography variant={'body1'} className={classes.typo} >{t('confirmSignupPage.resendCodeMessage')}</Typography>
            <CustomButton theme="asLinkPrimary" title={t('confirmSignupPage.resendCodeButton')} rippleDisabled onClick={email => resendCode(email)} />
            {resendCodeSuccessMessage && <Typography variant="body1">{resendCodeSuccessMessage}</Typography>}
          </Grid>
        </Main>
        <Sidebar>
          <Grid className={sharedClasses.pannelLayout}>
            {searchValue && <SearchResultPannel searchValue={searchValue} />}
          </Grid>
        </Sidebar>
      </Grid>
    </>
  );
};

export default ConfirmSignUpPage;