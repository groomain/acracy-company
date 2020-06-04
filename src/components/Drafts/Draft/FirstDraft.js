import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Box, Typography } from '@material-ui/core';
import DraftWrapper from './DraftWrapper';
import Button from '../../Button';
import { formatWithLineBreak } from '../../../utils/format';
import styles from './styles';

const FirstDraft = () => {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <DraftWrapper>
      <Grid
        container
        direction='column'
        justify="center"
      >
        <Typography variant='h3' color='primary' className={classes.firstBriefTitle}>
          {formatWithLineBreak(t('draft.firstBriefTitle'))}
        </Typography>
        <Box>
          <Button title={t('draft.firstBriefButton')} theme='filledButton' component={RouterLink} to="/newbrief" />
        </Box>
      </Grid>
    </DraftWrapper>
  );
};

export default FirstDraft;