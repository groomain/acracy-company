import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import styles from "./styles";
import CustomButton from "../Button";
import CustomNavLink from "../CustomNavLink";
import CustomSnackBar from "../SnackBar";
import ProfilMenu from "../ProfilMenu";

export const CustomAppBar = (props) => {
  let location = useLocation();
  const { t } = useTranslation();
  const classes = styles();
  const [welcomeMessageOpen, setWelcomeMessageOpen] = React.useState(true);
  const [errorMessageOpen, setErrorMessageOpen] = React.useState(false);

  const { loginErrorMessage, signupErrorMessage, confirmSignupSuccessMessage, confirmSignupErrorMessage } = useSelector(state => ({
    loginErrorMessage: state.getIn(['app', 'loginErrorMessage']),
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
    confirmSignupSuccessMessage: state.getIn(['app', 'confirmSignupSuccessMessage']),
    confirmSignupErrorMessage: state.getIn(['app', 'confirmSignupErrorMessage']),
  }));

  useEffect(() => {
    if (loginErrorMessage || signupErrorMessage || confirmSignupErrorMessage) {
      setErrorMessageOpen(true);
    }
  }, [loginErrorMessage, signupErrorMessage, confirmSignupErrorMessage]);

  const renderButtons = () => {
    switch (props.path || location.pathname) {
      case '/login':
        return (
          <div className={clsx(classes.div, classes.login)}>
            <CustomButton theme={"filledButton"} title={t('signUp')} component={RouterLink} to="/signup" />
            <CustomButton title={t('contactUs')} />
          </div>
        );
      case '/signup':
      case '/confirm-signup':
        return (
          <div className={clsx(classes.div, classes.signup)}>
            <CustomNavLink to={'/login'} text={t('login')} theme="navLink" />
            <CustomButton title={t('contactUs')} />
          </div>
        );
      case '/home':
        return (
          <div className={clsx(classes.div, classes.home)}>
            <CustomButton theme={"filledButton"} title={"Nouveau brief"} />
            <ProfilMenu />
          </div>
        );
      case '/password':
        return (
          <div className={clsx(classes.div, classes.password)}>
            <CustomNavLink to={'/login'} text={t('login')} theme="navLink" />
            <CustomButton theme={"filledButton"} title={t('signUp')} />
            <CustomButton title={t('contactUs')} />
          </div>
        );
      default:
        break;
    }
  };

  const renderSnackbar = () => (
    <>
      {confirmSignupSuccessMessage && <CustomSnackBar message={confirmSignupSuccessMessage} open={welcomeMessageOpen} setOpen={setWelcomeMessageOpen} />}
      {signupErrorMessage && <CustomSnackBar message={signupErrorMessage} open={errorMessageOpen} setOpen={setErrorMessageOpen} error />}
      {loginErrorMessage && <CustomSnackBar message={loginErrorMessage} open={errorMessageOpen} setOpen={setErrorMessageOpen} error />}
      {confirmSignupErrorMessage && <CustomSnackBar message={confirmSignupErrorMessage} open={errorMessageOpen} setOpen={setErrorMessageOpen} error />}
    </>
  );

  return (
    <AppBar position="fixed" className={classes.appbar}>
      {renderSnackbar()}
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h1" noWrap>
          acracy
            </Typography>
        <div className={classes.grow} />
        {renderButtons()}
      </Toolbar>
    </AppBar>
  );
};
export default withRouter(CustomAppBar);
