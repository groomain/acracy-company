import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@material-ui/core/';
import CustomExpansionPanel from '../../CustomExpansionPanel';
import CheckableTag from '../CheckableTag';
import CustomButton from '../../Button';

import { setExpansionPanelOpen, setSelectedExpertise, setSelectedSensitivity, setSelectedLanguage } from '../../../pages/LeadCreationPage/reducer';

export const TagsList = ({ tags, type, maxSelection, selectedExpertiseArray, selectedSensitivityArray, selectedLanguagesArray, value, handleChange, expertises }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tagsListWithCheckedKey, setTagsListWithCheckedKey] = useState();
  const [selectedTags, setSelectedTags] = useState(tagsListWithCheckedKey?.filter(item => item?.expertise?.checked) || [])

  const onCheckChange = (index) => {
    let newCheckedTags = tagsListWithCheckedKey.map((item, i) => (index === i) ? { ...item, checked: !item.checked } : item)
    setTagsListWithCheckedKey(newCheckedTags);
    newCheckedTags = newCheckedTags?.filter(item => item?.checked)
    if (type === 'expertise') {
      newCheckedTags = newCheckedTags?.map(item => { return { "expertise": { "code": item.code, "text": item.text } } })
    }
    else if (type === 'languages') {
      newCheckedTags = newCheckedTags.length > 0 ? [{ language: newCheckedTags[0].type, essential: false }] : []
    }
    else if (type === 'sensitivity') {
      newCheckedTags = newCheckedTags.length > 0 ? { sensitivity: { code: newCheckedTags[0].code, text: newCheckedTags[0].text }, essential: false } : {}
    }
    handleChange(newCheckedTags)
  }

  useEffect(() => {
    setSelectedTags(tagsListWithCheckedKey?.filter(item => item?.checked))
  }, [tagsListWithCheckedKey])

  useEffect(() => {
    let checked
    if (type === 'expertise') {
      setTagsListWithCheckedKey(tags.map(x => {
        if (selectedExpertiseArray?.find(y => y?.expertise?.code === x.code)) { checked = true } else { checked = false }
        return ({
          "code": x.code, "text": x.text, "checked": checked
        })
      }))
    } else if (type === 'sensitivity') {
      setTagsListWithCheckedKey(tags.map(x => {
        if (selectedSensitivityArray?.find(y => y?.sensitivity?.code === x.code)) { checked = true } else { checked = false }
        return ({
          "code": x?.code, "text": x?.text, "checked": checked
        })
      }))
    } else if (type === 'languages') {
      setTagsListWithCheckedKey(tags.map(x => ({ ...x, checked: selectedLanguagesArray?.includes(x?.text) })))
    }
  }, [selectedExpertiseArray, selectedLanguagesArray, selectedSensitivityArray, tags]);

  const handleSelection = () => {
    if (type === 'expertise') {
      dispatch(setSelectedExpertise(selectedTags));
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
        panelTitle={selectedTags?.length > 0 ? t('tagsList.fieldTitleStarted') : t('tagsList.fieldTitleNewSelection')}
      >
        <Grid>
          <div>
            {tagsListWithCheckedKey?.map((tag, key) => <CheckableTag
              key={key}
              title={tag.text}
              isGrey={tag.code === ''}
              handleChecked={() => onCheckChange(key)}
              checked={tag.checked}
              disabled={selectedTags?.length >= maxSelection && selectedTags?.indexOf(tag) === -1}
            />)}
            <CustomButton
              title={t('buttonTitles.validate')}
              theme="asLink"
              rippleDisabled
              disabled={selectedTags?.length < 1}
              handleClick={handleSelection}
            />
          </div>
        </Grid>
      </CustomExpansionPanel >
    </Box >
  )
};

export default TagsList;