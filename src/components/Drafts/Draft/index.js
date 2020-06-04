import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../Button';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import styles from './styles';
import DraftWrapper from './DraftWrapper';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '../../../assets/icons/searchIcon';
import StartIcon from '../../../assets/icons/demarrer.svg';
import ToValidateIcon from '../../../assets/icons/a-valider.svg';
import WaitingForCallIcon from '../../../assets/icons/en-attente-de-rappel.svg';

const Draft = ({ draft }) => {
  const classes = styles();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const renderIcon = () => {
    switch (draft.status) {
      case 'To Validate':
        return <img src={ToValidateIcon} alt="to be validated" />
      case 'Pending':
        return <img src={WaitingForCallIcon} alt="pending" />
      case 'Start':
        return <img src={StartIcon} alt="start" />
      default:
        return <img src={StartIcon} alt="start" />
    };
  };

  return (
    <DraftWrapper>
      <Grid container justify='space-between' alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Box className={classes.iconBox}>{renderIcon()}</Box>
            <Grid>
              <Typography variant='h2' className={classes.toUppercase}>{draft.title} ({draft.progress} %)</Typography>
              <Typography variant='body2'>Créé le : {draft.date} à {draft.time}</Typography>
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
        {draft.new
          ? <Typography variant='h3' className={classes.newDraft}>
            {t('draft.newBriefTitle')}
          </Typography>
          : <Typography variant='h3'>{draft.missionContext.title}</Typography>
        }
      </Box>
      <Grid container>
        <SearchIcon color='#fff' size="small" />
        <Box mx={1.5}>
          <Typography variant='body2'>{draft.search.text}</Typography>
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
              handleClick={() => console.log("Deleted !")}
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
