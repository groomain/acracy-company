import React, { useState } from 'react';
import { CustomButton } from '../../Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import styles from './styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import Dot from '../../Dot';

const Draft = ({ draft }) => {
  const classes = styles();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <Box className={classes.draft} >
      <Grid container justify='space-between'>
        <Grid item>
          <Grid container alignItems="center">
            <Dot />
            <Grid>
              <Typography variant='h2' className={classes.toUppercase}>{draft.status} ({draft.progress} %)</Typography>
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
          ? <Typography variant='h3' className={classes.newDraft}>Votre nouveau brief vous attend !</Typography>
          : <Typography variant='h3'>{draft.title}</Typography>
        }
      </Box>
      <Grid container>
        <SearchIcon color="secondary" size="small" />
        <Box mx={1.5}>
          <Typography variant='body2'>{draft.target}</Typography>
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
              title={t('confirmDelete')}
              theme="filledButton"
            />
          </Grid>
          <Grid item>
            <CustomButton
              type="button"
              handleClick={() => setOpen(!open)}
              title={t('cancel')}
              theme="primaryButton"
            />
          </Grid>
        </Grid>
      }
    </Box>
  )
};

export default Draft;
