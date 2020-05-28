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
import acracyLogo from "../../assets/icons/logo-acracy.svg";
import { NavLink } from "react-router-dom";

export const CustomAppBar = (props) => {
  let location = useLocation();
  const { t } = useTranslation();
  const classes = styles();
  const [welcomeMessageOpen, setWelcomeMessageOpen] = React.useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = React.useState(false);

  const { loginErrorMessage, signupErrorMessage } = useSelector(state => ({
    loginErrorMessage: state.getIn(['app', 'loginErrorMessage']),
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
  }));

  useEffect(() => {
    if (loginErrorMessage || signupErrorMessage) {
      setErrorMessageOpen(true);
    }
  }, [loginErrorMessage, signupErrorMessage]);

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
        return (
          <div className={clsx(classes.div, classes.signup)}>
            <CustomNavLink to={'/login'} text={t('login')} theme="navLink" />
            <CustomButton title={t('contactUs')} />
          </div>
        );
      case '/home':
        return (
          <div className={clsx(classes.div, classes.home)}>
              <CustomButton theme={"filledButton"} title={
                  "Nouveau brief"
              } component={RouterLink} to="/newbrief"  />
            <ProfilMenu />
          </div>
        );
      case '/password':
        return (
          <div className={clsx(classes.div, classes.password)}>
            <CustomNavLink to={'/login'} text={t('login')} theme="navLink" />
            <CustomButton theme={"filledButton"} title={<NavLink className={classes.navLink} to={'/signup'}>{t('signUp')}</NavLink>}/>
            <CustomButton title={t('contactUs')} component={RouterLink} to="/contact" />
          </div>
        );
        case '/newbrief':
        return (
          <div className={clsx(classes.div, classes.newbrief)}>
            <CustomButton style={{width: 207}} title={"Sauvegarder et fermer"} component={RouterLink} to="/save" />
          </div>
        );
      default:
        break;
    }
  };

  const renderSnackbar = () => (
    <>
      {welcomeMessageOpen && <CustomSnackBar message={t('welcomeMessage')} open={welcomeMessageOpen} setOpen={setWelcomeMessageOpen} />}
      {signupErrorMessage && <CustomSnackBar message={signupErrorMessage} open={errorMessageOpen} setOpen={setErrorMessageOpen} error />}
      {loginErrorMessage && <CustomSnackBar message={loginErrorMessage} open={errorMessageOpen} setOpen={setErrorMessageOpen} error />}
    </>
  );

  return (
    <AppBar position="fixed" className={classes.appbar}>
      {renderSnackbar()}
      <Toolbar className={classes.toolbar}>
            <NavLink to={'/'} className={classes.logo}>
                <img src={acracyLogo} alt="acracyLogo" />
            </NavLink>
          {(props.path !== "newbrief" || location.pathname !== "newbrief") && <div className={classes.grow} />}
        {renderButtons()}
      </Toolbar>
    </AppBar>
  );
};
export default withRouter(CustomAppBar);
