import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
// import { logoutLaunched } from '../../components/App/reducer';
import { handleCurrentStep } from '../../components/App/reducer';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core/';

import Dashboard from './dashboard';
import CustomSnackBar from "../../components/SnackBar";
import CustomButton from "../../components/Button";
import ProfilMenu from "../../components/ProfilMenu";

import styles from "../../components/AppBar/styles";
import acracyLogo from "../../assets/icons/logo-acracy.svg";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Box } from "@material-ui/core";
import { dispatchLeadId } from '../LeadCreationPage/reducer';

export const HomePage = (props) => {
  const classes = styles();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(handleCurrentStep(0));
  }, [dispatch]);


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
            <Box pr={'20px'}>
              <CustomButton theme={"filledButton"} title={t('header.newBrief')}
                component={RouterLink} to="/lead"
                onClick={() => dispatch(dispatchLeadId(null))} />
            </Box>
            <ProfilMenu />
          </div>
        </Toolbar>
      </AppBar>
      <Dashboard />
    </>
  )
};

export default HomePage;
