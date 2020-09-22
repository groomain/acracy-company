import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { CustomButton } from '../../Button/';
import { CustomTextField, CustomPasswordField } from "../../Inputs/CustomTextField";
import CustomSelect from "../../Inputs/CustomSelect";
import CustomNavLink from "../../CustomNavLink";
import CustomCheckbox from '../../CheckBox';
import backToTop from '../../../utils/backToTop';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box, StepConnector } from "@material-ui/core";
import areaCodes from "../../../utils/areaCodes.json";

import { handleCurrentStep } from '../../App/reducer';
import { openSnackBar } from '../../App/reducer';
import { checkLength } from '../../../utils/services/validationChecks';
import { handleNumberInput } from '../../../utils/services/format';

import styles from './styles';

const SignUpForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const classes = styles();
  const dispatch = useDispatch();

  const { signupErrorMessage, signupLoading } = useSelector(state => ({
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
    signupLoading: state.getIn(['app', 'signupLoading'])
  }));

  const { companyName, firstName, lastName, role, phoneNumber, phonePrefix, email, password, confirmPassword, conditions } = values;

  const [optionsValues] = useState(areaCodes);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep === 0) {
      dispatch(handleCurrentStep(1));
    } else if (activeStep === 1) {
      dispatch(handleCurrentStep(2));
    }
  }, [activeStep, dispatch]);

  const getSteps = () => {
    return [t('signup.personnalInfos'), t('password')];
  };

  const handleDifferentPasswords = () => {
    if (password !== confirmPassword) {
      dispatch(openSnackBar({ message: "Les mots de passe doivent être identiques", error: true }))
    }
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
    if (step === 3) {
      dispatch(handleCurrentStep(step));
    } else if (step === 1) {
      setActiveStep(step);
      dispatch(handleCurrentStep(2));
      backToTop();
    }
  };

  const [disabledFirstStep, setDisabledFirstStep] = useState(true);

  const handleNumberField = (e, limit) => {
    const numberResult = handleNumberInput(e, limit);
    handleChange(numberResult);
  };
  // console.log("phonePrefix", phonePrefix);

  useEffect(() => {
    if (
      checkLength(companyName, 0) &&
      checkLength(firstName, 0) &&
      checkLength(lastName, 0) &&
      checkLength(role, 0) &&
      checkLength(phoneNumber, 9) &&
      checkLength(phonePrefix, 0) &&
      checkLength(email, 0)
    ) {
      setDisabledFirstStep(false)
    } else {
      setDisabledFirstStep(true)
    }
  }, [companyName, firstName, lastName, role, phoneNumber, phonePrefix, email]);

  const [disabledSecondStep, setDisabledSecondStep] = useState(true)

  useEffect(() => {
    if (
      checkLength(password, 7) &&
      checkLength(confirmPassword, 7) &&
      conditions === true
    ) {
      setDisabledSecondStep(false)
    } else {
      setDisabledSecondStep(true)
    }
  }, [password, confirmPassword, conditions]);

  const setPersonnalInfos = () => {
    return (
      <Box>
        <Box mt={'100px'}>
          <Typography variant={"h1"} >{t('signup.createAccount')}</Typography>
        </Box>
        <Box my={'40px'}>
          <Typography variant={"h4"} >{t('signup.alreadyHaveAccount')} &nbsp;
          <span><CustomNavLink to="/login" text={t('signup.loginLinkMsg')} theme='yellowLink'></CustomNavLink></span>
          </Typography>
        </Box>
        <Box my={'40px'}>
          <Typography variant={"h2"} >{t('signup.accountCreation')}</Typography>
          <Typography variant={"h1"} >{t('signup.personnalInfos')}</Typography>
        </Box>
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
            <Box my={2}>
              <Typography variant={'h4'} >{t('signup.phoneNumber') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>

              <Grid item xs={5}>
                <CustomSelect
                  name='phonePrefix'
                  optionsValues={optionsValues}
                  value={phonePrefix}
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
                  onChange={e => handleNumberField(e, 0)}
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
        <Box mt={'100px'}>
          <Typography variant={"h2"} >{t('signup.accountCreation')}</Typography>
        </Box>
        <Box mb={'calc(40px - 16px)'}>
          <Typography variant={"h1"} >{t('signup.yourPassword')}</Typography>
        </Box>
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
                <a href={'https://acracy.co/cgu-cgv/'}
                  target="_blank"
                  className={classes.link}>
                  {t('signup.termsAndConditions')}
                </a>
                {t('signup.conditions2')}
              </Typography>
            </Grid>
          </Grid>

          <Grid container justify='space-between' className={classes.marginTop}>
            <Grid item>
              <CustomButton
                type="button"
                handleClick={handleBack}
                title={t('buttonTitles.backButton')}
              >
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton
                type="submit"
                theme={disabledSecondStep ? "disabledFilled" : "filledButton"}
                handleClick={() => {
                  handleStep(3);
                  handleDifferentPasswords();
                  handleSubmit({ email, password })
                }}
                loading={signupLoading}
                title={t('signup.createAccountButton')}
                disabled={disabledSecondStep || signupLoading}
              >
              </CustomButton>
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
