import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../Searchbar';
import { CustomButton } from '../Button/';
import { CustomTextField, CustomPasswordField } from "../Inputs/CustomTextField";
import CustomSelect from "../Inputs/CustomSelect";
import CustomNavLink from "../CustomNavLink";
import CustomCheckbox from '../CheckBox';
import backToTop from '../../utils/backToTop';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box } from "@material-ui/core";
import clsx from 'clsx';
import styles from './styles';

const LeadCreationForm = (props) => {
  const { t } = useTranslation();
  const classes = styles();

  const [activeStep, setActiveStep] = React.useState(0);


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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    backToTop();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    backToTop();
  };

  const setLeadSynthesis = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h1"} >{t('leadCreation.synthesis')}</Typography>
        <br />
        <br />
        <SearchBar></SearchBar>
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