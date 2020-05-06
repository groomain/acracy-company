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
import {NavLink} from "react-router-dom";
import Main from "../../components/Main";
import Divider from "@material-ui/core/Divider";

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
      <Grid item xs={7} container>
        <Grid item xs={3}/>
        <Grid item xs={7} >
        <Typography variant="h2">acracy entreprise</Typography>
        <Typography variant="h1" className={classes.titleSignIn}>Je m'identifie</Typography>
        <Formik
            render={props => <LoginForm {...props} />}
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={login}
        />
          <Divider className={classes.divider}/>
        <Typography variant={'body1'} className={classes.typo} >{t('haveAccount')}</Typography>
        <NavLink to={'/password'} className={classes.navLink}>{t('signUpButton')}</NavLink>
        </Grid>
      </Grid>
      <CustomSnackBar open={open} setOpen={setOpen} message={"Merci pour votre validation, votre compte acracy est maintenant actif"}/>
    </Grid>
  );
};

export default SignInPage;
