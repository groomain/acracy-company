import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, withRouter } from 'react-router';
import clsx from 'clsx';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import {
  AppBar, Toolbar, Grid, Typography, Box
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CustomButton from '../Button';
import CustomNavLink from '../CustomNavLink';
import CustomSnackBar from '../SnackBar';
import ProfilMenu from '../ProfilMenu';
import acracyLogo from '../../assets/icons/logo-acracy.svg';

import ContactModale from '../ContactModale';
import { dispatchLeadId } from '../../pages/LeadCreationPage/reducer';
// Pics
import arrow from '../../assets/icons/arrow.svg';
import writeMessage from '../../assets/icons/ecrire-a-acracy.svg';
import styles from './styles';

export const CustomAppBar = (props) => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const classes = styles();
  const [contactOpen, setContactModaleOpen] = useState(false);

  const scroll = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const renderButtons = () => {
    switch (props.path || location.pathname) {
      case '/login':
        return (
          <div className={clsx(classes.div, classes.login)}>
            <CustomButton theme="filledButton" title={t('header.signUp')} component={RouterLink} to="/createAccount" />
            <Box ml="20px">
              <CustomButton title={t('header.contactUs')} onClick={() => setContactModaleOpen(!contactOpen)} />
            </Box>
          </div>
        );
      case '/createAccount':
      case '/confirmAccount':
        return (
          <div className={clsx(classes.div, classes.signup)}>
            <CustomNavLink to="/login" text={t('header.login')} theme="navLink" />
            <CustomButton title={t('header.contactUs')} onClick={() => setContactModaleOpen(!contactOpen)} />
          </div>
        );
      case '/home':
        return (
          <div className={clsx(classes.div, classes.home)}>
            <CustomButton
              theme="filledButton"
              title={t('header.newBrief')}
              component={RouterLink}
              to="/lead"
              onClick={() => dispatch(dispatchLeadId(null))}
            />
            <ProfilMenu />
          </div>
        );
      case '/forgotPassword':
        return (
          <div className={clsx(classes.div, classes.password)}>
            <CustomNavLink to="/login" text={t('header.login')} theme="navLink" />
            <CustomButton theme="filledButton" title={<NavLink className={classes.navLink} to="/createAccount">{t('header.signUp')}</NavLink>} />
            <Box ml="20px">
              <CustomButton title={t('header.contactUs')} onClick={() => setContactModaleOpen(!contactOpen)} />
            </Box>
          </div>
        );
      case '/brief':
        return (
          <Grid className={classes.missionNavButton}>
            <Grid container alignItems="center" onClick={() => dispatch(push('/home'))}>
              <img src={arrow} alt="retour" className={classes.missionNavImage} />
              <Box mx={2}>
                <Typography variant="h2" color="secondary">Retour dashboard</Typography>
              </Box>
            </Grid>
          </Grid>
        );
      case '/reveal':
        return (
          <Grid container justify="space-between">
            <Grid item style={{ marginLeft: '2rem' }}>
              <Grid container className={classes.missionNavButton} alignItems="center" onClick={() => dispatch(push('/home'))}>
                <img src={arrow} alt="retour" className={classes.missionNavImage} />
                <Typography variant="h2" className={classes.textNav} color="secondary">Retour dashboard</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.missionNavButton} alignItems="center" onClick={() => setContactModaleOpen(true)}>
                <Typography variant="h2" color="secondary" className={classes.textNav}>Faire une demande à acracy</Typography>
                <img src={writeMessage} alt="retour" className={classes.pen} />
              </Grid>
            </Grid>
          </Grid>
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
        <NavLink to="/" className={classes.logo}>
          <img src={acracyLogo} alt="acracyLogo" />
        </NavLink>
        {(props.path || location.path) !== '/brief' && <div className={classes.grow} />}
        {renderButtons()}
      </Toolbar>
      <ContactModale open={contactOpen} setOpen={setContactModaleOpen} interview={false} title="Contacter acracy" placeHolder="Donnez nous plus de détails" subtitle="Afin de pouvoir au mieux vous répondre, merci de préciser la raison de votre prise de contact." />
    </AppBar>
  );
};
export default withRouter(CustomAppBar);
