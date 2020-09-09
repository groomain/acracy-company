import React from 'react';
import { useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';

import { Grid, Box, Typography } from '@material-ui/core';
import DraftWrapper from './DraftWrapper';
import Button from '../../Button';
import { formatWithLineBreak } from '../../../utils/services/format';
import styles from './styles';

const FirstDraft = () => {
    const history = useHistory();
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
          <Button title={t('draft.firstBriefButton')} theme='filledButton' onClick={() => history.push("/lead")} />
        </Box>
      </Grid>
    </DraftWrapper>
  );
};

export default FirstDraft;
