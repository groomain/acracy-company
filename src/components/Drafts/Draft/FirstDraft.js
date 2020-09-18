import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Box, Typography } from '@material-ui/core';
import DraftWrapper from './DraftWrapper';
import Button from '../../Button';
import { formatWithLineBreak } from '../../../utils/services/format';
import styles from './styles';

const FirstDraft = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = styles();

  const { briefsData, missions } = useSelector(state => ({
    missions: state.getIn(['dashboard', 'missionsData']),
    briefsData: state.getIn(['dashboard', 'briefsData']),
  }));

  const renderTitle = () => {
    if (missions?.length > 0 || briefsData?.length > 0) {
      return formatWithLineBreak(t('draft.addBrief'))
    } else {
      return formatWithLineBreak(t('draft.firstBriefTitle'))
    }
  };

  return (
    <DraftWrapper>
      <Grid
        container
        direction='column'
        justify="center"
      >
        <Typography variant='h3' color='primary' className={classes.firstBriefTitle}>
          {renderTitle()}
        </Typography>
        <Box>
          <Button title={t('draft.firstBriefButton')} theme='filledButton' onClick={() => history.push("/lead")} />
        </Box>
      </Grid>
    </DraftWrapper>
  );
};

export default FirstDraft;
