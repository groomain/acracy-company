import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Box } from '@material-ui/core/';

import CustomExpansionPanel from '../../CustomExpansionPanel';
import CheckableTag from '../CheckableTag';
import CustomButton from '../../Button';

import { setExpansionPanelOpen } from '../../../pages/LeadCreationPage/reducer';

export const TagsList = ({ tags, onUpdateSelection }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const disabled = false;  // disabled should be a prop
  const started = true;

  const { expansionPanelOpen } = useSelector(state => ({
    expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
  }));
  const [open, setOpen] = React.useState(expansionPanelOpen);

  // useEffect(() => {
  //   dispatch(setExpansionPanelOpen(expansionPanelOpen))
  // }, [expansionPanelOpen, dispatch]);

  const handleExpansion = (open) => {

    console.log('handle expansion : tagslist');
    setOpen(false)
    dispatch(setExpansionPanelOpen(open));
  };

  return (
    <>
      <Grid container justify="space-between">
        <Typography variant="h4">{t('tagsList.label') + '*'}</Typography>
        <Typography variant="h2">{t('tagsList.minMaxInfo')}</Typography>
      </Grid>
      <Box my={2}>
        <CustomExpansionPanel
          isTag
          // expand={expansionPanelOpen}
          panelTitle={started ? t('tagsList.fieldTitleStarted') : t('tagsList.fieldTitleNewSelection')}>
          <Grid>
            <div>
              {tags?.map((tag, key) => <CheckableTag key={key} title={tag.text} isGrey={tag.code ? false : true} />)}
              <CustomButton
                title={t('buttonTitles.validate')}
                theme="asLink"
                rippleDisabled
                disabled={disabled}
                handleClick={() => handleExpansion(open)}
              />
            </div>
          </Grid>
        </CustomExpansionPanel>
      </Box>
    </>
  )
};

export default TagsList;