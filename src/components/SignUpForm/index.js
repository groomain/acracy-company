import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import CustomTextField from "../Inputs/CustomTextField";
import CustomSelect from "../Inputs/CustomSelect";
import CustomNavLink from "../CustomNavLink";
import { Typography, Grid, Stepper, Step, StepLabel, StepButton, Box } from "@material-ui/core";
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
    setActiveStep((prevActiveStep) => prevActiveStep - 1);////////////////////////////////////////////////
  };

  const handleStep = (step) => () => {
    console.log('handle step, step :', step);

    setActiveStep(step);
  };

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

          <Grid container item spacing={2} className={classes.signupRows}>
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
          <Grid item xs={12} className={classes.signupRows}>
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

          <Grid item xs={12} className={classes.signupRows}>
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
            handleClick={() => setActiveStep(1)}
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
        <Typography variant={"h2"} >{t('accountCreation')}</Typography>
        <Typography variant={"h1"} >{t('yourPassword')}</Typography>
        <br />
        <br />

        <Grid container>
          <Grid item xs={12} className={classes.signupRows}>
            <CustomTextField
              name="password"
              type="password"
              value={companyName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('passwordPlaceholder')}
              label={t('password') + '*'}
              error={!!touched.companyName && !!errors.companyName}
              helperText={touched.companyName && errors.companyName ? t('passwordRequired') : ''}
            />
          </Grid>

          <Grid item xs={12} className={classes.signupRows}>
            <CustomTextField
              name="confirmPassword"
              type="confirmPassword"
              value={companyName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t('confirmPasswordPlaceholder')}
              label={t('confirmPassword') + '*'}
              error={!!touched.companyName && !!errors.companyName}
              helperText={touched.companyName && errors.companyName ? t('passwordRequired') : ''}
            />
          </Grid>
          <Grid container justify='space-between'>
            <Grid item>
              <CustomButton
                type="button"
                handleClick={() => handleStep(1)}
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
            </Grid>
          </Grid>

        </Grid>
      </>
    );
  }

  {/* <Grid
      container
      direction="column"
      justify="center"
      alignItems="left"
    > */}
  {/* </Grid> */ }
  return (
    <Grid item className={classes.formGridItem}>
      <Stepper nonLinear connector={false} activeStep={activeStep} className={classes.stepper}>
        {console.log('active', activeStep)}

        {steps.map((label, index) => {
          return (
            <Step key={label} className={classes.step} inactive={classes.inactiveStep}>
              <StepButton onClick={handleStep(index)} className={classes.stepButton}>
                <StepLabel justify="center"
                  classes={{
                    stepIcon: classes.stepIcon,
                    iconContainer: classes.iconContainer,
                    iconRoot: classes.icon,
                    circle: classes.circle
                  }}
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
      <br />
      <br />
      <br />
      {getStepContent(activeStep)}

    </Grid >
  )
};

export default SignUpForm;
