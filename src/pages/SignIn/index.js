import React from 'react';
import { useTranslation } from 'react-i18next';
import {useDispatch} from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LoginForm from '../../components/LoginForm';
import { loginLaunched } from '../../components/App/reducer';
import styles from '../../utils/styles';
import CustomNavLink from "../../components/CustomNavLink";
import CustomSnackBar from "../../components/SnackBar";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();
  const [open, setOpen] = React.useState(false);

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
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.connectionDiv}
    >
      <Grid container direction="column" style={{paddingLeft: "20%", width: "50%"}}>
        <Typography variant="h2">acracy entreprise</Typography>
        <Typography variant="h1" style={{paddingBottom: 20}}>Je m'identifie</Typography>
        <Formik
            render={props => <LoginForm {...props} />}
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={login}
        />
        <CustomNavLink to={'/signup'} text={t('signUpButton')}/>
        <CustomNavLink to={'/password'} text={t('forgotPasswordButton')}/>
      </Grid>
      <CustomSnackBar open={open} setOpen={setOpen} message={"Merci pour votre validation, votre compte acracy est maintenant actif"}/>
    </Grid>
  );
};

export default SignInPage;
