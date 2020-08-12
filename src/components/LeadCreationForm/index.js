import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Searchbar';
import { CustomButton } from '../Button/';
import { CustomTextField } from '../Inputs/CustomTextField';
import CustomTextArea from '../Inputs/CustomTextArea';
import CustomSelect from "../Inputs/CustomSelect";
import Calendar from "../Inputs/Calendar";
import TagsList from '../Tags/TagsList';
import Tag from '../Tags/Tag';
import backToTop from '../../utils/backToTop';
import CustomModal from '../Modal';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box, InputAdornment, StepConnector } from "@material-ui/core";
import {
  setLeadDraftSearchData, setDeliverablesArray, setDailyRate,
  changeLeadStatusLaunched, getExpertisesLaunched, setExpertisePriorities,
  getSensitivitiesLaunched, setSensitivityPriority, setLanguagePriority, setSelectedExpertise, setSelectedSensitivity, setSelectedLanguage
} from '../../pages/LeadCreationPage/reducer';
import { setLeadCreationStep } from '../../pages/HomePage/reducer';
import { handleCurrentStep } from "../App/reducer";

import { leadSave } from '../../pages/LeadCreationPage/index';
import clsx from 'clsx';
import styles from './styles';

import { languages, seniorityValues } from './options';
import UploadInput from '../Inputs/LeadUpload';

import { checkLength } from '../../utils/services/validationChecks';
import { formatLanguagesValues } from '../../utils/services/format';
// import { valueFocusAriaMessage } from 'react-select/src/accessibility';

