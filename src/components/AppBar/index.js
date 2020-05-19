import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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

import { useSelector } from 'react-redux';

export const CustomAppBar = (props) => {
  let location = useLocation();
  const { t } = useTranslation();
  const classes = styles();
  const [open, setOpen] = React.useState(true);


  const { loginErrorMessage, loginLoading } = useSelector(state => ({
    loginErrorMessage: state.getIn(['app', 'loginErrorMessage']),
    loginLoading: state.getIn(['app', 'loginLoading'])
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
      <CustomSnackBar message={t('welcomeMessage')} open={open} setOpen={setOpen} />
      {loginErrorMessage && <CustomSnackBar message={loginErrorMessage} error open={open} setOpen={setOpen} />}
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
