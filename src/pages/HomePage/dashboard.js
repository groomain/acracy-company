import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import clsx from 'clsx';

import { getLeadsLaunched } from './reducer';
import sharedStyles from "../../utils/styles";
import { Grid, Typography, Box } from '@material-ui/core/';

import Searchbar from '../../components/Searchbar';
import Drafts from '../../components/Drafts/DraftsWrapper';

export const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const { userDynamo } = useSelector(state => ({
    userDynamo: state.getIn(['app', 'userDynamo']),
  }));

  const [currentDrafts, setCurrentDrafts] = useState()

  const getLeads = () => {
    dispatch(getLeadsLaunched());
  };

  const { leadsData, leadsLoading } = useSelector(state => ({
    leadsData: state.getIn(['leads', 'leadsData']),
    leadsLoading: state.getIn(['leads', 'leadsLoading'])
  }));

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    setCurrentDrafts(leadsData)
  }, [leadsData])

  return (
    <Grid className={clsx(sharedClasses.pannelLayout, sharedClasses.fullPage)}>
      <Grid item className={sharedClasses.midWidth}>
        <Typography variant='h1'>{t('dashboard.welcome')}{userDynamo?.attributes['custom:firstName'] || 'Pascal'}</Typography>
        <Box my={2}>
          <Typography variant='body1'>{t('dashboard.subtitle')}</Typography>
        </Box>
        <Box my={2}>
          <Searchbar />
        </Box>
      </Grid>
      <Box my={6}>
        <Typography variant='h1'>Mes Missions</Typography>
        <Grid item style={{ position: 'relative' }}>
          <Drafts loading={leadsLoading} drafts={currentDrafts} />
        </Grid>
      </Box>
    </Grid>
  );
};

export default Dashboard;