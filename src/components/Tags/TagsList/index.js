import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Box } from '@material-ui/core/';

import CustomExpansionPanel from '../../CustomExpansionPanel';
import CheckableTag from '../CheckableTag';
import CustomButton from '../../Button';

export const TagsList = ({ tags }) => {
  const { t } = useTranslation();

  const disabled = false;
  const started = true;

  return (
    <>
      <Grid container justify="space-between">
        <Typography variant="h4">{t('tagsList.label') + '*'}</Typography>
        <Typography variant="h2">{t('tagsList.minMaxInfo')}</Typography>
      </Grid>
      <Box my={2}>
        <CustomExpansionPanel isTag panelTitle={started ? t('tagsList.fieldTitleStarted') : t('tagsList.fieldTitleNewSelection')}>
          <Grid>
            <div>
              {tags && tags.map((tag, key) => <CheckableTag key={key} title={tag.title} />)}
              <CustomButton
                title={t('tagsList.button')}
                theme="asLink"
                rippleDisabled
                disabled={disabled}
              />
            </div>
          </Grid>
        </CustomExpansionPanel>
      </Box>
    </>
  )
};

export default TagsList;