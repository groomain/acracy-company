import React, { useState } from 'react';
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
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ContactModale from "../ContactModale";
import Grid from "../../pages/ProfileSelection";

export const CustomAppBar = (props) => {
  let location = useLocation();
  const { t } = useTranslation();
  const classes = styles();
  const [contactOpen, setContactModaleOpen] = useState(false);

  const scroll = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });
  console.log('CustomAppBar -> scroll', scroll)

  const renderButtons = () => {
    switch (props.path || location.pathname) {
      case '/login':
        return (
          <div className={clsx(classes.div, classes.login)}>
            <CustomButton theme={"filledButton"} title={t('header.signUp')} component={RouterLink} to="/createAccount" />
            <CustomButton title={t('header.contactUs')} onClick={() => setContactModaleOpen(!contactOpen)} />
          </div>
        );
      case '/createAccount':
      case '/confirmAccount':
        return (
          <div className={clsx(classes.div, classes.signup)}>
            <CustomNavLink to={'/login'} text={t('header.login')} theme="navLink" />
            <CustomButton title={t('header.contactUs')} onClick={() => setContactModaleOpen(!contactOpen)} />
          </div>
        );
      case '/home':
        return (
          <div className={clsx(classes.div, classes.home)}>
            <CustomButton theme={"filledButton"} title={t('header.newBrief')} component={RouterLink} to="/newbrief" />
            <ProfilMenu />
          </div>
        );
      case '/forgotPassword':
        return (
          <div className={clsx(classes.div, classes.password)}>
            <CustomNavLink to={'/login'} text={t('header.login')} theme="navLink" />
            <CustomButton theme={"filledButton"} title={<NavLink className={classes.navLink} to={'/createAccount'}>{t('header.signUp')}</NavLink>} />
            <CustomButton title={t('header.contactUs')} onClick={() => setContactModaleOpen(!contactOpen)} />
          </div>
        );
      default:
        break;
    }
  };

  const renderSnackbar = () => (
    <CustomSnackBar />
  );

  return (
    <AppBar position="fixed" className={clsx(classes.appbar, { [classes.shadow]: scroll })}>
      {renderSnackbar()}
      <Toolbar className={classes.toolbar}>
        <NavLink to={'/'} className={classes.logo}>
          <img src={acracyLogo} alt="acracyLogo" />
        </NavLink>
        <div className={classes.grow} />
        {renderButtons()}
      </Toolbar>
      <ContactModale open={contactOpen} setOpen={setContactModaleOpen} interview={false} title={'Faire une demande à acracy'} placeHolder={'Dites nous comment on peut vous aider'} />
    </AppBar>
  );
};
export default withRouter(CustomAppBar);
