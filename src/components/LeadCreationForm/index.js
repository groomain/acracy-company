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

const LeadCreationForm = ({ sendValues, values, errors, touched, handleBlur, handleChange, leadId, onUpdateMissionTitle, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { frequency, workspace, duration, durationType, missionTitle, budget, budgetType, profile, profilesNumber,
    seniority, customDeliverable, companyAddress, contextAndTasks, detailsOfDeliverables } = values;

  const { leadDraftSearchData, deliverablesArray, expertises,
    selectedExpertiseList, expansionPanelOpen, expertisePriorities, leadCreationStep,
    sensitivities, selectedSensitivity, sensitivityPriority, dateFromCalendar,
    selectedLanguage, languagePriority, leadSaveLoading, updateLeadDraftLoading, leadCreationPageWithSearchResult,
    leadDraftData } = useSelector(state => ({
      dateFromCalendar: state.getIn(['leadCreation', 'dateFromCalendar']),
      leadDraftSearchData: state.getIn(['leadCreation', 'leadDraftSearchData']),
      deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray']),
      leadCreationStep: state.getIn(['dashboard', 'leadCreationStep']),
      expertises: state.getIn(['leadCreation', 'expertises']),
      selectedExpertiseList: state.getIn(['leadCreation', 'selectedExpertiseList']),
      expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
      expertisePriorities: state.getIn(['leadCreation', 'expertisePriorities']),
      sensitivities: state.getIn(['leadCreation', 'sensitivities']),
      selectedSensitivity: state.getIn(['leadCreation', 'selectedSensitivity']),
      sensitivityPriority: state.getIn(['leadCreation', 'sensitivityPriority']),
      selectedLanguage: state.getIn(['leadCreation', 'selectedLanguage']),
      languagePriority: state.getIn(['leadCreation', 'languagePriority']),
      leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
      updateLeadDraftLoading: state.getIn(['leadCreation', 'updateLeadDraftLoading']),
      leadCreationPageWithSearchResult: state.getIn(['dashboard', 'leadCreationPageWithSearchResult']),
      leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
    }));

  const [activeStep, setActiveStep] = useState();
  const [searchedCategory, setSearchedCategory] = useState({});
  const [deliverables, setDeliverables] = useState([]);
  const [dailyCost, setDailyCost] = useState();
  const [withCommission, setWithCommission] = useState();
  const [openCallMeModal, setOpenCallMeModal] = useState(false);
  const [disableCallMeBtn, setDisableCallMeBtn] = useState(true);
  const [disableGoToFinalizationBtn, setDisableGoToFinalizationBtn] = useState(true);

  useEffect(() => { // Disable the "need help" button
    if (leadDraftSearchData?.search !== null) {
      setDisableCallMeBtn(false)
    } else if (leadDraftSearchData?.search === null) {
      setDisableCallMeBtn(true)
    }
  }, [leadDraftSearchData]);

  useEffect(() => {
    onUpdateMissionTitle(missionTitle)
  }, [missionTitle])

  useEffect(() => {
    setActiveStep(leadCreationStep);
  }, [leadCreationStep]);

  useEffect(() => { // Empty the tagsLists selection from redux to prevent passing data from one lead to another
    dispatch(setSelectedExpertise([]));
    dispatch(setSelectedSensitivity([]));
    dispatch(setSelectedLanguage([]));
    dispatch(setExpertisePriorities([]));
    dispatch(setSensitivityPriority([]));
    dispatch(setLanguagePriority([]));
  }, []);

  const getSteps = () => {
    return [t('leadCreation.synthesis'), t('leadCreation.details')];
  };
  const getStepContent = step => {
    switch (step) {
      case 0:
        return setLeadSynthesis();
      case 1:
        return setLeadDetails();
      default:
        return setLeadSynthesis(); // step 0 is diplayed by default
    }
  }
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   backToTop();
  // };

  useEffect(() => {
    setActiveStep(leadCreationStep)
  }, [leadCreationStep]);

  const handleStep = (step) => () => {
    setActiveStep(step);
    dispatch(handleCurrentStep(1));
    dispatch(setLeadCreationStep(0));
    backToTop();
  };

  const handleCallMe = () => {
    setOpenCallMeModal(true)
  }

  const handleDispatchHelp = () => {
    let redirect = false;
    leadSave(leadDraftSearchData, deliverablesArray, values, redirect)
    dispatch(changeLeadStatusLaunched({ leadId, status: 'NEED_HELP' }));
    setOpenCallMeModal(false)
  }

  useEffect(() => {
    dispatch(setDailyRate(dailyCost));
  }, [dailyCost, dispatch]);

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

  useEffect(() => {
    const setEstimatedRate = (values) => {
      let preciseRate;
      if (values) {
        if (values.budget && values.budgetType && values.duration && values.durationType && values.frequency && values.profilesNumber) {
          let daysNb = getFrequency(values.frequency);
          if (values.budgetType === 'Taux journalier') {  // DAILY_RATE
            // montant global = budget x durée x nbprofils x 1.15
            if (values.durationType === 'Mois') {
              preciseRate = parseInt(values.budget, 10) * daysNb * parseInt(values.duration, 10) * 4 * parseInt(values.profilesNumber, 10) * 1.15;
            } else if (values.durationType === 'Semaines') {
              preciseRate = parseInt(values.budget, 10) * daysNb * parseInt(values.duration, 10) * parseInt(values.profilesNumber, 10) * 1.15;
            } else if (values.durationType === 'Jours') {
              preciseRate = parseInt(values.budget, 10) * parseInt(values.duration, 10) * parseInt(values.profilesNumber, 10) * 1.15;
            }
            let budget = values.budget;
            setDailyCost(budget);
            setWithCommission(Math.ceil(preciseRate));
          } else if (values.budgetType === 'Budget total') { // TOTAL
            // TMJ = (budgetx0.85) / nb jours / nb profils
            if (values.durationType === 'Mois') {
              preciseRate = (parseInt(values.budget, 10) * 0.85) / (daysNb * parseInt(values.duration, 10) * 4) / parseInt(values.profilesNumber, 10);
            } else if (values.durationType === 'Semaines') {
              preciseRate = (parseInt(values.budget, 10) * 0.85) / (daysNb * parseInt(values.duration, 10)) / parseInt(values.profilesNumber, 10);
            } else if (values.durationType === 'Jours') {
              preciseRate = (parseInt(values.budget, 10) * 0.85) / parseInt(values.duration, 10) / parseInt(values.profilesNumber, 10);
            }
            setDailyCost(preciseRate);
            setWithCommission(Math.ceil(preciseRate));
          }
        }
      }
    }
    setEstimatedRate(values);
  }, [values]);

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
          ['1', '2', '3', '4']
        )
      default:
    }
  }

  const handleDeliverablesChange = e => {
    setDeliverables(e);
  }

  useEffect(() => {
    dispatch(setDeliverablesArray(deliverables));
    if (leadCreationPageWithSearchResult) {
      dispatch(setLeadDraftSearchData({ search: leadCreationPageWithSearchResult }))
    }
  }, [deliverables, dispatch, leadCreationPageWithSearchResult]);

  const handleUpdateResearch = (e) => {
    setSearchedCategory(e);  // type, text and objectID
    dispatch(setLeadDraftSearchData({ search: e }))
  }

  const showDeliverablesSettings = () => {
    const selectableDeliverables = searchedCategory.DELIVERABLES || leadCreationPageWithSearchResult.DELIVERABLES;
    let deliverablesList = [];
    deliverablesList = selectableDeliverables.map((item) => {
      return item.TEXT;
    });
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

  const showProfilesSettings = () => {
    let selectableProfiles = searchedCategory.PROFILES || leadCreationPageWithSearchResult?.PROFILES;
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

  const renderSearchedTypeSettings = (searchedCategory) => {
    if (searchedCategory.TYPE === 'PROFILE' || leadCreationPageWithSearchResult?.DELIVERABLES) {
      return showDeliverablesSettings()
    } else if (searchedCategory.TYPE === 'DELIVERABLE' || leadCreationPageWithSearchResult?.PROFILES) {
      return showProfilesSettings()
    }
  }

  const [customChecks, setCustomChecks] = useState(false);

  useEffect(() => { // Check empty fields before step 2
    if (searchedCategory?.TYPE === "PROFILE") {
      if (deliverables.includes("Ne figure pas dans la liste")) {
        if (workspace === "Peu importe" || workspace === "En remote uniquement") {
          setCustomChecks(checkLength(customDeliverable, 0) && deliverables.length > 0)
        } else {
          setCustomChecks(checkLength(customDeliverable, 0) && checkLength(companyAddress, 0) && deliverables.length > 0)
        }
      } else {
        if (workspace === "Peu importe" || workspace === "En remote uniquement") {
          setCustomChecks(deliverables.length > 0)
        } else {
          setCustomChecks(checkLength(companyAddress, 0))
        }
      }
    } else {
      if (workspace === "Sur place uniquement" || workspace === "En remote et sur place") {
        setCustomChecks(checkLength(companyAddress, 0))
      } else {
        setCustomChecks(true)
      }
    }

    if (
      leadDraftSearchData?.search
      && customChecks
      && checkLength(missionTitle, 0)
      && workspace
      && frequency
      && duration
      && durationType
      && budget
      && budgetType
      && profilesNumber
    ) {
      setDisableGoToFinalizationBtn(false)
    } else {
      setDisableGoToFinalizationBtn(true)
    }
  }, [leadDraftSearchData, deliverables, searchedCategory, customChecks, customDeliverable, profile, missionTitle, dateFromCalendar, workspace, frequency,
    duration, durationType, budget, budgetType, profilesNumber, companyAddress]);

  const handleSendData = () => {
    let redirect = false, redirectToMission = false;
    if (activeStep === 0) {
      leadSave(leadDraftSearchData, deliverablesArray, values, redirect, redirectToMission)
    } else {
      let redirectToMission = true;
      dispatch(handleCurrentStep(2));
      leadSave(leadDraftSearchData, deliverablesArray, values, redirect, redirectToMission)
    }
  }

  const minDate = new Date().setDate(new Date().getDate() + 30);

  const setLeadSynthesis = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h1"} >{t('leadCreation.synthesis')}</Typography>
        <Grid container>

          <Grid item xs={12} className={classes.fieldRows}>
            <SearchBar
              name='researchValue'
              context='leadCreation'
              onUpdateChosenCategory={handleUpdateResearch}
            />
          </Grid>

          {searchedCategory ? renderSearchedTypeSettings(searchedCategory) : null}

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomTextArea
              label={t('leadCreation.missionLabel')}
              placeholder={t('leadCreation.missionPlaceholder')}
              name='missionTitle'
              maxLength={140}
              valueOut={missionTitle}
              onChange={handleChange}
            ></CustomTextArea>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <Calendar
              label={t('leadCreation.calendarLabel')}
              name='missionStartDate'
              onChange={handleChange}
              minDate={minDate}
            />
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.workspaceLabel')}
              optionsValues={setOptionsValues('workspace')}
              onChange={handleChange}
              value={workspace}
              name='workspace'
            ></CustomSelect>
          </Grid>
          {(workspace === 'Sur place uniquement' || workspace === 'En remote et sur place') ?
            <Grid item xs={12} className={classes.fieldRows}>
              <CustomTextField
                label={t('leadCreation.locationLabel')}
                placeholder={t('leadCreation.locationPlaceholder')}
                name='companyAddress'
                onChange={handleChange}
              ></CustomTextField>
            </Grid> : null
          }

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.frequencyLabel')}
              optionsValues={setOptionsValues('frequency')}
              onChange={handleChange}
              value={frequency}
              name='frequency'
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
                  value={duration}
                  name='duration'
                ></CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <CustomSelect
                  optionsValues={setOptionsValues('duration')}
                  onChange={handleChange}
                  value={durationType}
                  name='durationType'
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
                  value={budget}
                  name='budget'
                  placeholder={t('leadCreation.budgetPlaceholder')}
                  error={!!touched.budget && !!errors.budget}
                  onBlur={handleBlur}
                ></CustomTextField>
              </Grid>
              <Grid item xs={5}>
                <CustomSelect
                  optionsValues={setOptionsValues('budgetType')}
                  onChange={handleChange}
                  value={budgetType}
                  name='budgetType'
                ></CustomSelect>
              </Grid>
              {(values?.budget && values?.budgetType && values?.duration && values?.durationType && values?.frequency && values?.profilesNumber) || leadDraftData?.missionContext?.estimatedAverageDailyRate
                ? <Typography variant='h2' style={{ marginTop: '-2rem', marginBottom: '1rem', paddingLeft: '0.45rem' }}>
                  {(values.budgetType === 'Taux journalier' || leadDraftData?.missionContext?.budget?.type === 'TOTAL'
                    ? `Soit un montant global de ${withCommission || Math.ceil(leadDraftData?.missionContext?.estimatedAverageDailyRate)}€, commission acracy incluse.`
                    : `Soit un taux journalier de ${withCommission || Math.ceil(leadDraftData?.missionContext?.estimatedAverageDailyRate)}€, une fois la commission acracy déduite.`)}
                </Typography>
                : null}
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.profilesLabel')}
              optionsValues={setOptionsValues('profilesNumber')}
              onChange={handleChange}
              value={profilesNumber}
              name='profilesNumber'
            ></CustomSelect>
          </Grid>

          <Grid container justify='flex-end' className={classes.marginTop}>
            <Grid item>
              <CustomButton
                type="button"
                theme={disableCallMeBtn ? 'disabledOutlined' : 'primaryButton'}
                disabled={disableCallMeBtn}
                handleClick={handleCallMe}
                title={t('leadCreation.callMe')}
              >
              </CustomButton>
            </Grid>
            <Grid item style={{ paddingLeft: '1.2rem' }}>
              <CustomButton
                type="button"
                theme={disableGoToFinalizationBtn ? 'disabledFilled' : 'filledButton'}
                handleClick={handleSendData}
                title={t('leadCreation.finishBrief')}
                loading={leadSaveLoading || updateLeadDraftLoading}
                disabled={disableGoToFinalizationBtn}
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

  // STEP 2

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(handleCurrentStep(2))
      dispatch(getExpertisesLaunched());
      dispatch(getSensitivitiesLaunched());
    } else if (activeStep === 0) {
      dispatch(handleCurrentStep(1))
    }
  }, [dispatch, activeStep])

  const [expertisePriorityList, setExpertisePriorityList] = useState([]);
  const [sensitivityPriorityList, setSensitivityPriorityList] = useState([]);
  const [languagePriorityList, setLanguagePriorityList] = useState([]);
  const [disableSendBrief, setDisableSendBrief] = useState(true);

  useEffect(() => {
    if (leadDraftData?.missionRequirements?.expertises && selectedExpertiseList?.length < 1) { // If data from DB, while selection is not overriden
      setExpertisePriorityList(leadDraftData?.missionRequirements?.expertises); // First, get selected expertises from DB
      dispatch(setExpertisePriorities(leadDraftData?.missionRequirements?.expertises?.filter(x => x.priority).map(x => x.expertise.text))); // Then, check which are selected as a priority to display the check mark
    } else {
      setExpertisePriorityList(selectedExpertiseList);
    }

    if (leadDraftData?.missionRequirements?.sensitivity && (!selectedSensitivity || selectedSensitivity?.length < 1)) {
      setSensitivityPriorityList([leadDraftData?.missionRequirements?.sensitivity]);
      dispatch(setSensitivityPriority([leadDraftData?.missionRequirements?.sensitivity]?.filter(x => x.essential).map(x => x.sensitivity.text)));
    } else {
      setSensitivityPriorityList(selectedSensitivity);
    }

    if (leadDraftData?.missionRequirements?.languages && (selectedLanguage?.length < 1)) {
      setLanguagePriorityList(leadDraftData?.missionRequirements?.languages);
      dispatch(setLanguagePriority(leadDraftData?.missionRequirements?.languages?.filter(x => x.essential).map(x => formatLanguagesValues(x.language))));
    } else {
      setLanguagePriorityList(selectedLanguage)
    }

  }, [leadDraftData, selectedExpertiseList, selectedSensitivity, selectedLanguage]);

  const handlePriorityCheck = (index) => {
    const prio = expertisePriorityList?.map((item, i) => (index === i) ? { ...item, priority: !item.priority } : item);
    setExpertisePriorityList(prio);
    dispatch(setExpertisePriorities(prio.filter(x => x.priority).map(x => x.text || x.expertise.text)));
  }

  const handleSensitivityCheck = (index) => {
    const prio = sensitivityPriorityList?.map((item, i) => (index === i) ? { ...item, essential: !item.essential } : item);
    setSensitivityPriorityList(prio);
    dispatch(setSensitivityPriority(prio.filter(x => x.essential).map(x => x.text || x.sensitivity.text)));
  }

  const handleLanguageCheck = (index) => {
    const prio = languagePriorityList?.map((item, i) => (index === i) ? { ...item, essential: !item.essential } : item);
    setLanguagePriorityList(prio);
    dispatch(setLanguagePriority(prio.filter(x => x.essential).map(x => formatLanguagesValues(x.language) || x.text)));
  }

  // Set the Deliverables details section
  const deliverablesTags = deliverables?.map(x => ({ value: x, isCustom: false }));
  const customDeliverableIndex = deliverables.indexOf('Ne figure pas dans la liste');

  if (~customDeliverableIndex && customDeliverable) {
    deliverablesTags[customDeliverableIndex] = { value: customDeliverable, isCustom: true }
  }

  useEffect(() => {
    if (
      selectedExpertiseList?.length > 0
      && seniority !== "Sélectionnez le niveau d'epérience minimum"
      && checkLength(contextAndTasks, 0)
      && checkLength(detailsOfDeliverables, 0)
    ) {
      setDisableSendBrief(false);
    } else {
      setDisableSendBrief(true);
    }
  }, [selectedExpertiseList, seniority, contextAndTasks, detailsOfDeliverables]);

  const setLeadDetails = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant='h2'>{t('leadCreation.profileDetails')}</Typography>
        <Typography variant='h1'>{leadDraftSearchData?.search?.TEXT}</Typography>

        <Grid container>
          {/* Expertises */}
          {expertises?.length > 0 && <Grid item xs={12} className={classes.fieldRows}>
            <Grid container justify="space-between">
              <Typography variant="h4">{t('tagsList.expertise.label') + '*'}</Typography>
              <Typography variant="h2">{t('tagsList.expertise.minMaxInfo')}</Typography>
            </Grid>
            <TagsList
              tags={expertises}
              panelTitle={t('leadCreation.profileExpertises')}
              type='expertise'
              maxSelection={5}
              selectedExpertiseArray={expertisePriorityList?.map(x => x.expertise?.text || x.text)}
            />
            {expansionPanelOpen !== 'expertise' &&
              <Grid item container direction='row'>
                {expertisePriorityList?.length > 0 && expertisePriorityList?.map((tag, key) => (
                  <Tag key={key}
                    title={tag.text || tag?.expertise?.text}
                    isPrimaryColor
                    tagType="Prioritaire"
                    isWithCheckbox
                    onCheckChange={() => handlePriorityCheck(key)}
                    checkedArray={expertisePriorities}
                  />
                ))}
              </Grid>}
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
                  panelTitle={t('leadCreation.profileSensitivity')}
                  type='sensitivity'
                  maxSelection={1}
                  selectedSensitivityArray={sensitivityPriorityList?.map(x => x.sensitivity?.text || x.text)}
                />
                {expansionPanelOpen !== 'sensitivity' &&
                  <Grid item container direction='row'>
                    {sensitivityPriorityList?.length > 0 && sensitivityPriorityList?.map((tag, key) => (
                      <Tag key={key}
                        title={tag.text || tag?.sensitivity?.text}
                        isPrimaryColor
                        tagType="Critère indispensable"
                        isWithCheckbox
                        onCheckChange={() => handleSensitivityCheck(key)}
                        checkedArray={sensitivityPriority}
                      />))}
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
                  maxSelection={1}
                  selectedLanguagesArray={languagePriorityList?.map(x => formatLanguagesValues(x.language) || x.text)}
                />
                {expansionPanelOpen !== 'languages' &&
                  <Grid item container direction='row'>
                    {languagePriorityList?.length > 0 && languagePriorityList?.map((tag, key) => (
                      <Tag key={key}
                        title={tag.text || formatLanguagesValues(tag?.language)}
                        isPrimaryColor
                        tagType="Critère indispensable"
                        isWithCheckbox
                        onCheckChange={() => handleLanguageCheck(key)}
                        checkedArray={languagePriority}
                      />))}
                  </Grid>}
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
              value={seniority}
              error={!!touched.seniority && !!errors.seniority}
              withDisabledValue
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
            value={contextAndTasks}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.contextAndTasks && !!errors.contextAndTasks}
            size='large'
          />
        </Box>

        {/* deliverables detail */}
        <Box my={6}>
          <CustomTextArea
            label={t('leadCreation.textarea.deliverablesDetails.label')}
            placeholder={t('leadCreation.textarea.deliverablesDetails.placeholder')}
            name='detailsOfDeliverables'
            value={detailsOfDeliverables}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.detailsOfDeliverables && !!errors.detailsOfDeliverables}
            size='large'
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
              type="button"
              theme={disableSendBrief ? 'disabledFilled' : 'filledButton'}
              handleClick={handleSendData}
              title={t('leadCreation.sendBriefButton')}
              loading={leadSaveLoading || updateLeadDraftLoading}
              disabled={disableSendBrief}
            >
            </CustomButton>
          </Grid>
        </Grid>
      </Box >
    )
  }

  const CustomIcon = (props) => {
    const { active, completed } = props;
    return (
      <div
        className={clsx(
          classes.icon, {
          [classes.completed]: completed,
          [classes.active]: active
        })}
      >
        {props.icon}
      </div>
    )
  };

  const steps = getSteps();

  return (
    <Grid item className={classes.formGridItem}>
      <Stepper nonLinear={false} activeStep={activeStep} className={classes.stepper} connector={<StepConnector style={{ display: 'none' }} />}>
        {steps.map((label, index) => {
          return (
            <Step key={label} className={classes.step}>
              <StepButton
                onClick={handleStep(index)}
                className={classes.stepButton}>
                <StepLabel
                  style={{ textAlign: "left" }}
                  StepIconComponent={CustomIcon}
                  className={activeStep === index ? null : classes.inactiveLabel}
                >
                  <Typography variant={"h4"}>
                    {label}
                  </Typography>
                </StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      {getStepContent(activeStep)}
      {openCallMeModal && <CustomModal
        title="Au clic sur “Confirmer”, le remplissage de brief se mettra en pause, et vous serez rappelé par l’un des account managers d’acracy qui le finalisera au téléphone avec vous"
        open={openCallMeModal}
        handleClose={() => setOpenCallMeModal(false)}
      >
        <Grid container className={classes.marginTop}>
          <Grid item>
            <CustomButton
              type="button"
              theme='primaryButton'
              handleClick={handleDispatchHelp}
              title={'Confirmer'}
            >
            </CustomButton>
          </Grid>
        </Grid>
      </CustomModal>}
    </Grid >
  )
};

export default LeadCreationForm;
