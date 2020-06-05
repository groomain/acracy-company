import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { CustomButton } from '../../Button';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import styles from './styles';
import DraftWrapper from './DraftWrapper';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '../../../assets/icons/searchIcon';
import StartIcon from '../../../assets/icons/demarrer.svg';
import ToValidateIcon from '../../../assets/icons/a-valider.svg';
import WaitingForCallIcon from '../../../assets/icons/en-attente-de-rappel.svg';

import { shortenLongText } from '../../../utils/format';
import { deleteLeadLaunched } from '../../../pages/HomePage/reducer';

const Draft = ({ draft, draftId }) => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newDraft, setNewDraft] = useState(false);
  const { deletingLeadLoading } = useSelector(state => ({
    deletingLeadLoading: state.getIn(['leads', 'deletingLeadLoading']),
  }));

  /**
   * Goes through an object (nested or not) to check for empty values
   * @param {object} obj - The object to check for empty values 
   * @param {string} path - The base string to be concatenated with the path of the missing values
   * @returns {array} - A list of all missing values, the path of the key being represented as a string separated by '.' (ex : obj.draft.status)
   */
  const getPath = (obj, path) => {
    var props = [];
    for (var key in obj) {
      if (obj[key] === "") {
        props.push(path + '.' + key);
      }
      if (obj[key] instanceof Object) {
        props.push.apply(props, getPath(obj[key], path + '.' + key));
      }
    }
    return props;
  };
  const path = getPath(draft, "obj");

  useEffect(() => {
    if (path.length > 1 && !path["obj.search.text"]) {
      setNewDraft(true)
    }
  }, [path]);

  const getStatus = (draftStatus, path) => {
    let status;
    if (draftStatus === 'DRAFT') {
      if (path.length < 1) {
        return status = {
          title: 'Démarrer brief',
          progress: 10
        }
      } else if (path.length > 1 && !path["obj.search.text"]) {
        return status = {
          title: 'Démarrer brief',
          progress: 30
        }
      } else {
        return status = {
          title: 'Brief à finaliser',
          progress: 80
        }
      }
    } else if (draftStatus === 'HELP_NEEDED') {
      if (path.length < 1) {
        return status = {
          title: 'En attente de rappel',
          progress: 40
        }
      } else {
        return status = {
          title: 'En attente de rappel',
          progress: 80
        }
      }
    }
  }
  const result = getStatus(draft?.status, path);

  const renderIcon = (result) => {
    if (result?.title === 'En attente de rappel') {
      return <img src={WaitingForCallIcon} alt="pending" />
    } else if (result?.title === 'Brief à finaliser') {
      return <img src={ToValidateIcon} alt="to be validated" />
    } else {
      return <img src={StartIcon} alt="start" />
    }
  };

  const deleteLead = () => {
    dispatch(deleteLeadLaunched(draftId))
  };

  return (
    <DraftWrapper>
      <Grid container justify='space-between' alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Box className={classes.iconBox}>{renderIcon(result)}</Box>
            <Grid>
              <Typography variant='h2' className={classes.toUppercase}>{result?.title} ({result?.progress} %)</Typography>
              <Typography variant='body2'>Créé le : {draft?.missionContext.startDate} à {draft?.time}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton aria-label="close" size="small" onClick={() => setOpen(!open)}>
            <ClearIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>

      <Box className={classes.titleBox}>
        {newDraft
          ? <Typography variant='h3' className={classes.newDraft}>
            {t('draft.newBriefTitle')}
          </Typography>
          : <Typography variant='h3'>{shortenLongText(draft?.missionContext.title, 37)}</Typography>
        }
      </Box>
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
    </DraftWrapper>
  )
};

export default Draft;
