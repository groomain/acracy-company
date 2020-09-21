import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import clsx from 'clsx';
import { push } from "connected-react-router";

import { Grid, Typography, Box } from '@material-ui/core/';

import Searchbar from '../../components/Searchbar';
import Drafts from '../../components/Drafts/DraftsWrapper';
import Missions from '../../components/Missions';
import sharedStyles from "../../utils/styles";

import { pushToLeadCreationPageWithSearchResult, setLeadCreationStep } from './reducer';
import { getLeadDraftFailure, dispatchLeadId, uploadFileFailure } from '../LeadCreationPage/reducer';

export const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const { userName, leadCreationPageWithSearchResult } = useSelector(state => ({
    userName: state.getIn(['app', 'userDynamo', 'firstName']),
    leadCreationPageWithSearchResult: state.getIn(['dashboard', 'leadCreationPageWithSearchResult']),
  }))

  const handleSearchResult = (e) => {
    dispatch(pushToLeadCreationPageWithSearchResult(e))
    if (e) {
      dispatch(push('/lead'));
    }
  }

  useEffect(() => {
    if (leadCreationPageWithSearchResult) {
      dispatch(pushToLeadCreationPageWithSearchResult([]));
    }
  }, [])

  useEffect(() => {
    dispatch(setLeadCreationStep(0));
    dispatch(getLeadDraftFailure()); // Resets lead infos when arriving on the dashboard
    dispatch(dispatchLeadId(null));
    dispatch(uploadFileFailure()); // Resets uploaded file
  }, [])

  return (
    <Grid className={clsx(sharedClasses.pannelLayout, sharedClasses.fullPage)}>
      <Grid item className={sharedClasses.midWidth}>
        <Typography variant='h1'>{t('dashboard.welcome')}{userName || 'Pascal'}</Typography>
        <Box style={{ marginTop: '20px' }}>
          <Typography variant='body1'>{t('dashboard.subtitle')}</Typography>
        </Box>
        <Box style={{ marginTop: '6px' }}>
          <Searchbar
            onUpdateChosenCategory={handleSearchResult}
            hideLabel />
        </Box>
      </Grid>
      <Box>
        <Box style={{ marginTop: '40px' }}>
          <Typography variant='h1'>{t('dashboard.missions.missionsTitle')}</Typography>
        </Box>
        <Grid item style={{ position: 'relative' }}>
          <Drafts />
        </Grid>
        <Missions />
      </Box>
    </Grid>
  );
};

export default Dashboard;
