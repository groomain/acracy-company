import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import { CustomTextField, CustomPasswordField } from "../Inputs/CustomTextField";
import CustomSelect from "../Inputs/CustomSelect";
import CustomNavLink from "../CustomNavLink";
import CustomCheckbox from '../CheckBox';
import backToTop from '../../utils/backToTop';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box, StepConnector } from "@material-ui/core";
import clsx from 'clsx';
import styles from './styles';

const SignUpForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const classes = styles();
  const { signupErrorMessage, signupLoading } = useSelector(state => ({
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
    signupLoading: state.getIn(['app', 'signupLoading'])
  }));

  const { companyName, firstName, lastName, role, phoneNumber, phonePrefix, email, password, confirmPassword, conditions } = values;

  const [optionsValues] = useState([
    'Fr : +33',
    'Blg : +32',
    'It : +39'
  ]);

  const [activeStep, setActiveStep] = useState(0);

  const getSteps = () => {
    return [t('signup.personnalInfos'), t('password')];
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return setPersonnalInfos();
      case 1:
        return setPassword();
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

  const [disabledFirstStep, setDisabledFirstStep] = useState(true);

  const checkLength = (text) => {
    return !!text?.length > 0
  };

  useEffect(() => {
    if (
      checkLength(companyName) &&
      checkLength(firstName) &&
      checkLength(lastName) &&
      checkLength(role) &&
      checkLength(phoneNumber) &&
      checkLength(phonePrefix) &&
      checkLength(email)
    ) {
      setDisabledFirstStep(false)
    } else {
      setDisabledFirstStep(true)
    }
  }, [companyName, firstName, lastName, role, phoneNumber, phonePrefix, email]);

  const [disabledSecondStep, setDisabledSecondStep] = useState(true)

  useEffect(() => {
    if (
      checkLength(password) &&
      checkLength(confirmPassword) &&
      conditions === true
    ) {
      setDisabledSecondStep(false)
    } else {
      setDisabledSecondStep(true)
    }
  }, [password, confirmPassword, conditions]);

  const setPersonnalInfos = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h1"} >{t('signup.createAccount')}</Typography>
        <br />
        <br />
        <Typography variant={"h4"} >{t('signup.alreadyHaveAccount')} &nbsp;
          <span><CustomNavLink to="/login" text={t('signup.loginLinkMsg')} theme='yellowLink'></CustomNavLink></span>
        </Typography>
        <br />
        <br />
        <Typography variant={"h2"} >{t('signup.accountCreation')}</Typography>
        <Typography variant={"h1"} >{t('signup.personnalInfos')}</Typography>
        <br />
        <br />

        <Grid container>
          <Grid item xs={12} className={classes.signupRows}>
            <CustomTextField
              name="companyName"
              type="text"
              value={companyName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('signup.companyNamePlaceholder')}
              label={t('signup.companyName') + '*'}
              error={!!touched.companyName && !!errors.companyName}
            />
          </Grid>

          <Grid container item spacing={2} className={`${classes.signupRows} ${classes.marginTop}`}>
            <Grid item xs={6}>
              <CustomTextField
                name="firstName"
                type="text"
                value={firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                label={t('firstName') + '*'}
                placeholder={t('signup.firstNamePlaceholder')}
                error={!!touched.firstName && !!errors.firstName}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextField
                name="lastName"
                type="text"
                value={lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                label={t('lastName') + '*'}
                placeholder={t('signup.lastNamePlaceholder')}
                error={!!touched.lastName && !!errors.lastName}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={`${classes.signupRows} ${classes.marginTop}`}>
            <CustomTextField
              name="role"
              type="text"
              value={role}
              onBlur={handleBlur}
              onChange={handleChange}
              label={t('signup.role') + '*'}
              placeholder={t('signup.rolePlaceholder')}
              error={!!touched.role && !!errors.role}
            />
          </Grid>

          <Grid item xs={12} className={`${classes.signupRows} ${classes.marginTop}`} >
            <CustomTextField
              name="email"
              type="email"
              value={email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('signup.emailPlaceholder')}
              label={t('signup.emailPro') + '*'}
              error={!!touched.email && !!errors.email}
            />
          </Grid>

          <Grid container item direction='column' className={classes.marginTop}>
            <Box>
              <Typography variant={'body1'} >{t('signup.phoneNumber') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>

              <Grid item xs={5}>
                <CustomSelect
                  name='phonePrefix'
                  optionsValues={optionsValues}
                  value={values.phonePrefix}
                  onBlur={handleBlur('phonePrefix')}
                  onChange={handleChange}
                  error={!!touched.phonePrefix && !!errors.phonePrefix}
                />
              </Grid>

              <Grid item xs={7}>
                <CustomTextField
                  name="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('signup.phoneNumberPlaceholder')}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                />
              </Grid>
            </Grid>

            <Typography variant={'subtitle2'}>{signupErrorMessage}</Typography>
          </Grid>
        </Grid>

        <Grid container justify='flex-end' className={classes.signupRows}>
          <CustomButton
            type="button"
            theme={disabledFirstStep ? "disabledFilled" : "filledButton"}
            handleClick={handleStep(1)}
            loading={signupLoading}
            title={t('buttonTitles.nextButton')}
            disabled={disabledFirstStep}
          >
          </CustomButton>
        </Grid>
      </Box>
    );
  }

  const setPassword = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h2"} >{t('signup.accountCreation')}</Typography>
        <Typography variant={"h1"} >{t('signup.yourPassword')}</Typography>
        <br />
        <br />

        <Grid container>
          <Grid item xs={12} className={`${classes.signupRows} ${classes.marginTop}`}>
            <CustomPasswordField
              name="password"
              value={password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('signup.passwordPlaceholder')}
              label={t('password') + '*'}
              error={!!touched.password && !!errors.password}
            />
          </Grid>

          <Grid item xs={12} className={`${classes.signupRows} ${classes.marginTop}`}>
            <CustomPasswordField
              name="confirmPassword"
              value={confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('signup.confirmPasswordPlaceholder')}
              label={t('confirmPassword') + '*'}
              error={!!touched.confirmPassword && !!errors.confirmPassword}
            />
          </Grid>

          <Grid container justify='space-between' alignItems='center' className={classes.marginTop}>
            <Grid item xs={2}>
              <CustomCheckbox
                name="conditions"
                value="true"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant={"h4"}>
                {t('signup.conditions1')}
                <span>
                  <CustomNavLink to="/conditions" text={t('signup.termsAndConditions')} theme='yellowLink'></CustomNavLink>
                </span>
                {t('signup.conditions2')}
              </Typography>
            </Grid>
          </Grid>

          <Grid container justify='space-between' className={classes.marginTop}>
            <Grid item>
              <CustomButton
                type="button"
                handleClick={handleBack}
                loading={signupLoading}
                title={t('buttonTitles.backButton')}
              >
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton
                type="submit"
                theme={disabledSecondStep ? "disabledFilled" : "filledButton"}
                handleClick={() => handleSubmit({ email, password })}
                loading={signupLoading}
                title={t('signup.createAccountButton')}
                disabled={disabledSecondStep}
              >
              </CustomButton>
              <Typography variant={'subtitle2'}>{signupErrorMessage}</Typography>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    );
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
      <Stepper
        connector={<StepConnector style={{ display: 'none' }} />}
        activeStep={activeStep} className={classes.stepper}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label} className={classes.step}>
              <StepButton onClick={handleStep(index)} className={classes.stepButton}>
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

export default SignUpForm;
