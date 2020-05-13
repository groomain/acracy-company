import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import { CustomTextField, CustomPasswordField } from "../Inputs/CustomTextField";
import CustomSelect from "../Inputs/CustomSelect";
import CustomNavLink from "../CustomNavLink";
import CustomCheckbox from '../CheckBox';
import backToTop from '../../utils/backToTop';
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box } from "@material-ui/core";
import clsx from 'clsx';
import styles from './styles';

const SignUpForm = (props) => {
  const { t } = useTranslation();
  const classes = styles();
  const { signupErrorMessage, signupLoading } = useSelector(state => ({
    signupErrorMessage: state.getIn(['app', 'signupErrorMessage']),
    signupLoading: state.getIn(['app', 'signupLoading'])
  }));
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = props;
  const { companyName, firstName, lastName, role, phoneNumber, email, password, confirmPassword } = values;
  const [activeStep, setActiveStep] = React.useState(0);

  const [optionsValues] = useState([
    'Fr : +33',
    'Blg : +32',
    'It : +39'
  ]);


  const getSteps = () => {
    return [t('personnalInfos'), t('password')];
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

  const setPersonnalInfos = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h1"} >{t('createAccount')}</Typography>
        <br />
        <br />
        <Typography variant={"h4"} >{t('alreadyHaveAccount')} &nbsp;
            <span> <CustomNavLink to="/login" text={t('loginLinkMsg')} theme='yellowLink'></CustomNavLink></span>
        </Typography>
        <br />
        <br />
        <Typography variant={"h2"} >{t('accountCreation')}</Typography>
        <Typography variant={"h1"} >{t('personnalInfos')}</Typography>
        <br />
        <br />

        <Grid container>
          <Grid item xs={12} className={classes.signupRows}>
            <CustomTextField
              name="companyName"
              type="companyName"
              value={companyName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('companyNamePlaceholder')}
              label={t('companyName') + '*'}
              error={!!touched.companyName && !!errors.companyName}
              helperText={touched.companyName && errors.companyName ? t('companyNameRequired') : ''}
            />
          </Grid>

          <Grid container item spacing={2} className={`${classes.signupRows} ${classes.marginTop}`}>
            <Grid item xs={6}>
              <CustomTextField
                name="firstName"
                type="firstName"
                value={firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                label={t('firstName') + '*'}
                placeholder={t('firstNamePlaceholder')}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName ? t('firstNameRequired') : ''}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextField
                name="lastName"
                type="lastName"
                value={lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                label={t('lastName') + '*'}
                placeholder={t('lastNamePlaceholder')}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName ? t('lastNameRequired') : ''}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={`${classes.signupRows} ${classes.marginTop}`}>
            <CustomTextField
              name="role"
              type="role"
              value={role}
              onBlur={handleBlur}
              onChange={handleChange}
              label={t('role') + '*'}
              placeholder={t('rolePlaceholder')}
              error={!!touched.role && !!errors.role}
              helperText={touched.role && errors.role ? t('roleRequired') : ''}
            />
          </Grid>

          <Grid item xs={12} className={classes.signupRows, classes.marginTop}>
            <CustomTextField
              name="email"
              type="email"
              value={email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              label={t('emailPro') + '*'}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email ? t('emailRequired') : ''}
            //ajouter un verification en bdd pour voir si l'adresse email existe déjà
            />
          </Grid>

          <Grid container item direction='column' className={classes.marginTop}>

            <Box>
              <Typography variant={'body1'} >{t('phoneNumber') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>

              <Grid item xs={5}>
                <CustomSelect optionsValues={optionsValues} />
              </Grid>

              <Grid item xs={7}>
                <CustomTextField
                  name="phoneNumber"
                  type="phoneNumber"
                  value={phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('phoneNumberPlaceholder')}
                  label={' '}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber ? t('emailRequired') : ''}
                />
              </Grid>
            </Grid>

            <Typography variant={'subtitle2'}>{signupErrorMessage}</Typography>
          </Grid>
        </Grid>

        <Grid container justify='flex-end' className={classes.signupRows}>
          <CustomButton
            type="button"
            theme="filledButton"
            handleClick={handleStep(1)}
            // handleClick={() => setActiveStep(1)}
            loading={signupLoading}
            title={t('nextButton')}
          >
          </CustomButton>
        </Grid>

      </Box>
    );
  }

  const setPassword = () => {
    return (
      <Box className={classes.stepContent}>
        <Typography variant={"h2"} >{t('accountCreation')}</Typography>
        <Typography variant={"h1"} >{t('yourPassword')}</Typography>
        <br />
        <br />

        <Grid container>
          <Grid item xs={12} className={classes.signupRows, classes.marginTop}>
            <CustomPasswordField
              name="password"
              value={password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('passwordPlaceholder')}
              label={t('password')}
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password ? t('passwordRequired') : ''}
            />
          </Grid>

          <Grid item xs={12} className={classes.signupRows, classes.marginTop}>
            <CustomPasswordField
              name="confirmPassword"
              value={confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('confirmPasswordPlaceholder')}
              label={t('confirmPassword')}
              error={!!touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword ? t('confirmPasswordRequired') : ''}
            />
          </Grid>

          <Grid container justify='space-between' alignItems='center' className={classes.marginTop}>
            <Grid item xs={2}>
              <CustomCheckbox></CustomCheckbox>
            </Grid>
            <Grid item xs={10}>
              <Typography variant={"h4"}>
                J'ai lu et j'accepte les&nbsp;
                <span>
                  <CustomNavLink to="/conditions" text={t('termsAndConditions')} theme='yellowLink'></CustomNavLink>
                </span>
                &nbsp;du site et des missions acracy
              </Typography>
            </Grid>
          </Grid>

          <Grid container justify='space-between' className={classes.marginTop}>
            <Grid item>
              <CustomButton
                type="button"
                handleClick={handleBack}
                loading={signupLoading}
                title={t('backButton')}
              >
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton
                type="submit"
                theme="filledButton"
                handleClick={() => handleSubmit({ email, password })}
                loading={signupLoading}
                title={t('createAccountButton')}
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
      {/* <br />
      <br />
      <br /> */}
      {getStepContent(activeStep)}

    </Grid >
  )
};

export default SignUpForm;
