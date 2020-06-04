import React from 'react';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import LeadCreationForm from '../../components/LeadCreationForm';
import { Grid, Typography } from '@material-ui/core';
import phonecall from '../../assets/icons/phone-call.svg';
import styles from './styles';
import CustomSnackBar from "../../components/SnackBar";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import CustomButton from "../../components/Button";
import {useTranslation} from "react-i18next";

const LeadCreationPage = () => {
  const classes = styles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (

    <Grid
      container
      direction="row"
      justify="center"
      className={classes.root}
    >
      <AppBar position="fixed" className={classes.appbar}>
        <CustomSnackBar message={"Test de snackBar"} open={open} setOpen={setOpen} />
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h1" noWrap>
            acracy
          </Typography>
          <div className={classes.grow} />
          <div className={classes.save}>
            <CustomButton title={t('saveAndClose')} className={classes.buttonSave}/>
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Main>
        <LeadCreationForm />
      </Main>

      <Sidebar>
        <Grid
          container
          direction='column'
          className={classes.briefTipRoot}
        >
          <Grid item className={classes.icon}>
            <img src={phonecall} alt="Appel téléphonique" />
          </Grid>
          <Typography variant='body1' className={classes.description}>Cliquez sur Cliquez sur «
          <span className={classes.yellowText}>être rappelé.e.</span>»
          en bas de page et nous finaliserons le brief ensemble.</Typography>

        </Grid>
      </Sidebar>
    </Grid >
  )
}

export default LeadCreationPage;
