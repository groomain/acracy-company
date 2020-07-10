import React from 'react';
import { useTranslation } from "react-i18next";
import clsx from 'clsx';
// import { useDispatch } from 'react-redux';
// import { logoutLaunched } from '../../components/App/reducer';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core/';

import Dashboard from './dashboard';
import CustomSnackBar from "../../components/SnackBar";
import CustomButton from "../../components/Button";
import ProfilMenu from "../../components/ProfilMenu";

import styles from "../../components/AppBar/styles";
import acracyLogo from "../../assets/icons/logo-acracy.svg";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";

export const HomePage = (props) => {
  const classes = styles();
  const { t } = useTranslation();

  ///////// Keep for future reference
  // const dispatch = useDispatch();
  // const { loading, data, error, refetch } = useApi('/ideas', 'Get');

  // const logout = () => {
  //   dispatch(logoutLaunched());
  // };

  const scroll = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      {/* Navigation is reapplied here since the global one doesn't work */}
      <AppBar position="fixed" className={clsx(classes.appbar, { [classes.shadow]: scroll })}>
        <CustomSnackBar />
        <Toolbar className={classes.toolbar}>
          <NavLink to={'/'} className={classes.logo}>
            <img src={acracyLogo} alt="acracyLogo" />
          </NavLink>
          <div className={classes.grow} />
          <div className={clsx(classes.div, classes.home)}>
            <CustomButton theme={"filledButton"} title={t('header.newBrief')} component={RouterLink} to="/lead" />
            <ProfilMenu />
          </div>
        </Toolbar>
      </AppBar>
      <Dashboard />
    </>
  )
};

export default HomePage;
