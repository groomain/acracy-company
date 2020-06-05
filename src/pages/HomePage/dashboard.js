import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import clsx from 'clsx';

import { getLeadsLaunched, getMissionsLaunched } from './reducer';
import sharedStyles from "../../utils/styles";
import { Grid, Typography, Box } from '@material-ui/core/';
import { formatWithLineBreak } from '../../utils/format';

import Searchbar from '../../components/Searchbar';
import Drafts from '../../components/Drafts/DraftsWrapper';
import Mission from '../../components/Mission';
import DarkWrapper from '../../components/Layout/DarkWrapper';
import CustomLoader from '../../components/Loader';

export const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const { userDynamo } = useSelector(state => ({
    userDynamo: state.getIn(['app', 'userDynamo']),
  }));

  const [currentDrafts, setCurrentDrafts] = useState()
  const [missions, setMissions] = useState()

  const getLeads = () => {
    dispatch(getLeadsLaunched());
  };

  const getMissions = () => {
    dispatch(getMissionsLaunched());
  };

  const { leadsData, leadsLoading, missionsData, missionsLoading } = useSelector(state => ({
    leadsData: state.getIn(['dashboard', 'leadsData']),
    leadsLoading: state.getIn(['dashboard', 'leadsLoading']),
    missionsData: state.getIn(['dashboard', 'missionsData']),
    missionsLoading: state.getIn(['dashboard', 'missionsLoading'])
  }));

  useEffect(() => {
    getLeads();
    getMissions();
  }, []);

  useEffect(() => {
    setCurrentDrafts(leadsData);
    setMissions(missionsData)
    setMissions([])
  }, [leadsData, missionsData]);

  const displayMissionsListTitle = () => {
    return (
      <Typography variant="h2">
        {t('dashboard.missions.name')}{missions?.length > 1 ? 's' : null}
        {t('dashboard.missions.inProgress')}
      </Typography>
    )
  }
  const displayMissions = () => {
    let missionsList = (
      <>
        {displayMissionsListTitle()}
        <DarkWrapper isBleed justify='center'>
          <Grid className={sharedClasses.disabledText}>
            {missionsLoading
              ? <CustomLoader size={70} />
              : <Typography>{formatWithLineBreak(t('dashboard.missions.noMission'))}</Typography>
            }
          </Grid>
        </DarkWrapper>
      </>
    )
    if (missions?.length > 0) {
      missionsList = (
        <Grid item>
          <Box my={6}>
            {displayMissionsListTitle()}
            {missions?.filter(x => x.status === 'IN_PROGRESS').map((mission, key) => <Mission key={key} mission={mission} missionId={key} />)}
            <Typography variant="h2">
              {t('dashboard.missions.name')}{missions?.length > 1 ? 's' : null}
              {t('dashboard.missions.future')}
            </Typography>
            {missions?.filter(x => x.status === 'WAITING_FOR_SIGNATURE').map((mission, key) => <Mission key={key} mission={mission} missionId={key} />)}
            <Typography variant="h2">
              {t('dashboard.missions.finished')}
            </Typography>
            {missions?.filter(x => x.status === 'FINISHED').map((mission, key) => <Mission key={key} mission={mission} missionId={key} />)}
          </Box>
        </Grid>
      )
    }
    return missionsList;
  };

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
        <Box my={6}>
          <Typography variant='h1'>{t('dashboard.missions.missionsTitle')}</Typography>
        </Box>
        <Grid item style={{ position: 'relative' }}>
          <Drafts loading={leadsLoading} drafts={currentDrafts} />
        </Grid>
        {displayMissions()}
      </Box>
    </Grid>
  );
};

export default Dashboard;