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
  changeLeadStatusLaunched, getExpertisesLaunched, getSensitivitiesLaunched
} from '../../pages/LeadCreationPage/reducer';
import { setLeadCreationStep } from '../../pages/HomePage/reducer';
import { handleCurrentStep } from "../App/reducer";

import { leadSave } from '../../pages/LeadCreationPage/index';
import clsx from 'clsx';
import styles from './styles';
import moment from 'moment';

import { languages } from './options';
import UploadInput from '../Inputs/LeadUpload';

import { checkLength } from '../../utils/services/validationChecks';
import { formatLanguagesValues, handleNumberInput } from '../../utils/services/format';

const LeadCreationForm = ({ values, errors, touched, handleBlur, handleChange, leadId, onUpdateMissionTitle, handleSubmit, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { missionContext, missionRequirements, missionDetail, expertises, customDeliverable, search, desireds
  } = values;

  const { listOfExpertises, expansionPanelOpen, sensitivities, leadCreationStep, updateLeadDraftLoading, leadSaveLoading, leadDraftId, changeLeadStatusLoading, updateLeadDraftSuccess } = useSelector(state => ({
    listOfExpertises: state.getIn(['leadCreation', 'expertises']),
    expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
    sensitivities: state.getIn(['leadCreation', 'sensitivities']),
    updateLeadDraftLoading: state.getIn(['leadCreation', 'updateLeadDraftLoading']),
    uploadedFileName: state.getIn(['leadCreation', 'uploadedFileName']),
    leadCreationStep: state.getIn(['dashboard', 'leadCreationStep']),
    leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
    leadDraftId: state.getIn(['leadCreation', 'leadDraftId']),
    changeLeadStatusLoading: state.getIn(['leadCreation', 'changeLeadStatusLoading']),
    updateLeadDraftSuccess: state.getIn(['leadCreation', 'updateLeadDraftSuccess'])
  }));

  const FORMATTED_DAY = 'DAY' || 'Jours';

  useEffect(() => {
    if (hasToWaitBeforeCallHelp) {
      dispatch(changeLeadStatusLaunched({ leadId: leadDraftId, status: 'NEED_HELP' }));
    }
  }, [leadDraftId]);

  useEffect(() => {
    if ((leadDraftId || updateLeadDraftSuccess) && hasToWaitBeforeGotoStep2) {
      setHasToWaitBeforeGotoStep2(false);
      setActiveStep(1);
    }
  }, [leadDraftId, updateLeadDraftSuccess]);

  const [searchedCategory, setSearchedCategory] = useState();
  const [deliverables, setDeliverables] = useState([]);
  const [dailyCost, setDailyCost] = useState();
  const [withCommission, setWithCommission] = useState();
  const [openCallMeModal, setOpenCallMeModal] = useState(false);
  const [disableCallMeBtn, setDisableCallMeBtn] = useState(true);
  const [disableGoToFinalizationBtn, setDisableGoToFinalizationBtn] = useState(true);
  const [disableSendBrief, setDisableSendBrief] = useState(true);
  const [activeStep, setActiveStep] = useState(leadCreationStep);
  const [hasToWaitBeforeCallHelp, setHasToWaitBeforeCallHelp] = useState(false);
  const [hasToWaitBeforeGotoStep2, setHasToWaitBeforeGotoStep2] = useState(false);

  useEffect(() => {
    if (values?.missionContext?.budget?.value &&
      values?.missionContext?.budget?.type &&
      values?.missionContext?.duration?.nb
    ) {
      let preciseRate;
      let daysNb = values?.missionContext?.weeklyRythm || 5;
      let profilsNumber = values?.missionContext?.profilNumber || 1;
      let durationUnit = values?.missionContext?.duration?.unit || 'DAY';

      if (values?.missionContext?.budget?.type === 'DAILY_RATE') {  // DAILY_RATE
        // montant global = budget x durée x nbprofils x 1.15
        if (durationUnit === 'MONTH') {
          preciseRate = parseInt(values?.missionContext?.budget?.value, 10) * daysNb * parseInt(values?.missionContext?.duration?.nb, 10) * 4 * parseInt(profilsNumber, 10) * (1 + parseFloat(process.env.REACT_APP_ACRACY_COMMISSION_RATE)) * (1 + parseFloat(process.env.REACT_APP_FACTOR_COMMISSION_RATE));
        } else if (durationUnit === 'WEEK') {
          preciseRate = parseInt(values?.missionContext?.budget?.value, 10) * daysNb * parseInt(values?.missionContext?.duration?.nb, 10) * parseInt(profilsNumber, 10) * (1 + parseFloat(process.env.REACT_APP_ACRACY_COMMISSION_RATE)) * (1 + parseFloat(process.env.REACT_APP_FACTOR_COMMISSION_RATE));
        } else if (durationUnit === 'DAY') {
          preciseRate = parseInt(values?.missionContext?.budget?.value, 10) * parseInt(values?.missionContext?.duration?.nb, 10) * parseInt(profilsNumber, 10) * (1 + parseFloat(process.env.REACT_APP_ACRACY_COMMISSION_RATE)) * (1 + parseFloat(process.env.REACT_APP_FACTOR_COMMISSION_RATE));
        }
        setWithCommission(Math.ceil(preciseRate));
      } else if (values?.missionContext?.budget?.type === 'TOTAL') { // TOTAL
        // TMJ = (budgetx0.85) / nb jours / nb profils
        if (durationUnit === 'MONTH') {
          preciseRate = (parseInt(values?.missionContext?.budget?.value, 10) / (daysNb * parseInt(values?.missionContext?.duration?.nb, 10) * 4) / (1 + parseFloat(process.env.REACT_APP_ACRACY_COMMISSION_RATE)) / (1 + parseFloat(process.env.REACT_APP_FACTOR_COMMISSION_RATE))) / parseInt(profilsNumber, 10);
        } else if (durationUnit === 'WEEK') {
          preciseRate = (parseInt(values?.missionContext?.budget?.value, 10) / (daysNb * parseInt(values?.missionContext?.duration?.nb, 10)) / (1 + parseFloat(process.env.REACT_APP_ACRACY_COMMISSION_RATE)) / (1 + parseFloat(process.env.REACT_APP_FACTOR_COMMISSION_RATE))) / parseInt(profilsNumber, 10);
        } else if (durationUnit === 'DAY') {
          preciseRate = (parseInt(values?.missionContext?.budget?.value, 10) / parseInt(values?.missionContext?.duration?.nb, 10) / (1 + parseFloat(process.env.REACT_APP_ACRACY_COMMISSION_RATE)) / (1 + parseFloat(process.env.REACT_APP_FACTOR_COMMISSION_RATE))) / parseInt(profilsNumber, 10);
        }
      }
      setWithCommission(Math.round(preciseRate * 100) / 100);
      changeValue('missionContext.estimatedAverageDailyRate', preciseRate);
    }
  }, [values?.missionContext?.budget, values?.missionContext?.duration, values?.missionContext?.profilNumber, values?.missionContext?.weeklyRythm])

  useEffect(() => {
    if (
      (missionRequirements?.expertises?.length > 0)
      && (missionRequirements?.sensitivity?.sensitivity)
      && (missionRequirements?.languages?.length > 0)
      && missionRequirements?.seniority !== "Sélectionnez le niveau d'expérience minimum"
      && checkLength(missionDetail?.contextAndTasks, 0)
      && checkLength(missionDetail?.detailsOfDeliverables, 0)
    ) {
      setDisableSendBrief(false);
    } else {
      setDisableSendBrief(true);
    }
  }, [missionRequirements, missionDetail]);

  useEffect(() => {
    if (
      search?.text
      && checkLength(missionContext?.title, 0)
      && missionContext?.format
      && missionContext?.weeklyRythm
      && missionContext?.duration?.nb
      && missionContext?.duration?.unit
      && missionContext?.budget?.type
      && missionContext?.budget?.value
      && missionContext?.profilNumber
    ) {
      setDisableGoToFinalizationBtn(false)
    } else {
      setDisableGoToFinalizationBtn(true)
    }
  }, [search, missionContext])

  useEffect(() => { // Disable the "être rappelé" button
    if (search?.text?.length > 1 && checkLength(missionContext?.title, 0)) {
      setDisableCallMeBtn(false)
    } else {
      setDisableCallMeBtn(true)
    }
  }, [search, missionContext]);

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
          [{ code: 'WHATEVER', TEXT: 'Peu importe' },
          { code: 'REMOTE_ONLY', TEXT: 'En remote uniquement' },
          { code: 'INPLACE_ONLY', TEXT: 'Sur place uniquement' },
          { code: 'BOTH', TEXT: 'En remote et sur place' }]
        )
      case 'frequency':
        return (
          [{ code: 1, TEXT: 'Temps partiel (1 jour)' },
          { code: 2, TEXT: 'Temps partiel (2 jours)' },
          { code: 3, TEXT: 'Temps partiel (3 jours)' },
          { code: 4, TEXT: 'Temps partiel (4 jours)' },
          { code: 5, TEXT: 'Plein temps (5 jours)' }]
        )
      case 'duration':
        return (
          [{ code: 'DAY', TEXT: 'jours' },
          { code: 'WEEK', TEXT: 'semaines' },
          { code: 'MONTH', TEXT: 'mois' }]
        )
      case 'budgetType':
        return (
          [{ code: 'DAILY_RATE', TEXT: 'taux journalier' },
          { code: 'TOTAL', TEXT: 'budget total' }]
        )
      case 'profilesNumber':
        return (
          [1, 2, 3, 4]
        )
      case 'seniority':
        return (
          [{ code: '', TEXT: "Sélectionnez le niveau d'expertise minimum" },
          { code: 'JUNIOR', TEXT: 'Junior (1 à 3 ans)' },
          { code: 'MIDDLE', TEXT: 'Middle (3 à 5 ans)' },
          { code: 'SENIOR', TEXT: 'Senior (5 à 7 ans)' },
          { code: 'EXPERT', TEXT: 'Expert (7 à 10 ans)' },
          { code: 'GURU', TEXT: 'Guru (10 ans et plus)' },
          { code: 'WHATEVER', TEXT: 'Peu importe' },])

      default:
    }
  }

  const handleUpdateResearch = (e) => {
    if (e?.__isNew__) {
      changeValue('search', { type: 'OTHER', code: '', text: e.label })
      changeValue('desireds', [])
      setDeliverables([]);

    } else if (e?.TEXT) {
      changeValue('search', { type: e?.TYPE || '', code: e?.KEY || '', text: e?.TEXT || '' })
    }
    if (!e) {
      changeValue('desireds', []);
      setDeliverables([]);
    }

    setSearchedCategory(e);
  }

  useEffect(() => setSearchedCategory(search), []);

  const handleNumberField = (e, limit, min) => {
    const numberResult = handleNumberInput(e, limit, min);
    handleChange(numberResult)
  }

  const showDeliverablesSettings = () => {
    const selectableDeliverables = searchedCategory?.DELIVERABLES || searchedCategory?.links
    let deliverablesList = [];
    if (selectableDeliverables?.length > 0) {
      deliverablesList = selectableDeliverables?.map((item) => {
        return item;
      });
    }
    deliverablesList.push({ TEXT: 'Ne figure pas dans la liste', KEY: '' });
    return (
      <>
        <Grid item xs={12} className={classes.fieldRows}>
          <CustomSelect
            onUpdateSelection={(e) => changeValue("desireds.deliverable", e)}
            label={(deliverables?.length !== 0) ? t('leadCreation.modifyDeliverables') : t('leadCreation.selectDeliverables')}
            isMulti
            context='deliverables'
            name='deliverable'
            optionsValues={deliverablesList}
            onBlur={handleBlur}
            checkedArray={searchedCategory?.TEXT === values?.search.text ? desireds?.map(desired => {
              return ({ 'TEXT': desired?.text, 'KEY': desired?.code })
            }) : []}
          />
          <Grid item container direction='row'>
            {desireds?.map((deliverable, i) => {
              if (deliverable.type === 'OTHER') {
                return (
                  <Tag title={'Ne figure pas dans la liste'} key={i} />)
              }
              else {
                return (
                  <Tag title={deliverable.text} key={i} />)
              }
            }
            )}
          </Grid>
          {desireds?.map(deliverable => {
            if (deliverable.type === "OTHER") {
              let titleValue
              if (deliverable.text != 'Ne figure pas dans la liste') {
                titleValue = deliverable.text
              }
              else (titleValue = '')
              return (
                <Grid item xs={12} className={classes.fieldRows}>
                  <CustomTextField
                    label={t('leadCreation.customDeliverableLabel')}
                    placeholder={t('leadCreation.customDeliverablePlaceholder')}
                    name='customDeliverable'
                    id='customDeliverable'
                    value={titleValue}
                    onChange={(e) => changeValue('customDeliverable', e)}
                  >
                  </CustomTextField>
                </Grid>)
            }
          }
          )}
        </Grid>
      </>
    )
  }

  const showProfilesSettings = () => {
    let selectableProfiles = searchedCategory?.PROFILES || searchedCategory?.links
    if (selectableProfiles) {
      let selectableProfilesCopy = [...selectableProfiles];
      let enhancedList = selectableProfilesCopy.concat({ "TEXT": "Recevoir une recommandation acracy", "KEY": "", "type": "OTHER" })
      const profilesList = enhancedList.map((item) => {
        return item;
      });
      return (
        <>
          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.selectProfile')}
              optionsValues={profilesList}
              onChange={(e) => changeValue("desireds.profile", e.target.value)}
              value={desireds?.length > 0 ? (desireds[0].code || desireds[0].type) : null}
              context='profileType'
              name='desireds'
              id='desireds'
            />
          </Grid>
        </>
      )
    }
  }

  // OK a garder
  const renderSearchedTypeSettings = (searchedCategory) => {
    if (searchedCategory?.TYPE === 'PROFILE' || searchedCategory?.type === 'PROFILE') {
      return showDeliverablesSettings()
    } else if (searchedCategory?.TYPE === 'DELIVERABLE' || searchedCategory?.type === 'DELIVERABLES') {
      return showProfilesSettings()
    }
  };

  const minDate = new Date().setDate(new Date().getDate() + 30);

  useEffect(() => {
    if (missionContext?.startDate) {
      return
    } else {
      changeValue('missionContext.startDate', minDate)
    }
  }, [missionContext])

  const changeValue = (champs, e) => {
    let newValue
    if (champs === 'missionContext.startDate') {
      if (typeof e === 'number') {
        newValue = new moment(e).format()
      }
      else {
        newValue = parseInt(e._d.getTime())
        newValue = new moment(newValue).format()
      }
    }
    else if (champs === 'desireds.profile') {
      if (e?.includes("OTHER")) {
        champs = 'desireds'
        newValue = [{ 'text': "Recevoir une recommandation acracy", 'code': "", 'type': 'OTHER' }]
      } else {
        let selectableProfiles = searchedCategory?.PROFILES || searchedCategory?.links
        newValue = selectableProfiles.filter(delList => {
          return e.includes(delList.KEY)
        });
        champs = 'desireds'
        newValue = [{ 'text': newValue[0].TEXT, 'code': newValue[0].KEY, 'type': 'PROFILE' }]
      }
    }
    else if (champs === 'customDeliverable') {
      champs = 'desireds'
      newValue = desireds.map(desired => {
        if (desired.type === 'OTHER') {
          return ({ ...desired, text: e.target.value })
        }
        return desired
      })
    }
    else if (champs === 'desireds.deliverable') {
      champs = 'desireds'
      const tempTab = searchedCategory?.DELIVERABLES.filter(delList => {
        return e.includes(delList.KEY)
      });
      newValue = tempTab.map(deliverable => {
        return ({ 'text': deliverable?.TEXT, 'code': deliverable?.KEY, 'type': 'DELIVERABLE' })
      })
      if (e.includes("")) {
        let customTextValue = desireds?.filter(desired => desired.type === 'OTHER')
        let newTextValue = ((customTextValue !== undefined && customTextValue[0]?.text) || 'Ne figure pas dans la liste')
        newValue.push({ 'text': newTextValue, 'code': '', 'type': 'OTHER' })
      }
    }
    else {
      newValue = e
    }
    const updatedValue = {
      target: { name: champs, value: newValue }
    }
    handleChange(updatedValue);
  };

  const handleSendData = () => {
    if (leadCreationStep === 0) {
      values.missionContext.duration.nb = parseInt(values.missionContext.duration.nb);
      values.missionContext.budget.value = parseInt(values.missionContext.budget.value);
      leadSave(values);
      setHasToWaitBeforeGotoStep2(true);
    } else {
      let redirectToMission = true;
      let redirect = false;
      leadSave(values, redirect, redirectToMission)
      dispatch(handleCurrentStep(2));
    }
  }

  const getWorkedDaysResult = (workDurationNb, workDurationUnit, weeklyRythm, profilNumber) => {
    switch (workDurationUnit) {
      case 'MONTH':
      case 'Mois':
        return Math.ceil((weeklyRythm || 5) * (4 * workDurationNb) * (profilNumber || 1));
      case 'WEEK':
      case 'Semaines':
        return Math.ceil((weeklyRythm || 5) * workDurationNb * (profilNumber || 1));
      default:
        break;
    }
  }



  // render complet de la page 0
  const setLeadSynthesis = () => {
    return (
      <Box>
        <Typography variant={"h1"} className={classes.stepTitle}>{t('leadCreation.synthesis')}</Typography>
        <Grid container>

          <Grid item xs={12}>
            <SearchBar
              name='researchValue'
              context='leadCreation'
              onUpdateChosenCategory={handleUpdateResearch}
              value={search}
            />
          </Grid>

          {searchedCategory && renderSearchedTypeSettings(searchedCategory)}

          {/* Titre de la mission */}
          {searchedCategory &&
            <>
              < Grid item xs={12} className={classes.fieldRows}>
                <CustomTextArea
                  label={t('leadCreation.missionLabel')}
                  placeholder={t('leadCreation.missionPlaceholder')}
                  name='missionContext.title'
                  id='missionContext.title'

                  // values={missionTitle}
                  maxLength={140}
                  valueOut={missionContext?.title || null}
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
                  value={(missionContext?.startDate && (moment(missionContext?.startDate).valueOf() > minDate)) ? moment(missionContext.startDate).valueOf() : minDate}
                  {...props}
                />
              </Grid>

              <Grid item xs={12} className={classes.fieldRows}>
                <CustomSelect
                  label={t('leadCreation.workspaceLabel')}
                  optionsValues={setOptionsValues('workspace')}
                  value={missionContext?.format || 'WHATEVER'}
                  name='missionContext.format'
                  onChange={handleChange}

                ></CustomSelect>
              </Grid>
              {(missionContext?.format === 'INPLACE_ONLY' || missionContext?.format === 'BOTH') ?
                <Grid item xs={12} className={classes.fieldRows}>
                  <CustomTextField
                    label={t('leadCreation.locationLabel')}
                    placeholder={t('leadCreation.locationPlaceholder')}
                    name='missionContext.address'
                    value={missionContext?.address || null}
                    onChange={handleChange}
                  ></CustomTextField>
                </Grid> : null
              }

              <Grid item xs={12} className={classes.fieldRows}>
                <CustomSelect
                  label={t('leadCreation.frequencyLabel') + '*'}
                  optionsValues={setOptionsValues('frequency')}
                  onChange={handleChange}
                  value={missionContext?.weeklyRythm || 5}
                  name='missionContext.weeklyRythm'
                ></CustomSelect>
              </Grid>

              <Grid item container xs={12} className={classes.fieldRows}>
                <Box>
                  <Typography variant={'h4'} >{t('leadCreation.durationLabel') + '*'}</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <CustomTextField
                      placeholder={t('leadCreation.durationPlaceholder')}
                      onChange={e => handleNumberField(e, 0, 1)}
                      value={missionContext?.duration?.nb || null}
                      name='missionContext.duration.nb'
                      error={(parseFloat(missionContext?.duration?.nb) != missionContext?.duration?.nb) && missionContext?.duration?.nb}
                    // helperText={(missionContext?.duration?.nb && missionContext?.duration?.nb < 1) && "1 jour minimum"}
                    ></CustomTextField>
                  </Grid>
                  <Grid item xs={5}>
                    <CustomSelect
                      optionsValues={setOptionsValues('duration')}
                      onChange={handleChange}
                      value={missionContext?.duration?.unit || 'DAY'}
                      name='missionContext.duration.unit'
                    ></CustomSelect>
                  </Grid>
                  <Box mx={1} style={{ marginTop: '-2rem' }}>
                    {values?.missionContext?.duration?.nb && values?.missionContext?.duration?.unit && values?.missionContext?.duration?.unit !== FORMATTED_DAY &&
                      <Typography variant="h2">Soit {' '}
                        {getWorkedDaysResult(values?.missionContext?.duration?.nb,
                          values?.missionContext?.duration?.unit,
                          values?.missionContext?.weeklyRythm,
                          values?.missionContext?.profilNumber)} jours travaillés environ</Typography>}
                  </Box>
                </Grid>
              </Grid>

              <Grid item container xs={12} className={classes.fieldRows}>
                <Typography variant='h4'>{t('leadCreation.budgetLabel') + '*'}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <CustomTextField
                      endAdornment={<InputAdornment position="end"><EuroSymbolIcon /></InputAdornment>}
                      onChange={e => handleNumberField(e, 3)} // Substring = included -> ex: Select 3 for 2 decimals
                      value={missionContext?.budget?.value || null}
                      name='missionContext.budget.value'
                      placeholder={t('leadCreation.budgetPlaceholder')}
                      error={(parseFloat(missionContext?.budget?.value) != missionContext?.budget?.value) && missionContext?.budget?.value}
                      onBlur={handleBlur}
                    ></CustomTextField>
                  </Grid>
                  <Grid item xs={5}>
                    <CustomSelect
                      optionsValues={setOptionsValues('budgetType')}
                      onChange={handleChange}
                      value={missionContext?.budget?.type || null}
                      name='missionContext.budget.type'
                    ></CustomSelect>
                  </Grid>
                  {values?.missionContext?.budget?.value && values?.missionContext?.budget?.type && values?.missionContext?.duration?.nb && values?.missionContext?.duration?.unit || values?.missionContext?.estimatedAverageDailyRate
                    ? <Typography variant="h2" style={{ paddingLeft: '0.45rem' }}>
                      {(values?.missionContext.budget.type === 'Taux journalier' || values?.missionContext?.budget?.type === 'TOTAL'
                        ? t('leadCreation.estimatedAverageDailyRate1') + (withCommission || Math.ceil(values?.missionContext?.estimatedAverageDailyRate)) + t('leadCreation.estimatedAverageDailyRate2')
                        : t('leadCreation.estimatedAverageDailyRate3') + (withCommission || Math.ceil(values?.missionContext?.estimatedAverageDailyRate)) + t('leadCreation.estimatedAverageDailyRate4'))}
                    </Typography>
                    : null}
                </Grid>
              </Grid>

              <Grid item xs={12} className={classes.fieldRows}>
                <CustomSelect
                  label={t('leadCreation.profilesLabel')}
                  optionsValues={setOptionsValues('profilesNumber')}
                  onChange={handleChange}
                  value={missionContext?.profilNumber || 1}
                  name='missionContext.profilNumber'
                  id='missionContext.profilNumber'
                ></CustomSelect>
              </Grid>
            </>
          }
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
                // type="submit"
                theme={disableGoToFinalizationBtn ? 'disabledFilled' : 'filledButton'}
                onClick={() => handleSendData()}
                title={t('leadCreation.finishBrief')}
                loading={leadSaveLoading || updateLeadDraftLoading}
                disabled={disableGoToFinalizationBtn}
              >
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Box >
    )
  }

  ///////////////////step2////////////////

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(handleCurrentStep(2))
      dispatch(getExpertisesLaunched());
      dispatch(getSensitivitiesLaunched());
      backToTop();
    } else if (activeStep === 0) {
      dispatch(handleCurrentStep(1))
      backToTop();
    }
  }, [dispatch, activeStep])

  const handlePriorityCheck = (index) => {
    let updateValues = missionRequirements.expertises
    updateValues[index].priority = !missionRequirements.expertises[index].priority
    changeValue(`missionRequirements.expertises`, updateValues)
  }

  const handleSensitivityCheck = () => {
    let updateValues = missionRequirements?.sensitivity
    updateValues.essential = !missionRequirements?.sensitivity?.essential
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
          {listOfExpertises.length > 0 &&
            <Grid item xs={12} className={classes.fieldRows}>
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
                selectedExpertiseArray={missionRequirements?.expertises}
                value={missionRequirements?.expertises}
              />
              {expansionPanelOpen !== 'expertise' &&
                < Grid item container direction='row'>
                  {missionRequirements?.expertises?.length > 0 && missionRequirements?.expertises?.map((tag, key) => (
                    <Tag key={key}
                      title={tag.text || tag?.expertise?.text}
                      isPrimaryColor
                      tagType="Prioritaire"
                      multipleChoice
                      expertises
                      onCheckChange={() => handlePriorityCheck(key)}
                      checkedArray={missionRequirements?.expertises.map(priority => { if (priority.priority === true) { return (priority.expertise.text) } }).filter(expertise => expertise)}
                    />
                  ))}
                </Grid>
              }
            </Grid>
          }

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
                <CustomSelect
                  optionsValues={languages}
                  // onBlur={handleBlur
                  onChange={(e) => { changeValue('missionRequirements.languages', [{ language: e.target.value }]) }}
                  value={missionRequirements?.languages?.length > 0 ? { type: missionRequirements?.languages[0]?.language || null, text: missionRequirements?.languages[0]?.text || null } : { type: null, text: null }}
                  error={!!touched.languages && !!errors.languages}
                  name='missionRequirements.languages'
                  id='missionRequirements.languages'
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
              optionsValues={setOptionsValues('seniority')}
              onBlur={handleBlur}
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
                {search?.type === 'PROFILE' && desireds?.map((x, key) => <Tag key={x.code} title={x.text} isGrey={x?.type === 'OTHER'} />)}
                {search?.type === 'DELIVERABLE' && <Tag key={search.code} title={search.text} isGrey={search?.type === 'OTHER'} />}
                {search?.type === 'OTHER' && <Tag key={search.code} title={search.text} isGrey={true} />}

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
            value={missionDetail?.contextAndTasks}
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
            value={missionDetail?.detailsOfDeliverables}
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
              type="button"
              theme={disableSendBrief ? 'disabledFilled' : 'filledButton'}
              handleClick={handleSendData}
              title={t('leadCreation.sendBriefButton')}
              loading={leadSaveLoading || updateLeadDraftLoading}
              disabled={disableSendBrief}
              type="submit"
              theme='filledButton'
            >
            </CustomButton>
          </Grid>
        </Grid>
      </Box >
    )
  }

  const handleDispatchHelp = () => {
    leadSave(values, "HELP_NEEDED");
    if (leadId !== undefined) {
      dispatch(changeLeadStatusLaunched({ leadId, status: 'NEED_HELP' }));
      setOpenCallMeModal(false);
    } else {
      setHasToWaitBeforeCallHelp(true);
    }
  }
  const getSteps = () => {
    return [t('leadCreation.synthesis'), t('leadCreation.details')];
  };
  const steps = getSteps();
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
  return (
    <Grid item className={classes.formGridItem}>
      <Stepper nonLinear={false} activeStep={leadCreationStep} className={classes.stepper} connector={<StepConnector style={{ display: 'none' }} />}>
        {steps.map((label, index) => {
          return (
            <Step key={label} className={classes.step}>
              <StepButton
                onClick={() => dispatch(setLeadCreationStep(index))}
                className={classes.stepButton}>
                <StepLabel
                  style={{ textAlign: "left" }}
                  StepIconComponent={CustomIcon}
                  className={leadCreationStep === index ? null : classes.inactiveLabel}
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
      {getStepContent(leadCreationStep)}
      {openCallMeModal && <CustomModal
        title="Au clic sur “Confirmer”, le remplissage de brief se mettra en pause, et vous serez rappelé.e par l’un des account managers d’acracy qui le finalisera au téléphone avec vous"
        open={openCallMeModal}
        handleClose={() =>
          setOpenCallMeModal(false)}
      >
        <Grid container className={classes.marginTop}>
          <Grid item>
            <CustomButton
              type="button"
              theme='primaryButton'
              title={'Confirmer'}
              loading={leadSaveLoading || changeLeadStatusLoading}
              handleClick={handleDispatchHelp}
            >
            </CustomButton>
          </Grid>
        </Grid>
      </CustomModal>}
    </Grid >
  )
};

export default LeadCreationForm;
