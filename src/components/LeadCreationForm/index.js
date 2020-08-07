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
import { valueFocusAriaMessage } from 'react-select/src/accessibility';

const LeadCreationForm = ({ sendValues, values, errors, touched, handleBlur, handleChange, leadId, onUpdateMissionTitle, handleSubmit, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { frequency, workspace, duration, durationType, budget, budgetType, profile, profilesNumber,
    missionContext
  } = values;
  useEffect(() => console.log(missionContext.startDate, " startDate"), [missionContext.startDate])

  const [searchedCategory, setSearchedCategory] = useState();
  const [deliverables, setDeliverables] = useState([]);
  const [dailyCost, setDailyCost] = useState();
  const [withCommission, setWithCommission] = useState();
  const [openCallMeModal, setOpenCallMeModal] = useState(false);
  const [disableCallMeBtn, setDisableCallMeBtn] = useState(true);
  const [disableGoToFinalizationBtn, setDisableGoToFinalizationBtn] = useState(true);

  useEffect(() => {
    console.log("cahngement")
    if (values?.missionContext.budget.value &&
      values?.missionContext.budget.type &&
      values?.missionContext.duration.nb &&
      values?.missionContext.duration.unit &&
      values?.missionContext.weeklyRythm &&
      values?.missionContext.profilNumber) {
      let preciseRate

      let daysNb = getFrequency(values?.missionContext.weeklyRythm)
      console.log("daysnb", daysNb)
      console.log("values?.missionContext.budget.type", values?.missionContext.budget.type)
      console.log("values?.missionContext.duration.unit ", values?.missionContext.duration.unit)
      if (values?.missionContext.budget.type === 'Taux journalier') {  // DAILY_RATE
        // montant global = budget x durée x nbprofils x 1.15
        console.log("jour1")
        console.log(values?.missionContext.budget.value)
        console.log(values?.missionContext.duration.unit)
        console.log(values?.missionContext.profilNumber)
        if (values?.missionContext.duration.unit === 'Mois') {
          console.log("mois")
          preciseRate = parseInt(values?.missionContext.budget.value, 10) * daysNb * parseInt(values?.missionContext.duration.nb, 10) * 4 * parseInt(values?.missionContext.profilNumber, 10) * 1.15;
        } else if (values?.missionContext.duration.unit === 'Semaines') {
          console.log("semaine")

          preciseRate = parseInt(values?.missionContext.budget.value, 10) * daysNb * parseInt(values?.missionContext.duration.nb, 10) * parseInt(values?.missionContext.profilNumber, 10) * 1.15;
        } else if (values?.missionContext.duration.unit === 'Jours') {
          console.log("jour")

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

      console.log("preciserate", preciseRate)

      const changeValue = {
        target: { name: 'missionContext.estimatedAverageDailyRate', value: preciseRate }
      }
      handleChange(changeValue);
    }
  }, [values.missionContext.budget, values.missionContext.duration, values.missionContext.profilNumber])

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
                values={values.missionTitle}
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

  useEffect(() => console.log(values), [values])
  useEffect(() => { console.log(minDate, "mindate"); console.log(missionContext.startDate, "startDate") }, [minDate])


  const changeDate = (e) => {
    const timestamp = e._d.getTime();
    const changeValue = {
      target: { name: 'missionContext.startDate', value: parseInt(timestamp) }
    }
    handleChange(changeValue);
    // setFieldTouched(name, true, false);
  };

  // useEffect(() => {
  //   console.log(values, " values")
  //   console.log("startDate " + missionContext.startDate)
  //   console.log("minDate " + minDate)
  // }, [missionContext.startDate, values])

  // render complet de la page 0
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
              minDate={missionContext.startDate}
              // handleChange={(e) => change('missionContext.startDate', e)}
              handleChange={(e) => { changeDate(e) }}
              value={missionContext.startDate}
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
  const setLeadDetails = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant='h2'>{t('leadCreation.profileDetails')}</Typography>
        <Typography variant='h1'>{values?.search?.TEXT}</Typography>

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
          {values.missionRequirements.sensitivity.sensitivity.text &&
            <Grid item xs={12} className={classes.fieldRows}>
              <Box my={2.5}>
                <Grid container justify="space-between">
                  <Typography variant="h4">{t('tagsList.sensitivity.label')}</Typography>
                  <Typography variant="h2">{t('tagsList.sensitivity.minMaxInfo')}</Typography>
                </Grid>
                <TagsList
                  tags={values.missionRequirements.sensitivity.sensitivity.text}
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
  return (getStepContent())



};

export default LeadCreationForm;