const LeadCreationForm = ({ sendValues, values, errors, touched, handleBlur, handleChange, leadId, onUpdateMissionTitle, handleSubmit, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { frequency, workspace, duration, durationType, budget, budgetType, profile, profilesNumber,
    missionContext, missionRequirements, missionDetail, expertises, customDeliverable
  } = values;


  const { listOfExpertises, expansionPanelOpen, sensitivities } = useSelector(state => ({
    listOfExpertises: state.getIn(['leadCreation', 'expertises']),
    expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
    sensitivities: state.getIn(['leadCreation', 'sensitivities']),

  }))

  const [searchedCategory, setSearchedCategory] = useState();
  const [deliverables, setDeliverables] = useState([]);
  const [dailyCost, setDailyCost] = useState();
  const [withCommission, setWithCommission] = useState();
  const [openCallMeModal, setOpenCallMeModal] = useState(false);
  const [disableCallMeBtn, setDisableCallMeBtn] = useState(true);
  const [disableGoToFinalizationBtn, setDisableGoToFinalizationBtn] = useState(true);

  useEffect(() => {
    if (values?.missionContext.budget.value &&
      values?.missionContext.budget.type &&
      values?.missionContext.duration.nb &&
      values?.missionContext.duration.unit &&
      values?.missionContext.weeklyRythm &&
      values?.missionContext.profilNumber) {
      let preciseRate

      let daysNb = getFrequency(values?.missionContext.weeklyRythm)
      if (values?.missionContext.budget.type === 'Taux journalier') {  // DAILY_RATE
        // montant global = budget x durée x nbprofils x 1.15
        if (values?.missionContext.duration.unit === 'Mois') {
          preciseRate = parseInt(values?.missionContext.budget.value, 10) * daysNb * parseInt(values?.missionContext.duration.nb, 10) * 4 * parseInt(values?.missionContext.profilNumber, 10) * 1.15;
        } else if (values?.missionContext.duration.unit === 'Semaines') {
          preciseRate = parseInt(values?.missionContext.budget.value, 10) * daysNb * parseInt(values?.missionContext.duration.nb, 10) * parseInt(values?.missionContext.profilNumber, 10) * 1.15;
        } else if (values?.missionContext.duration.unit === 'Jours') {
          preciseRate = parseInt(values?.missionContext.budget.value, 10) * parseInt(values?.missionContext.duration.nb, 10) * parseInt(values?.missionContext.profilNumber, 10) * 1.15;
        }
        // let budget = values.budget;
        // setDailyCost(budget);
        setWithCommission(Math.ceil(preciseRate));
      } else if (values?.missionContext.budget.type === 'Budget total') { // TOTAL
        // TMJ = (budgetx0.85) / nb jours / nb profils
        if (values?.missionContext.duration.unit === 'Mois') {
          preciseRate = (parseInt(values?.missionContext.budget.value, 10) * 0.85) / (daysNb * parseInt(values?.missionContext.duration.nb, 10) * 4) / parseInt(values?.missionContext.profilNumber, 10);
        } else if (values?.missionContext.duration.unit === 'Semaines') {
          preciseRate = (parseInt(values?.missionContext.budget.value, 10) * 0.85) / (daysNb * parseInt(values?.missionContext.duration.nb, 10)) / parseInt(values?.missionContext.profilNumber, 10);
        } else if (values?.missionContext.duration.unit === 'Jours') {
          preciseRate = (parseInt(values?.missionContext.budget.value, 10) * 0.85) / parseInt(values?.missionContext.duration.nb, 10) / parseInt(values?.missionContext.profilNumber, 10);
        }
      }
      setWithCommission(Math.ceil(preciseRate));

      const newValue = {
        target: { name: 'missionContext.estimatedAverageDailyRate', value: preciseRate }
      }
      handleChange(newValue);
    }
  }, [values?.missionContext.budget, values?.missionContext.duration, values?.missionContext.profilNumber])

  //   eturn [t('leadCreation.synthesis'), t('leadCreation.details')];
  // };r
  const getStepContent = step => {
    return setLeadDetails()
    //return setLeadSynthesis();
  }



  const handleCallMe = () => {
    setOpenCallMeModal(true)
  }



  const getFrequency = (frequency) => {
    switch (frequency) {
      case 'Temps partiel (1 jour)':
        return (1)
      case 'Temps partiel (2 jours)':
        return (2)
      case 'Temps partiel (3 jours)':
        return (3)
      case 'Temps partiel (4 jours)':
        return (4)
      case 'Plein temps (5 jours)':
        return (5)
      default:
    }
  }



  const setOptionsValues = (fieldName) => {
    switch (fieldName) {
      case 'workspace':
        return (
          ['Peu importe', 'En remote uniquement', 'Sur place uniquement', 'En remote et sur place']
        )
      case 'frequency':
        return (
          ['Temps partiel (1 jour)', 'Temps partiel (2 jours)', 'Temps partiel (3 jours)', 'Temps partiel (4 jours)', 'Plein temps (5 jours)']
        )
      case 'duration':
        return (
          ['Jours', 'Semaines', 'Mois']
        )
      case 'budgetType':
        return (
          ['Taux journalier', 'Budget total']
        )
      case 'profilesNumber':
        return (
          [1, 2, 3, 4]
        )
      default:
    }
  }


  const handleDeliverablesChange = e => {
    setDeliverables(e);
  }


  const handleUpdateResearch = (e) => {
    setSearchedCategory(e);  // type, text and objectID
    dispatch(setLeadDraftSearchData({ search: e }))
  }


  //C'est le select avec la la liste des déliverables si on a choisit un profile en recherche
  const showDeliverablesSettings = () => {
    const selectableDeliverables = searchedCategory?.DELIVERABLES || searchedCategory?.links
    // || leadCreationPageWithSearchResult?.DELIVERABLES;
    let deliverablesList = [];
    if (selectableDeliverables) {
      deliverablesList = selectableDeliverables?.map((item) => {
        return item.TEXT;
      });
    }
    deliverablesList.push('Ne figure pas dans la liste');
    return (
      <>
        <Grid item xs={12} className={classes.fieldRows}>
          <CustomSelect
            onUpdateSelection={handleDeliverablesChange}
            label={(deliverables.length !== 0) ? t('leadCreation.modifyDeliverables') : t('leadCreation.selectDeliverables')}
            isMulti
            context='deliverables'
            name='deliverable'
            optionsValues={deliverablesList}
            onBlur={handleBlur}
            checkedArray={searchedCategory === values?.search ? values?.desireds : []}
          // onChange={handleChange} //// nope, isMulti
          />
          <Grid item container direction='row'>
            {deliverables?.map((deliverable, i) =>
              <Tag title={deliverable} key={i} />
            )}
          </Grid>
          {deliverables?.includes('Ne figure pas dans la liste') ?
            <Grid item xs={12} className={classes.fieldRows}>
              <CustomTextField
                label={t('leadCreation.customDeliverableLabel')}
                placeholder={t('leadCreation.customDeliverablePlaceholder')}
                name='customDeliverable'
                values={values?.missionTitle}
                onChange={handleChange}
              >
              </CustomTextField>
            </Grid>
            : null
          }
        </Grid>
      </>
    )
  }

  //C'est le select avec la la liste des profils si on a choisit un deliverable en recherche
  const showProfilesSettings = () => {
    let selectableProfiles = searchedCategory?.PROFILES || searchedCategory?.links
    //  || leadCreationPageWithSearchResult?.PROFILES;
    let selectableProfilesCopy = [...selectableProfiles];
    let enhancedList = selectableProfilesCopy.concat({ "TEXT": "Recevoir une recommandation acracy" })
    const profilesList = enhancedList.map((item) => {
      return item.TEXT;
    });
    return (
      <>
        <Grid item xs={12} className={classes.fieldRows}>
          <CustomSelect
            label={t('leadCreation.selectProfile')}
            optionsValues={profilesList}
            onChange={handleChange}
            value={profile}
            context='profileType'
            name='profile'
          />
        </Grid>
      </>
    )
  }

  // OK a garder
  const renderSearchedTypeSettings = (searchedCategory) => {
    if (searchedCategory?.TYPE === 'PROFILE' || searchedCategory?.type === 'PROFILE') {
      // || leadCreationPageWithSearchResult?.DELIVERABLES) {

      return showDeliverablesSettings()
    } else if (searchedCategory?.TYPE === 'DELIVERABLE' || searchedCategory?.type === 'DELIVERABLES') { }
    // || leadCreationPageWithSearchResult?.PROFILES) {
    return showProfilesSettings()
  }

  const minDate = new Date().setDate(new Date().getDate() + 30);
  // let startDate = missionContext.startDate
  // const [startDate, setStartDate] = useState(missionContext.startDate)

  const changeValue = (champs, e) => {
    console.log("changeValue -> e", e)
    let newValue = e
    if (champs === 'missionContext.startDate') {
      newValue = parseInt(e._d.getTime())
    }
    else if (champs === 'missionRequirements.expertises') {
      newValue = e
    }
    else if (champs === 'missionRequirements.languages') {
      newValue = e
    }

    const updatedValue = {
      target: { name: champs, value: newValue }
    }
    handleChange(updatedValue);
    // setFieldTouched(name, true, false);
  };

  // render complet de la page 0
  const setLeadSynthesis = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h1"} >{t('leadCreation.synthesis')}</Typography>
        <Grid container>

          <Grid item xs={12} className={classes.fieldRows}>
            {/* <SearchBar
              name='researchValue'
              context='leadCreation'
              onUpdateChosenCategory={handleUpdateResearch}
            /> */}
          </Grid>

          {searchedCategory ? renderSearchedTypeSettings(searchedCategory) : null}

          {/* Titre de la mission */}
          < Grid item xs={12} className={classes.fieldRows}>
            <CustomTextArea
              label={t('leadCreation.missionLabel')}
              placeholder={t('leadCreation.missionPlaceholder')}
              name='missionContext.title'
              id='missionContext.title'

              // values={missionTitle}
              maxLength={140}
              valueOut={missionContext.title}
              onChange={handleChange}
            ></CustomTextArea>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <Calendar
              name='missionContext.startDate'
              id='missionContext.startDate'
              label={t('leadCreation.calendarLabel')}
              minDate={minDate}
              handleChange={(e) => { changeValue('missionContext.startDate', e) }}
              value={missionContext.startDate || minDate}
              // defaultValue={missionContext.startDate || minDate}
              {...props}
            />
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.workspaceLabel')}
              optionsValues={setOptionsValues('workspace')}
              value={missionContext.format}
              name='missionContext.format'
              onChange={handleChange}

            ></CustomSelect>
          </Grid>
          {(missionContext.format === 'Sur place uniquement' || missionContext.format === 'En remote et sur place') ?
            <Grid item xs={12} className={classes.fieldRows}>
              <CustomTextField
                label={t('leadCreation.locationLabel')}
                placeholder={t('leadCreation.locationPlaceholder')}
                name='missionContext.address'
                value={missionContext.address}
                onChange={handleChange}
              ></CustomTextField>
            </Grid> : null
          }

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.frequencyLabel')}
              optionsValues={setOptionsValues('frequency')}
              onChange={handleChange}
              value={missionContext.weeklyRythm}
              name='missionContext.weeklyRythm'
            ></CustomSelect>
          </Grid>

          <Grid item container xs={12} className={classes.fieldRows}>
            <Box>
              <Typography variant={'body1'} >{t('leadCreation.durationLabel') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <CustomTextField
                  placeholder={t('leadCreation.durationPlaceholder')}
                  onChange={handleChange}
                  value={missionContext.duration.nb}
                  name='missionContext.duration.nb'
                ></CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <CustomSelect
                  optionsValues={setOptionsValues('duration')}
                  onChange={handleChange}
                  value={missionContext.duration.unit}
                  name='missionContext.duration.unit'
                ></CustomSelect>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} className={classes.fieldRows}>
            <Box>
              <Typography variant='body1'>{t('leadCreation.budgetLabel') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <CustomTextField
                  endAdornment={<InputAdornment position="end"><EuroSymbolIcon /></InputAdornment>}
                  onChange={handleChange}
                  value={missionContext.budget.value}
                  name='missionContext.budget.value'
                  placeholder={t('leadCreation.budgetPlaceholder')}
                  // error={!!touched.budget && !!errors.budget}
                  onBlur={handleBlur}
                ></CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <CustomSelect
                  optionsValues={setOptionsValues('budgetType')}
                  onChange={handleChange}
                  value={missionContext.budget.type}
                  name='missionContext.budget.type'
                ></CustomSelect>
                {(values?.missionContext.budget.value && values?.missionContext.budget.type && values?.missionContext.duration.nb && values?.missionContext.duration.unit && values?.missionContext.weeklyRythm && values?.missionContext.profilNumber) || values?.missionContext?.estimatedAverageDailyRate
                  ? <Typography variant='h2' style={{ marginTop: '-2rem', marginBottom: '1rem', paddingLeft: '0.45rem' }}>
                    {(values?.missionContext.budget.type === 'Taux journalier' || values?.missionContext?.budget?.type === 'TOTAL'
                      ? `Soit un montant global de ${withCommission || Math.ceil(values?.missionContext?.estimatedAverageDailyRate)}€, commission acracy incluse.`
                      : `Soit un taux journalier de ${withCommission || Math.ceil(values?.missionContext?.estimatedAverageDailyRate)}€, une fois la commission acracy déduite.`)}
                  </Typography>
                  : null}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.profilesLabel')}
              optionsValues={setOptionsValues('profilesNumber')}
              onChange={handleChange}
              value={missionContext.profilNumber}
              name='missionContext.profilNumber'
              id='missionContext.profilNumber'
            ></CustomSelect>
          </Grid>

          <Grid container justify='flex-end' className={classes.marginTop}>
            <Grid item>
              <CustomButton
                type="button"
                theme={disableCallMeBtn ? 'disabledOutlined' : 'primaryButton'}
                disabled={disableCallMeBtn}
                // handleClick={handleCallMe}
                title={t('leadCreation.callMe')}
              >
              </CustomButton>
            </Grid>
            <Grid item style={{ paddingLeft: '1.2rem' }}>
              <CustomButton
                type="submit"
                //theme={disableGoToFinalizationBtn ? 'disabledFilled' : 'filledButton'}
                theme='filledButton'
                handeclick={handleSubmit}
                // handleClick={handleSendData}
                title={t('leadCreation.finishBrief')}
              // loading={leadSaveLoading || updateLeadDraftLoading}
              // disabled={disableGoToFinalizationBtn}
              >
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box >
    )
  }

  ///////////////////step2////////////////

  useEffect(() => {
    // if (activeStep === 1) {
    // dispatch(handleCurrentStep(2))
    dispatch(getExpertisesLaunched());
    dispatch(getSensitivitiesLaunched());
    // } else if (activeStep === 0) {
    //   dispatch(handleCurrentStep(1))
    // }
  }, [dispatch])

  const handlePriorityCheck = (index) => {
    let updateValues = missionRequirements.expertises
    updateValues[index].priority = !missionRequirements.expertises[index].priority
    changeValue(`missionRequirements.expertises`, updateValues)
  }

  const handleSensitivityCheck = () => {
    let updateValues = missionRequirements.sensitivity
    updateValues.essential = !missionRequirements.sensitivity.essential
    changeValue(`missionRequirements.sensitivity`, updateValues)
  }
  const deliverablesTags = deliverables?.map(x => ({ value: x, isCustom: false }));
  const customDeliverableIndex = deliverables.indexOf('Ne figure pas dans la liste');

  if (~customDeliverableIndex && customDeliverable) {
    deliverablesTags[customDeliverableIndex] = { value: customDeliverable, isCustom: true }
  }
  const setLeadDetails = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant='h2'>{t('leadCreation.profileDetails')}</Typography>
        <Typography variant='h1'>{values?.search?.TEXT}</Typography>

        <Grid container>
          {/* Expertises */}
          {listOfExpertises.length > 0 && <Grid item xs={12} className={classes.fieldRows}>
            <Grid container justify="space-between">
              <Typography variant="h4">{t('tagsList.expertise.label') + '*'}</Typography>
              <Typography variant="h2">{t('tagsList.expertise.minMaxInfo')}</Typography>
            </Grid>
            <TagsList
              tags={listOfExpertises}
              panelTitle={t('leadCreation.profileExpertises')}
              type='expertise'
              maxSelection={5}
              handleChange={(e) => { changeValue('missionRequirements.expertises', e) }}
              name={'missionRequirements.expertises'}
              id={'missionRequirements.expertises'}
              selectedExpertiseArray={missionRequirements.expertises}
              value={missionRequirements.expertises}
            />
            {expansionPanelOpen !== 'expertise' &&
              < Grid item container direction='row'>
                {missionRequirements.expertises?.length > 0 && missionRequirements.expertises?.map((tag, key) => (
                  <Tag key={key}
                    title={tag.text || tag?.expertise?.text}
                    isPrimaryColor
                    tagType="Prioritaire"
                    isWithCheckbox
                    // handleChange={(e) => console.log(e, 'handlechange composant tag')}
                    expertises
                    onCheckChange={() => handlePriorityCheck(key)}
                    checkedArray={tag.priority}
                  />
                ))}
              </Grid>
            }
          </Grid>}

          {/* Sensitivities */}
          {sensitivities?.length > 0 &&
            <Grid item xs={12} className={classes.fieldRows}>
              <Box my={2.5}>
                <Grid container justify="space-between">
                  <Typography variant="h4">{t('tagsList.sensitivity.label')}</Typography>
                  <Typography variant="h2">{t('tagsList.sensitivity.minMaxInfo')}</Typography>
                </Grid>
                <TagsList
                  tags={sensitivities}
                  name={'missionRequirements.sensitivity'}
                  id={'missionRequirements.sensitivity'}
                  panelTitle={t('leadCreation.profileSensitivity')}
                  type='sensitivity'
                  maxSelection={1}
                  handleChange={(e) => { changeValue('missionRequirements.sensitivity', e) }}
                  selectedSensitivityArray={[missionRequirements?.sensitivity]}
                />
                {expansionPanelOpen !== 'sensitivity' &&
                  <Grid item container direction='row'>
                    {missionRequirements?.sensitivity?.sensitivity?.text &&
                      <Tag
                        title={missionRequirements?.sensitivity?.sensitivity?.text}
                        isPrimaryColor
                        tagType="Critère indispensable"
                        isWithCheckbox
                        checkedArray={missionRequirements?.sensitivity?.essential}
                        onCheckChange={() => handleSensitivityCheck()}
                      />}
                  </Grid>}
              </Box>
            </Grid>}

          {/* Languages */}
          {languages &&
            <Grid item xs={12} className={classes.fieldRows}>
              <Box my={2.5}>
                <Grid container justify="space-between">
                  <Typography variant="h4">{t('leadCreation.profileLanguages')}</Typography>
                </Grid>
                <TagsList
                  tags={languages}
                  panelTitle={t('leadCreation.profileLanguages')}
                  type='languages'
                  handleChange={(e) => { changeValue('missionRequirements.languages', e) }}
                  maxSelection={1}
                  selectedLanguagesArray={missionRequirements?.languages?.map(x => formatLanguagesValues(x.language) || x.text)}
                />
                {expansionPanelOpen !== 'languages' &&
                  <Grid item container direction='row'>
                    {missionRequirements?.languages?.length > 0 && missionRequirements?.languages?.map((tag, key) => (
                      <Tag key={key}
                        title={tag.text || formatLanguagesValues(tag?.language)}
                        isPrimaryColor
                        tagType="Critère indispensable"
                        isWithCheckbox
                        onCheckChange={() => changeValue(`missionRequirements.languages[${key}].essential`, !missionRequirements.languages[key].essential)}
                        checkedArray={tag.essential}
                      />))}
                  </Grid>
                }
              </Box>
            </Grid>}

          {/* Seniority */}
          <Grid container direction='column'>
            <Typography variant={'h4'}>{t('leadCreation.profileSeniority') + '*'}</Typography>
            <CustomSelect
              name="seniority"
              optionsValues={seniorityValues}
              onBlur={handleBlur('phonePrefix')}
              onChange={handleChange}
              value={missionRequirements?.seniority}
              error={!!touched.seniority && !!errors.seniority}
              withDisabledValue
              name='missionRequirements.seniority'
              id='missionRequirements.seniority'
            />
          </Grid>

          {/* Deliverables tags list*/}
          <Grid container direction="column">
            <Typography variant='h1'>{t('leadCreation.deliverablesDetails')}</Typography>
            <Box my={1}>
              <Grid item container direction='row'>
                {deliverablesTags?.map((x, key) => <Tag key={key} title={x.value} isGrey={x.isCustom} />)}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* missionContext detail */}
        <Box my={6}>
          <CustomTextArea
            label={t('leadCreation.textarea.missionContext.label')}
            placeholder={t('leadCreation.textarea.missionContext.placeholder')}
            name='contextAndTasks'
            value={missionDetail.contextAndTasks}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.contextAndTasks && !!errors.contextAndTasks}
            size='large'
            name='missionDetail.contextAndTasks'
            id='missionDetail.contextAndTasks'
          />
        </Box>

        {/* deliverables detail */}
        <Box my={6}>
          <CustomTextArea
            label={t('leadCreation.textarea.deliverablesDetails.label')}
            placeholder={t('leadCreation.textarea.deliverablesDetails.placeholder')}
            name='detailsOfDeliverables'
            value={missionDetail.detailsOfDeliverables}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.detailsOfDeliverables && !!errors.detailsOfDeliverables}
            size='large'
            name='missionDetail.detailsOfDeliverables'
            id='missionDetail.detailsOfDeliverables'
          />
        </Box>

        {/* Upload */}
        <UploadInput />

        {/* Buttons */}
        <Grid container justify='flex-end' className={classes.marginTop}>
          <Grid item>
            <CustomButton
              type="button"
              theme={'primaryButton'}
              handleClick={handleCallMe}
              title={t('leadCreation.callMe')}
            >
            </CustomButton>
          </Grid>
          <Grid item style={{ paddingLeft: '1.2rem' }}>
            <CustomButton
              // type="button"
              // theme={disableSendBrief ? 'disabledFilled' : 'filledButton'}
              // handleClick={handleSendData}
              title={t('leadCreation.sendBriefButton')}
              // loading={leadSaveLoading || updateLeadDraftLoading}
              // disabled={disableSendBrief}
              type="submit"
              //theme={disableGoToFinalizationBtn ? 'disabledFilled' : 'filledButton'}
              theme='filledButton'
              handeclick={handleSubmit}
            >
            </CustomButton>
          </Grid>
        </Grid>
      </Box >
    )
  }
  return (getStepContent())



};

export default LeadCreationForm;
