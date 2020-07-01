import React  from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
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

  const renderButtons = () => {
    switch (props.path || location.pathname) {
      case '/login':
        return (
          <div className={clsx(classes.div, classes.login)}>
            <CustomButton theme={"filledButton"} title={t('header.signUp')} component={RouterLink} to="/signup" />
            <CustomButton title={t('header.contactUs')} />
          </div>
        );
      case '/signup':
      case '/confirm-signup':
        return (
          <div className={clsx(classes.div, classes.signup)}>
            <CustomNavLink to={'/login'} text={t('header.login')} theme="navLink" />
            <CustomButton title={t('header.contactUs')} />
          </div>
        );
      case '/home':
        return (
          <div className={clsx(classes.div, classes.home)}>
              <CustomButton theme={"filledButton"} title={t('header.newBrief')} component={RouterLink} to="/newbrief"  />
            <ProfilMenu />
          </div>
        );
      case '/password':
        return (
          <div className={clsx(classes.div, classes.password)}>
            <CustomNavLink to={'/login'} text={t('header.login')} theme="navLink" />
            <CustomButton theme={"filledButton"} title={<NavLink className={classes.navLink} to={'/signup'}>{t('header.signUp')}</NavLink>}/>
            <CustomButton title={t('header.contactUs')} component={RouterLink} to="/contact" />
          </div>
        );
      default:
        break;
    }
  };

  const renderSnackbar = () => (
      <CustomSnackBar/>
  );

  return (
    <AppBar position="fixed" className={classes.appbar}>
      {renderSnackbar()}
      <Toolbar className={classes.toolbar}>
        <NavLink to={'/'} className={classes.logo}>
            <img src={acracyLogo} alt="acracyLogo" />
        </NavLink>
        <div className={classes.grow} />
        {renderButtons()}
      </Toolbar>
    </AppBar>
  );
};
export default withRouter(CustomAppBar);
