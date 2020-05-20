import React from 'react';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import LeadCreationForm from '../../components/LeadCreationForm';
import { Grid, Typography } from '@material-ui/core';
import phonecall from '../../assets/icons/phone-call.svg';
import styles from './styles';

const LeadCreationPage = () => {
  const classes = styles();

  return (

    <Grid
      container
      direction="row"
      justify="center"
      className={classes.root}
    >
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