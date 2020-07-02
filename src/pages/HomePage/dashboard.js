import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import clsx from 'clsx';
import { push } from "connected-react-router";

import { Grid, Typography, Box } from '@material-ui/core/';

import Searchbar from '../../components/Searchbar';
import Drafts from '../../components/Drafts/DraftsWrapper';
import Missions from '../../components/Missions';
import sharedStyles from "../../utils/styles";

export const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const { userName } = useSelector(state => ({
    userName: state.getIn(['app', 'userDynamo', 'employeeFirstName'])
  }))

  const handleSearchResult = (e) => {
    dispatch(push(e.TEXT ? `/lead?searchType=${e.TYPE}&searchCode=${e.objectID}&searchText=${e.TEXT}` : `/lead?searchText=${e.value}`));
  }

  return (
    <Grid className={clsx(sharedClasses.pannelLayout, sharedClasses.fullPage)}>
      <Grid item className={sharedClasses.midWidth}>
        <Typography variant='h1'>{t('dashboard.welcome')}{userName || 'Pascal'}</Typography>
        <Box my={2}>
          <Typography variant='body1'>{t('dashboard.subtitle')}</Typography>
        </Box>
        <Box my={2}>
          <Searchbar onUpdateChosenCategory={handleSearchResult} />
        </Box>
      </Grid>
      <Box my={6}>
        <Box my={6}>
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