import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import { Link as RouterLink } from 'react-router-dom';

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
  const [open, setOpen] = React.useState(true);

  const { loginErrorMessage, signupErrorMessage } = useSelector(state => ({
    loginErrorMessage: state.getIn(['app', 'loginErrorMessage']),
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
  }));

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
      {signupErrorMessage && <CustomSnackBar message={signupErrorMessage} open={open} setOpen={setOpen} error />}
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
