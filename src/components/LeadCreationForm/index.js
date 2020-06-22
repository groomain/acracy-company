import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Searchbar';
import { CustomButton } from '../Button/';
import { CustomTextField } from '../Inputs/CustomTextField';
import CustomTextArea from '../Inputs/CustomTextArea';
import CustomSelect from "../Inputs/CustomSelect";
import Calendar from "../Inputs/Calendar";
import Tag from '../Tags/Tag';
import backToTop from '../../utils/backToTop';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box, InputAdornment } from "@material-ui/core";
import { setLeadDraft, setDeliverablesArray, setMissionTitle, dateFromCalendar, setDailyRate } from '../../pages/LeadCreationPage/reducer';
import { leadSave } from '../../pages/LeadCreationPage/index';
import { getPath } from '../../utils/services/validationChecks';
import clsx from 'clsx';
import styles from './styles';


const LeadCreationForm = ({ sendValues, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { values, errors, touched, handleBlur, handleChange } = props;
  const { frequency, searchedValue, workspace, companyAddress, duration, durationType, missionTitle, budget, budgetType, deliverable, customDeliverable, profile, profilesNumber } = values;

  const [activeStep, setActiveStep] = useState(0);
  const [searchedCategory, setSearchedCategory] = useState({});
  const [deliverables, setDeliverables] = useState([]);
  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [dailyCost, setDailyCost] = useState();
  const [withCommission, setWithCommission] = useState();

  const { dateFromCalendar, leadDraftData, deliverablesArray } = useSelector(state => ({
    dateFromCalendar: state.getIn(['leadCreation', 'dateFromCalendar']),
    leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
    deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray']),
  }));

  const getSteps = () => {
    return [t('leadCreation.synthesis'), t('leadCreation.details')];
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return setLeadSynthesis();
      case 1:
        return setLeadDetails();
      default:
        return 'Unknown step';
    }
  }
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   backToTop();
  // };
  const handleStep = (step) => () => {
    // if (deliverables && searchedCategory) {
    setActiveStep(step);
    // }
    backToTop();
  };

  const handleCallMe = () => {
    const needHelp = true
    console.log('component values :', values);
    leadSave(leadDraftData, deliverablesArray, values, needHelp)
    // algolia, livrables, données formulaire, needhelp, date????
  }

  useEffect(() => {
    dispatch(setDailyRate(dailyCost));
  }, [dailyCost, dispatch]);

  // useEffect(() => {
  //   let delivLenght = getPath(deliverables, 'deliverables');
  //   console.log('deliverables :', deliverables);
  //   console.log('delivLenght :', delivLenght);
  //   let serachlenfth = getPath(searchedCategory, 'search');
  //   console.log('serachlenfth :', serachlenfth);
  //   console.log('searchedValue :', searchedValue);
  //   if (missionTitle.length === 0 || dateFromCalendar === null || deliverablesArray.length === 0) {
  //     setDisabled(true);
  //   }
  // }, [deliverables, searchedValue, deliverablesArray, searchedCategory, missionTitle, dateFromCalendar]);

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
              preciseRate = parseInt(values.budget, 10) * daysNb * parseInt(values.duration, 10) * 4 * parseInt(values.profilesNumber, 10) * 1.15; // OK
            } else if (values.durationType === 'Semaines') {
              preciseRate = parseInt(values.budget, 10) * daysNb * parseInt(values.duration, 10) * parseInt(values.profilesNumber, 10) * 1.15; // OK
            } else if (values.durationType === 'Jours') {
              preciseRate = parseInt(values.budget, 10) * parseInt(values.duration, 10) * parseInt(values.profilesNumber, 10) * 1.15; // OK
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

  const handleUpdateMissionTitle = e => {
    console.log('e :', e);
    setMissionTitleInput(e);
    dispatch(setMissionTitle(e));
  }

  useEffect(() => {
    dispatch(setDeliverablesArray(deliverables))
  }, [deliverables, dispatch]);

  const handleUpdateResearch = (e) => {
    setSearchedCategory(e);  // type, text and objectID
    dispatch(setLeadDraft({ search: e }))
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
    const selectableProfiles = searchedCategory.PROFILES;
    const profilesList = selectableProfiles.map((item) => {
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
              valueOut={missionTitleInput}
              handleChangeOut={handleUpdateMissionTitle}
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

  const setLeadDetails = () => {
    return (
      <>
        <h1>This is step 2: brief detaiiiils</h1>
      </>
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
      <Stepper nonLinear={false} activeStep={activeStep} className={classes.stepper}>
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