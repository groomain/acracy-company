import React, { useState } from 'react';
import { CustomButton } from '../../Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Draft from '../Draft';
import { formatWithLineBreak } from '../../../utils/format';
import CircularProgress from '@material-ui/core/CircularProgress';

const Drafts = ({ drafts, loading, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  let draftsList = (
    <Box textAlign="center" style={{ width: '100%' }}>
      <Typography variant='h2' className={classes.noDrafts}>{formatWithLineBreak(t('noDraft'))}</Typography>
    </Box>
  );

  if (loading) {
    draftsList = (
      <Box mx='auto'>
        <CircularProgress color="primary" size={30} />
      </Box>
    )
  }

  if (drafts.length > 0 && !loading) {
    draftsList = drafts.map((draft, key) => <Draft draft={draft} key={key} />)
  };

  return (
    <Grid
      container
      className={classes.draftsWrapper}
      {...props}
    >
      {draftsList}
    </Grid>
  );
};

export default Drafts;
