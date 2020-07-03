import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Searchbar';
import { CustomButton } from '../Button/';
import { CustomTextField } from '../Inputs/CustomTextField';
import CustomTextArea from '../Inputs/CustomTextArea';
import CustomSelect from "../Inputs/CustomSelect";
import Calendar from "../Inputs/Calendar";
import TagsList from "../Tags/TagsList";
import Tag from '../Tags/Tag';
import backToTop from '../../utils/backToTop';
import CustomModal from '../Modal';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box, InputAdornment, StepConnector } from "@material-ui/core";
import {
  setLeadDraftSearchData, setDeliverablesArray, setDailyRate,
  changeLeadStatusLaunched, getExpertisesLaunched, setExpertisePriorities
} from '../../pages/LeadCreationPage/reducer';
import { leadSave } from '../../pages/LeadCreationPage/index';
import clsx from 'clsx';
import styles from './styles';

const LeadCreationForm = ({ sendValues, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { values, errors, touched, handleBlur, handleChange } = props;
  const { frequency, workspace, duration, durationType, missionTitle, budgetType, profile, profilesNumber } = values;

  let leadCreationStep = 1; // the dashboard page
  const [activeStep, setActiveStep] = useState(leadCreationStep);
  const [searchedCategory, setSearchedCategory] = useState({});
  const [deliverables, setDeliverables] = useState([]);
  const [disabled, setDisabled] = useState(false); // to be used with step 2
  const [dailyCost, setDailyCost] = useState();
  const [withCommission, setWithCommission] = useState();
  const [openCallMeModal, setOpenCallMeModal] = useState(false);
  const [disableCallMeBtn, setDisableCallMeBtn] = useState(true);

  const { leadDraftSearchData, deliverablesArray, expertises,
    selectedExpertiseList, expansionPanelOpen, expertisePriorities } = useSelector(state => ({
      dateFromCalendar: state.getIn(['leadCreation', 'dateFromCalendar']),
      leadDraftSearchData: state.getIn(['leadCreation', 'leadDraftSearchData']),
      deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray']),
      // leadCreationStep: state.getIn(['leadCreation', 'leadCreationStep']),
      expertises: state.getIn(['leadCreation', 'expertises']),
      selectedExpertiseList: state.getIn(['leadCreation', 'selectedExpertiseList']),
      expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
      expertisePriorities: state.getIn(['leadCreation', 'expertisePriorities'])
    }));

  useEffect(() => {
    if (leadDraftSearchData?.search !== null) {
      setDisableCallMeBtn(false)
    } else if (leadDraftSearchData?.search === null) {
      setDisableCallMeBtn(true)
    }
  }, [leadDraftSearchData]);

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
  const handleStep = (step) => () => {
    setActiveStep(step);
    backToTop();
  };

  const handleCallMe = () => {
    setOpenCallMeModal(true)
  }

  const handleDispatchHelp = () => {
    let redirect = false;
    leadSave(leadDraftSearchData, deliverablesArray, values, redirect)
    dispatch(changeLeadStatusLaunched('HELP_NEEDED'));
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
    dispatch(setDeliverablesArray(deliverables))
  }, [deliverables, dispatch]);

  const handleUpdateResearch = (e) => {
    setSearchedCategory(e);  // type, text and objectID
    dispatch(setLeadDraftSearchData({ search: e }))
  }

  const showDeliverablesSettings = () => {
    const selectableDeliverables = searchedCategory.DELIVERABLES;
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
    let selectableProfiles = searchedCategory.PROFILES;
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
    switch (searchedCategory.TYPE) {
      case 'PROFILE':
        return (
          showDeliverablesSettings()
        )
      case 'DELIVERABLE':
        return (
          showProfilesSettings()
        )
      default:
        return (
          null
        );
    }
  }

  const setLeadSynthesis = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h1"} >{t('leadCreation.synthesis')}</Typography>
        <br />
        <br />
        <Grid container>

          <Grid item xs={12} className={classes.fieldRows}>
            <SearchBar
              name='researchValue'
              context='leadCreation'
              onUpdateChosenCategory={handleUpdateResearch}
            ></SearchBar>
          </Grid>

          {searchedCategory ? renderSearchedTypeSettings(searchedCategory) : null}

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomTextArea
              label={t('leadCreation.missionLabel')}
              placeholder={t('leadCreation.missionPlaceholder')}
              name='missionTitle'
              maxLength={200}
              valueOut={missionTitle}
              onChange={handleChange}
            ></CustomTextArea>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <Calendar
              label={t('leadCreation.calendarLabel')}
              name='missionStartDate'
              onChange={handleChange}
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
              {(values?.budget && values?.budgetType && values?.duration && values?.durationType && values?.frequency && values?.profilesNumber) ?
                <Typography variant='h2' style={{ marginTop: '-2rem', marginBottom: '1rem', paddingLeft: '0.45rem' }}>
                  {(values.budgetType === 'Taux journalier' ?
                    `Soit un montant global de ${withCommission}€, commission acracy incluse.`
                    :
                    `Soit un taux journalier de ${withCommission}€, une fois la commission acracy déduite.`)}
                </Typography>
                : ''}
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
                theme='primaryButton'
                disabled={disableCallMeBtn}
                handleClick={handleCallMe}
                title={t('leadCreation.callMe')}
              >
              </CustomButton>
            </Grid>
            <Grid item style={{ paddingLeft: '1.2rem' }}>
              <CustomButton
                type="button"
                theme="filledButton"
                handleClick={handleStep(1)}
                title={t('leadCreation.finishBrief')}
                disabled={disabled}
              >
              </CustomButton>
            </Grid>
          </Grid>

        </Grid>
        {<CustomModal
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
        </CustomModal>
        }
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
      dispatch(getExpertisesLaunched());
    }
  }, [dispatch, activeStep])

  const [expertisePriorityList, setExpertisePriorityList] = useState()

  useEffect(() => {
    setExpertisePriorityList(selectedExpertiseList?.map(x => ({ ...x, priority: false })))
  }, [selectedExpertiseList]);

  const handlePriorityCheck = (index) => {
    const prio = expertisePriorityList?.map((item, i) => (index === i) ? { ...item, priority: !item.priority } : item);
    setExpertisePriorityList(prio);
    dispatch(setExpertisePriorities(prio.filter(x => x.priority).map(x => x.text)));
  }

  const setLeadDetails = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant='h2'>{t('leadCreation.profileDetails')}</Typography>
        <Typography variant='h1'>{leadDraftSearchData?.search?.TEXT}</Typography>

        <Grid container>
          <Grid item xs={12} className={classes.fieldRows}>
            <TagsList
              tags={expertises}
              panelTitle={t('leadCreation.profileExpertises')}
              type='expertise'
            />
            {!expansionPanelOpen && <Grid item container direction='row'>
              {expertisePriorityList?.map((tag, key) => (
                <Tag key={key}
                  title={tag.text}
                  isPrimaryColor
                  tagType="Prioritaire"
                  isWithCheckbox
                  onCheckChange={() => handlePriorityCheck(key)}
                  checkedArray={expertisePriorities}
                />
              )
              )}
            </Grid>}
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
    </Grid >
  )
};

export default LeadCreationForm;