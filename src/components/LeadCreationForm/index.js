import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../Searchbar';
import { CustomButton } from '../Button/';
import { CustomTextField } from '../Inputs/CustomTextField';
import CustomTextArea from '../Inputs/CustomTextArea';
import CustomSelect from "../Inputs/CustomSelect";
// import CustomNavLink from "../CustomNavLink";
// import CustomCheckbox from '../CheckBox';
import backToTop from '../../utils/backToTop';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box } from "@material-ui/core";
import clsx from 'clsx';
import styles from './styles';

const LeadCreationForm = (props) => {
  const { t } = useTranslation();
  const classes = styles();

  const [activeStep, setActiveStep] = useState(0);
  // const [format, setFormat] = useState('');
  const [formValues, setFormValues] = useState({});
  console.log('formValues :', formValues);
  const [formatOption, setFormatOption] = useState('Peu importe')
  const [missionTitle, setMissionTitle] = useState('');


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
    setActiveStep(step);
    backToTop();
  };

  const handleFormatChange = e => {
    const { name, value } = e.target;
    setFormatOption(e.target.value);
    setFormValues({ format: value })
    console.log('e target', e.target)
  }

  const handleMissionTitleChange = e => {
    const { name, value } = e.target;
    setMissionTitle(e.target.value);
    setFormValues({ missionTitle: value })
    console.log('e target', e.target.value)
  }
  const setOptionsValues = (fieldName) => {
    switch (fieldName) {
      case 'format':
        return (
          ['Peu importe', 'En remote uniquement', 'Sur place uniquement', 'En remote et sur place']
        )
      case 'rythm':
        return (
          ['Temps partiel (1 jour)', 'Temps partiel (2 jours)', 'Temps partiel (3 jours)', 'Temps partiel (4 jours)', 'Plein temps (5 jours)']
        )
      case 'duration':
        return (
          ['Jours', 'Semaines', 'Mois']
        )
      case 'budget':
        return (
          ['Taux journalier', 'Budget total']
        )
      case 'profiles':
        return (
          ['1', '2', '3', '4']
        )
      default:
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
            <SearchBar></SearchBar>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            {/* MAX CHARACTERS = 200 MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM*/}
            <CustomTextArea
              label={t('leadCreation.missionLabel')}
              placeholder={t('leadCreation.missionPlaceholder')}
              onChange={handleMissionTitleChange}
            ></CustomTextArea>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            {/* calendrier */}
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.formatLabel')}
              optionsValues={setOptionsValues('format')}
              onChange={handleFormatChange}
              value={formatOption}
              name='format'
            ></CustomSelect>
          </Grid>
          {(formatOption === 'Sur place uniquement' || formatOption === 'En remote et sur place') ?
            <Grid item xs={12} className={classes.fieldRows}>
              <CustomTextField label={t('leadCreation.locationLabel')} placeholder={t('leadCreation.locationPlaceholder')}></CustomTextField>
            </Grid> : null
          }

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.rythmLabel')}
              optionsValues={setOptionsValues('rythm')}
            // onChange={handleFormatChange}
            // value={formatOption}
            // name='format'
            ></CustomSelect>
          </Grid>

          <Grid item container xs={12} className={classes.fieldRows}>
            <Box>
              <Typography variant={'body1'} >{t('leadCreation.durationLabel') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <CustomTextField placeholder={t('leadCreation.durationPlaceholder')}></CustomTextField>
              </Grid>
              <Grid item xs={4}>
                <CustomSelect
                  // label={t('leadCreation.durationLabel')}
                  optionsValues={setOptionsValues('duration')}
                // onChange={handleFormatChange}
                // value={formatOption}
                // name='format'
                ></CustomSelect>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} className={classes.fieldRows}>
            <Box>
              <Typography variant={'body1'} >{t('leadCreation.budgetLabel') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <CustomTextField placeholder={t('leadCreation.budgetPlaceholder')}></CustomTextField>
              </Grid>
              <Grid item xs={4}>
                <CustomSelect
                  // label={t('leadCreation.durationLabel')}
                  optionsValues={setOptionsValues('budget')}
                // onChange={handleFormatChange}
                // value={formatOption}
                // name='format'
                ></CustomSelect>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.fieldRows}>
            <CustomSelect
              label={t('leadCreation.profilesLabel')}
              optionsValues={setOptionsValues('profiles')}
              onChange={handleFormatChange}
              value={formatOption}
              name='profiles'
            ></CustomSelect>
          </Grid>

          <Grid container justify='flex-end' className={classes.marginTop}>
            <Grid item>
              <CustomButton
                type="button"
                theme='primaryButton'
                // handleClick={handleCallMe}
                title={t('leadCreation.callMe')}
              >
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton
                type="button"
                theme="filledButton"
                handleClick={handleStep(1)}
                title={t('nextButton')}
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
      </Box>
    )
  }

  const setLeadDetails = () => {
    return (
      <></>
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
      <Stepper nonLinear connector={false} activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => {
          return (
            <Step key={label} className={classes.step}>
              <StepButton onClick={handleStep(index)} className={classes.stepButton}>
                <StepLabel
                  style={{ textAlign: "left" }}
                  StepIconComponent={CustomIcon}
                  classes={activeStep === index ? null : classes.inactiveLabel}
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