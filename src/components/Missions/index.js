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

export const Missions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const today = Date.now() / 1000;

  const { missionsLoading, briefsLoading, briefsData,
    //  missions /////////////////////////// Commented out to use the mock file
  } = useSelector(state => ({
    // missions: state.getIn(['dashboard', 'missionsData']),
    missionsLoading: state.getIn(['dashboard', 'missionsLoading']),
    // "profile matching" section
    // briefsData: state.getIn(['dashboard', 'briefsData']),
    briefsLoading: state.getIn(['dashboard', 'briefsLoading'])
  }));

  const [currentMissions, setCurrentMissions] = useState([]);
  const [profileMatching, setProfileMatching] = useState([]);

  useEffect(() => {
    // dispatch(getMissionsLaunched());
    // dispatch(getBriefsLaunched());
  }, [dispatch]);

  useEffect(() => {
    setCurrentMissions(missions);
    setProfileMatching(briefs)
    // setProfileMatching()
  }, [missions]);

  const inProgressMissions = currentMissions?.filter(x => x.status === 'IN_PROGRESS' && x.brief.missionContext.startDate < today && !x.brief.dateEnd);
  const futureMissions = currentMissions?.filter(x => x.status === 'IN_PROGRESS' && x.brief.missionContext.startDate > today);
  const finishedMissions = currentMissions?.filter(x => x.status === 'FINISHED' && !!x.brief.dateEnd);

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
    if (inProgressMissions?.length > 0 || futureMissions?.length > 0 || finishedMissions?.length > 0 || profileMatching?.length > 0) {
      missionsList = (
        <Grid item>
          <Box my={6}>
            {profileMatching?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.profileMatching')}
                </Typography>
                {profileMatching
                  .sort((a, b) => a.missionContext.startDate - b.missionContext.startDate)
                  .map((matching, key) => <Mission key={key} matching={matching} />)
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
                  .sort((a, b) => a.brief.missionContext.startDate - b.brief.missionContext.startDate)
                  .map((mission, key) => <Mission key={key} mission={mission} today={today} />)}
              </>
            )}
            {inProgressMissions?.length > 0 && (
              <>
                {displayInProgressMissionsTitle()}
                {inProgressMissions
                  .sort((a, b) => a.brief.missionContext.startDate - b.brief.missionContext.startDate)
                  .map((mission, key) => <Mission key={key} mission={mission} />)}
              </>
            )}
            {finishedMissions?.length > 0 && (
              <>
                <Typography variant="h2">
                  {t('dashboard.missions.finished')}
                </Typography>
                {finishedMissions
                  .sort((a, b) => a.brief.missionContext.startDate - b.brief.missionContext.startDate)
                  .map((mission, key) => <Mission key={key} mission={mission} />)}
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