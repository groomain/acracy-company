import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

import { getMissionsLaunched, getBriefsLaunched } from '../../pages/HomePage/reducer';
import { Grid, Typography, Box } from '@material-ui/core/';

import Mission from './Mission';
import DarkWrapper from '../Layout/DarkWrapper';
import CustomLoader from '../Loader';
import sharedStyles from "../../utils/styles";

import { formatWithLineBreak } from '../../utils/format';
import { missions } from '../../mocks/missions';
import { briefs } from '../../mocks/briefs';

export const Missions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const [inProgressMissions, setInProgressMissions] = useState();
  const [futureMissions, setFutureMissions] = useState();
  const [finishedMissions, setFinishedMissions] = useState();
  const [profileMatching, setProfileMatching] = useState();
  console.log('Missions -> profileMatching', profileMatching)

  const { missionsLoading, briefsLoading } = useSelector(state => ({
    // missionsData: state.getIn(['dashboard', 'missionsData']),
    missionsLoading: state.getIn(['dashboard', 'missionsLoading']),
    // briefsData: state.getIn(['dashboard', 'briefsData']),
    briefsLoading: state.getIn(['dashboard', 'briefsLoading'])
  }));

  const [missionsData] = useState(missions);
  const [briefsData] = useState(briefs);

  useEffect(() => {
    // dispatch(getMissionsLaunched());
    // dispatch(getBriefsLaunched());
  }, [dispatch]);

  useEffect(() => {
    const today = Date.now() / 1000;
    setInProgressMissions(missionsData?.filter(x => x.status === 'IN_PROGRESS' && x.brief.missionContext.startDate < today));
    setFutureMissions(missionsData?.filter(x => x.status === 'IN_PROGRESS' && x.brief.missionContext.startDate > today));
    setFinishedMissions(missionsData?.filter(x => x.status === 'FINISHED'));
    setProfileMatching(briefsData);
    // setInProgressMissions([])
    setFutureMissions([])
    setFinishedMissions([])
    // setProfileMatching([])
  }, [missionsData]);

  const displayInProgressMissionsTitle = () => {
    return (
      <Typography variant="h2">
        {t('dashboard.missions.name')}{inProgressMissions?.length > 1 ? 's' : null}
        {t('dashboard.missions.inProgress')}
      </Typography>
    )
  }
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
    if (inProgressMissions?.length > 0 || futureMissions?.length > 0 || finishedMissions?.length > 0 || profileMatching?.length > 0) {
      missionsList = (
        <Grid item>
          <Box my={6}>
            {inProgressMissions?.length > 0 && (
              <>
                {displayInProgressMissionsTitle()}
                {inProgressMissions.map((mission, key) => <Mission key={key} mission={mission} />)}
              </>
            )}
            {futureMissions?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.name')}{futureMissions?.length > 1 ? 's' : null}
                  {t('dashboard.missions.future')}
                </Typography>
                {futureMissions.map((mission, key) => <Mission key={key} mission={mission} />)}
              </>
            )}
            {finishedMissions?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.finished')}
                </Typography>
                {finishedMissions.map((mission, key) => <Mission key={key} mission={mission} />)}
              </>
            )}
            {profileMatching?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.profileMatching')}
                </Typography>
                {profileMatching.map((matching, key) => <Mission key={key} matching={matching} />)}
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