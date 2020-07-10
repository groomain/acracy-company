import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@material-ui/core/';

import CustomExpansionPanel from '../../CustomExpansionPanel';
import CheckableTag from '../CheckableTag';
import CustomButton from '../../Button';

import { setExpansionPanelOpen, setSelectedExpertise, setExpertisePriorities, setSelectedSensitivity, setSelectedLanguage } from '../../../pages/LeadCreationPage/reducer';

export const TagsList = ({ tags, type, maxSelection }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tagsListWithCheckedKey, setTagsListWithCheckedKey] = useState(tags.map(x => ({ ...x, checked: false })));
  const selectedTags = tagsListWithCheckedKey?.filter(item => item.checked)

  const onCheckChange = (index) => {
    setTagsListWithCheckedKey(tagsListWithCheckedKey.map((item, i) => (index === i) ? { ...item, checked: !item.checked } : item));
  }

  const handleSelection = () => {
    if (type === 'expertise') {
      dispatch(setSelectedExpertise(selectedTags));
      dispatch(setExpertisePriorities([]))
    } else if (type === 'sensitivity') {
      dispatch(setSelectedSensitivity(selectedTags))
    } else if (type === 'languages') {
      dispatch(setSelectedLanguage(selectedTags))
    }
    dispatch(setExpansionPanelOpen(false));
  };

  return (
    <Box my={2}>
      <CustomExpansionPanel
        id={type}
        isTag
        panelTitle={selectedTags.length > 0 ? t('tagsList.fieldTitleStarted') : t('tagsList.fieldTitleNewSelection')}>
        <Grid>
          <div>
            {tagsListWithCheckedKey?.map((tag, key) => <CheckableTag
              key={key}
              title={tag.text}
              isGrey={tag.code === ''}
              handleChecked={() => onCheckChange(key)}
              checked={tag.checked}
              disabled={selectedTags.length >= maxSelection && selectedTags.indexOf(tag) === -1}
            />)}
            <CustomButton
              title={t('buttonTitles.validate')}
              theme="asLink"
              rippleDisabled
              disabled={selectedTags.length < 1}
              handleClick={handleSelection}
            />
          </div>
        </Grid>
      </CustomExpansionPanel>
    </Box>
  )
};

export default TagsList;