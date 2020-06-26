import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

import { getMissionsLaunched, getBriefsLaunched } from '../../pages/HomePage/reducer';
import { Grid, Typography, Box } from '@material-ui/core/';

import Mission from './Mission';
import DarkWrapper from '../Layout/DarkWrapper';
import CustomLoader from '../Loader';
import sharedStyles from "../../utils/styles";

import { formatWithLineBreak } from '../../utils/services/format';
import { missions } from '../../mocks/missions';
import { briefs } from '../../mocks/briefs';
import { WAITING_FOR_SIGNATURE, FINISHED, IN_PROGRESS } from './constants';

export const Missions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const today = new Date(Date.now()).toISOString();

  // Delete when connecting to the DB
  const [briefsList, setBriefsList] = useState();
  const missionsLoading = false;
  const briefsLoading = false;

  // const { missionsLoading, briefsLoading, briefsData, missions } = useSelector(state => ({
  //   missions: state.getIn(['dashboard', 'missionsData']),
  //   missionsLoading: state.getIn(['dashboard', 'missionsLoading']),
  //   // "profile matching" section
  //   briefsData: state.getIn(['dashboard', 'briefsData']),
  //   briefsLoading: state.getIn(['dashboard', 'briefsLoading'])
  // }));

  // useEffect(() => {
  //   dispatch(getMissionsLaunched());
  //   dispatch(getBriefsLaunched());
  // }, [dispatch]);

  const toValidateMission = missions?.filter(x => x.status === WAITING_FOR_SIGNATURE);
  const [missionBrief] = toValidateMission;

  const missionAsMatchingProfile = {
    externalId: missionBrief.externalId,
    status: missionBrief.status,
    brief: missionBrief.brief
  }

  useEffect(() => {
    setBriefsList(briefs.concat(missionAsMatchingProfile))
  }, [])

  const inProgressMissions = missions?.filter(x => (x.status === IN_PROGRESS && x.dateStart < today) || (x.status === FINISHED && x.dateEnd?.length < 1));
  const futureMissions = missions?.filter(x => x.status === IN_PROGRESS && x.dateStart > today);
  const finishedMissions = missions?.filter(x => x.status === FINISHED && x.dateEnd?.length > 0);

  const displayInProgressMissionsTitle = () => {
    return (
      <Typography variant="h2">
        {t('dashboard.missions.name')}{inProgressMissions?.length > 1 ? 's' : null}
        {t('dashboard.missions.inProgress')}
      </Typography>
    )
  };

  const displayMissions = () => {
    let missionsList = (
      <>
        {displayInProgressMissionsTitle()}
        <DarkWrapper isBleed justify='center'>
          <Grid className={sharedClasses.disabledText}>
            {missionsLoading || briefsLoading
              ? <CustomLoader size={70} />
              : <span>{formatWithLineBreak(t('dashboard.missions.noMission'))}</span>
            }
          </Grid>
        </DarkWrapper>
      </>
    );
    if (inProgressMissions?.length > 0 || futureMissions?.length > 0 || finishedMissions?.length > 0 || briefsList?.length > 0) {
      missionsList = (
        <Grid item>
          <Box my={6}>
            {briefsList?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.profileMatching')}
                </Typography>
                {briefsList
                  // .sort((a, b) => a.missionContext.startDate - b.missionContext.startDate)
                  .map((matching, key) => <Mission key={key} matching={matching} today={today} />)
                }
              </>
            )}
            {futureMissions?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.name')}{futureMissions?.length > 1 ? 's' : null}
                  {t('dashboard.missions.future')}
                </Typography>
                {futureMissions
                  .sort((a, b) => a.dateStart - b.dateStart)
                  .map((mission, key) => <Mission key={key} mission={mission} today={today} />)}
              </>
            )}
            {inProgressMissions?.length > 0 && (
              <>
                {displayInProgressMissionsTitle()}
                {inProgressMissions
                  .sort((a, b) => a.dateStart - b.dateStart)
                  .map((mission, key) => <Mission key={key} mission={mission} today={today} />)}
              </>
            )}
            {finishedMissions?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.finished')}
                </Typography>
                {finishedMissions
                  .sort((a, b) => a.dateStart - b.dateStart)
                  .map((mission, key) => <Mission key={key} mission={mission} today={today} />)}
              </>
            )}
          </Box>
        </Grid>
      )
    }
    return missionsList;
  };
  return displayMissions()
};

export default Missions;