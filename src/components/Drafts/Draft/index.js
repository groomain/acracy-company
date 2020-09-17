import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as moment from 'moment';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { CustomButton } from '../../Button';
import DraftWrapper from './DraftWrapper';
import SearchIcon from '../../../assets/icons/searchIcon';
import StartIcon from '../../../assets/icons/demarrer.svg';
import ToValidateIcon from '../../../assets/icons/a-valider.svg';
import WaitingForCallIcon from '../../../assets/icons/en-attente-de-rappel.svg';
//
import { setLeadCreationStep } from '../../../pages/HomePage/reducer';
import { deleteLeadLaunched } from '../../../pages/HomePage/reducer';
//
import { shortenLongText } from '../../../utils/services/format';
import { getPath } from '../../../utils/services/validationChecks';
import styles from './styles';


moment.locale('fr');

const Draft = ({ draft }) => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const START_LEAD = t('draft.startBrief');
  const FINALIZE_BRIEF = t('draft.finalizeBrief');
  const GET_CALLED = t('draft.getCalled');

  const { deletingLeadLoading } = useSelector(state => ({
    deletingLeadLoading: state.getIn(['dashboard', 'deletingLeadLoading']),
  }));
  const [open, setOpen] = useState(false);
  const [getStatusResult, setGetStatusResult] = useState();

  const creationDate = draft?.createdDate;
  const date = moment(creationDate).format("DD.MM à HH:mm");

  const checkNoExpertisesOrLanguages = () => {
    const requirementsArrayToMatch = ["requirements.expertises", "requirements.languages"];
    const receivedRequirements = getPath(draft.missionRequirements, 'requirements');

    const stuff = requirementsArrayToMatch.every(function (element, index) {
      return element === receivedRequirements[index];
    });
    if (requirementsArrayToMatch.length == receivedRequirements.length && stuff) {
      return true
    }
  };

  useEffect(() => {
    const getStatus = (draftStatus) => {
      let status;
      if (draftStatus === 'DRAFT') {
        if (draft?.missionDetail || !checkNoExpertisesOrLanguages()) {
          return status = {
            title: FINALIZE_BRIEF,
            progress: 80
          }
        } else {
          return status = {
            title: START_LEAD,
            progress: 10,
            status: 'lead'
          }
        }
      } else if (draftStatus === 'HELP_NEEDED' || checkNoExpertisesOrLanguages()) {
        if (!draft?.missionDetail || !draft?.missionRequirements) {
          return status = {
            title: GET_CALLED,
            progress: 40,
            status: 'lead'
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
  }, [FINALIZE_BRIEF, GET_CALLED, START_LEAD, draft, draft.status, draft.missionDetail]);

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
      dispatch(setLeadCreationStep(0))
    } else {
      dispatch(setLeadCreationStep(1))
    }
  };

  return (
    <DraftWrapper>
      <Grid container direction={"row"}>
        <Grid item container direction='column' xs={11}>
          <NavLink
            to={`/lead/${draft?.externalId}`}
            className={classes.draftLink}
            onClick={setLeadStep}>
            <Grid item container direction='row' className={classes.statusLine}>
              <Box className={classes.iconBox}>{renderIcon(getStatusResult)}</Box>
              <Grid item>
                <Typography variant='h2'
                  className={classes.toUppercase}>{getStatusResult?.title} ({getStatusResult?.progress} %)</Typography>
                <Typography variant='body2'>Créé le : {date}</Typography>
              </Grid>
            </Grid>
            <Box className={classes.titleLine}>
              <Grid container wrap="nowrap">
                <Grid item>
                  <Box className={classes.titleBox}>
                    <Typography variant='h3'
                      className={draft?.missionContext.title ? null : classes.newDraft}>
                      {draft?.missionContext.title ? shortenLongText(draft?.missionContext.title, 42) : t('draft.newBriefTitle')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.searchLine}>
              <Grid container alignItems='center'>
                <Grid item container>
                  <SearchIcon color='#fff' size="small" />
                  <Box mx={1.5}>
                    <Typography variant='body2'>{shortenLongText(draft?.search.text, 30)}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </NavLink>
        </Grid>
        <Grid item xs={1}>
          {
            getStatusResult?.title !== GET_CALLED &&
            <IconButton aria-label="close" size="small" onClick={() => setOpen(!open)}>
              <ClearIcon color="secondary" />
            </IconButton>
          }
        </Grid>
        {open &&
          <Grid
            container
            direction='column'
            className={classes.overlay}
          >
            <CustomButton
              type="button"
              handleClick={deleteLead}
              loading={deletingLeadLoading}
              title={t('draft.confirmDelete')}
              theme="filledButton"
              className={classes.buttonGroup}
            />
            <CustomButton
              type="button"
              handleClick={() => setOpen(!open)}
              title={t('draft.cancel')}
              theme="primaryButton"
              className={classes.buttonGroup}
            />
          </Grid>
        }
      </Grid>
    </DraftWrapper>
  )
};

export default Draft;
