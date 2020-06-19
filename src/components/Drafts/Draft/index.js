import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as moment from 'moment';

import { CustomButton } from '../../Button';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import styles from './styles';
import DraftWrapper from './DraftWrapper';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '../../../assets/icons/searchIcon';
import StartIcon from '../../../assets/icons/demarrer.svg';
import ToValidateIcon from '../../../assets/icons/a-valider.svg';
import WaitingForCallIcon from '../../../assets/icons/en-attente-de-rappel.svg';

import { setLeadCreationStep } from '../../../pages/HomePage/reducer';
import { shortenLongText } from '../../../utils/format';
import { deleteLeadLaunched } from '../../../pages/HomePage/reducer';

moment.locale('fr');

const Draft = ({ draft }) => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const START_LEAD = t('draft.startBrief');
  const FINALIZE_BRIEF = t('draft.finalizeBrief');
  const GET_CALLED = t('draft.getCalled');

  const { deletingLeadLoading } = useSelector(state => ({
    deletingLeadLoading: state.getIn(['leads', 'deletingLeadLoading']),
  }));
  const [open, setOpen] = useState(false);
  const [getStatusResult, setGetStatusResult] = useState();

  const startDate = draft?.missionContext.startDate;
  const date = moment.unix(startDate).format("MM.DD à hh:mm");

  /**
   * Goes through a complex object (with nested objects) to check for empty values
   * @param {object} obj - The complex object to check for empty values 
   * @param {string} path - The base string to be concatenated with the path of the missing values
   * @returns {array} - A list of all missing values, the path of the key being represented as a string separated by '.' (ex : obj.draft.status)
   */
  const getPath = (obj, path) => {
    var props = [];
    for (var key in obj) {
      if (obj[key] === "" || obj[key].length === 0) {
        props.push(path + '.' + key);
      }
      if (obj[key] instanceof Object) {
        props.push.apply(props, getPath(obj[key], path + '.' + key));
      }
    }
    return props;
  };

  const missionContextLength = getPath(draft?.missionContext, 'missionContext').length;
  const missionDetailEmpty = getPath(draft?.missionDetail, 'missionDetail').length > 1;

  useEffect(() => {
    const getStatus = (draftStatus) => {
      let status;
      if (draftStatus === 'DRAFT') {
        if (missionContextLength !== 0) {
          return status = {
            title: START_LEAD,
            progress: 10,
            status: 'lead'
          }
        }
        else {
          return status = {
            title: FINALIZE_BRIEF,
            progress: 80
          }
        }
      } else if (draftStatus === 'HELP_NEEDED') {
        if (missionContextLength !== 0) {
          return status = {
            title: GET_CALLED,
            progress: 40
          }
        } else {
          return status = {
            title: GET_CALLED,
            progress: 80
          }
        }
      }
    }
    const result = getStatus(draft?.status);
    setGetStatusResult(result);
  }, [FINALIZE_BRIEF, GET_CALLED, START_LEAD, draft, draft.status, missionContextLength]);

  const renderIcon = (getStatusResult) => {
    if (getStatusResult?.title === GET_CALLED) {
      return <img src={WaitingForCallIcon} alt="pending" />
    } else if (getStatusResult?.title === FINALIZE_BRIEF) {
      return <img src={ToValidateIcon} alt="to be validated" />
    } else {
      return <img src={StartIcon} alt="start" />
    }
  };

  const deleteLead = () => {
    dispatch(deleteLeadLaunched(draft?.externalId))
  };

  const setLeadStep = () => {
    if (getStatusResult?.status === 'lead' || !draft?.missionContext.title) {
      dispatch(setLeadCreationStep(null))
    } else {
      dispatch(setLeadCreationStep(2))
    }
  };

  return (
    <DraftWrapper>
      <Grid container justify='space-between' alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Box className={classes.iconBox}>{renderIcon(getStatusResult)}</Box>
            <Grid>
              <Typography variant='h2' className={classes.toUppercase}>{getStatusResult?.title} ({getStatusResult?.progress} %)</Typography>
              <Typography variant='body2'>Créé le : {date}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton aria-label="close" size="small" onClick={() => setOpen(!open)}>
            <ClearIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
      <NavLink
        to={`/lead/${draft?.externalId}`}
        className={classes.draftLink}
        onClick={setLeadStep}
      >
        <Box className={classes.titleBox}>
          <Typography variant='h3' className={draft?.missionContext.title ? null : classes.newDraft}>
            {draft?.missionContext.title ? shortenLongText(draft?.missionContext.title, 42) : t('draft.newBriefTitle')}
          </Typography>
        </Box>
      </NavLink>
      <Grid container>
        <SearchIcon color='#fff' size="small" />
        <Box mx={1.5}>
          <Typography variant='body2'>{shortenLongText(draft?.search.text, 30)}</Typography>
        </Box>
      </Grid>

      {open &&
        <Grid
          container
          direction='column'
          className={classes.overlay}>
          <Grid item>
            <CustomButton
              type="button"
              handleClick={deleteLead}
              loading={deletingLeadLoading}
              title={t('draft.confirmDelete')}
              theme="filledButton"
            />
          </Grid>
          <Grid item>
            <CustomButton
              type="button"
              handleClick={() => setOpen(!open)}
              title={t('draft.cancel')}
              theme="primaryButton"
            />
          </Grid>
        </Grid>
      }
    </DraftWrapper >
  )
};

export default Draft;
