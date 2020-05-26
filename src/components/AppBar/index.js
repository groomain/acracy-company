import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../Button";
import CustomNavLink from "../CustomNavLink";
import profilIcon from '../../assets/icons/profil-roll-out.svg'
import CustomIconButton from "../IconButton";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import CustomSnackBar from "../SnackBar";
import { Link as RouterLink } from 'react-router-dom';

export const CustomAppBar = (props) => {
  let location = useLocation();
  const { t } = useTranslation();
  const classes = styles();
  const [open, setOpen] = React.useState(true);

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
            <CustomIconButton icon={profilIcon} />
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

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <CustomSnackBar message={"Test de snackBar"} open={open} setOpen={setOpen} />
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
