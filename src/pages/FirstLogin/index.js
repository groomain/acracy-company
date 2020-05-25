import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FirstLoginForm from '../../components/Forms/FirstLoginForm';
import { updateUserLaunched } from '../../components/App/reducer';
import styles from '../../utils/styles';


export const FirstLoginPage = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector(state => ({
    userId: state.getIn(['app', 'userDynamo', 'user', 'id'])
  }));
  const { t } = useTranslation();
  const classes = styles();

  // Form data
  const initialValues = {
    firstName: '',
    lastName: ''
  };

  // Form Submitting Function
  const submitFirstLogin = (payload) => {
    dispatch(updateUserLaunched({ ...payload, userId }));
  };

  // Form Validation Schema
  const ValidationSchema = Yup.object().shape({
    firstName: Yup
      .string()
      .required('firstNameRequired'),
    lastName: Yup
      .string()
      .required('lastNameRequired')
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

      <Typography className={classes.titleFormConnection}>{t('firstLoginPageTitle')}</Typography>
      <Formik
        render={props => <FirstLoginForm {...props} />}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={submitFirstLogin}
      />
    </Grid>
  );
};

export default FirstLoginPage;
