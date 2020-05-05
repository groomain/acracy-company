import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import CustomTextField from "../Inputs/CustomTextField";
import CustomSelect from "../Inputs/CustomSelect";
import CustomNavLink from "../CustomNavLink";
import { Typography, Grid, Stepper, Step, StepButton, Box } from "@material-ui/core";
import styles from '../../utils/styles';

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
  const steps = getSteps();

  function getSteps() {
    return [t('personnalInfos'), t('password')];
  }

  const setPersonnalInfos = () => {
    return (
      <>
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
          <Grid item xs={12}>
            <CustomTextField
              name="companyName"
              type="companyName"
              value={companyName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('companyNameLabel')}
              label={t('companyName') + '*'}
              error={!!touched.companyName && !!errors.companyName}
              helperText={touched.companyName && errors.companyName ? t('companyNameRequired') : ''}
            />
          </Grid>

          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <CustomTextField
                name="firstName"
                type="firstName"
                value={firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                label={t('firstName') + '*'}
                placeholder={t('firstNameLabel')}
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
                placeholder={t('lastNameLabel')}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName ? t('lastNameRequired') : ''}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="role"
              type="role"
              value={role}
              onBlur={handleBlur}
              onChange={handleChange}
              label={t('role') + '*'}
              placeholder={t('roleLabel')}
              error={!!touched.role && !!errors.role}
              helperText={touched.role && errors.role ? t('roleRequired') : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              name="email"
              type="email"
              value={email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('emailLabel')}
              label={t('emailPro') + '*'}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email ? t('emailRequired') : ''}
            />
          </Grid>

          <Grid container item direction='column'>

            <Box>
              <Typography variant={'body1'} >{t('phoneNumber') + '*'}</Typography>
            </Box>
            <Grid container spacing={2}>

              <Grid item xs={5}>
                <CustomSelect></CustomSelect>
              </Grid>

              <Grid item xs={7}>
                <CustomTextField
                  name="phoneNumber"
                  type="phoneNumber"
                  value={phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('phoneNumberLabel')}
                  label={' '}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber ? t('emailRequired') : ''}
                />
              </Grid>
            </Grid>

            <Typography variant={'subtitle2'}>{signupErrorMessage}</Typography>
          </Grid>
        </Grid>

        <Grid container justify='flex-end'>
          <CustomButton
            type="button"
            theme="filledButton"
            handleClick={() => handleStep(1)}
            loading={signupLoading}
            title={t('nextButton')}
          >
          </CustomButton>
        </Grid>

      </>
    );
  }

  const setPassword = () => {
    return (
      <>
        <Typography>it works?  HEY IT WOOOORKS !!!</Typography>
        <CustomButton
          type="submit"
          handleClick={() => handleSubmit({ email, password })}
          loading={signupLoading}
          title={t('nextButton')}
        >
        </CustomButton>
      </>
    )
  }

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
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  {/* <Grid
      container
      direction="column"
      justify="center"
      alignItems="left"
    > */}
  {/* </Grid> */ }
  return (
    <Grid item className={classes.formGridItem}>
      <Stepper nonLinear activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={label} className={classes.step}>
            <StepButton onClick={handleStep(index)} >

              <Typography>
                {label}
              </Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <br />
      <br />
      <br />
      {getStepContent(activeStep)}

    </Grid>
  )
};

export default SignUpForm;
