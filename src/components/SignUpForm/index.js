import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/';
import CustomTextField, { CustomPasswordField } from "../Inputs/CustomTextField";
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from "@material-ui/core/Typography";
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
        <Typography className={classes.text} >{t('createAccount')}</Typography>
        <br />
        <Typography className={classes.textSmall} >{t('alreadyHaveAccount')} &nbsp;
            <span className={`${classes.textSmallYellow} ${classes.textLink}`}> {t('loginLinkMsg')}</span>
        </Typography>
        <br />
        <Typography className={classes.textSmallYellow} >{t('accountCreation')}</Typography>
        <Typography className={classes.text} >{t('personnalInfos')}</Typography>
        <Typography className={classes.textSmall} >{t('companyName')}*</Typography>
        <CustomTextField
          name="companyName"
          type="companyName"
          value={companyName}
          onBlur={handleBlur}
          onChange={handleChange}
          label={t('companyNameLabel')}
          error={!!touched.companyName && !!errors.companyName}
          helperText={touched.companyName && errors.companyName ? t('companyNameRequired') : ''}
        />
        <Typography className={classes.textSmall} >{t('firstName')}*</Typography>
        <CustomTextField
          name="firstName"
          type="firstName"
          value={firstName}
          onBlur={handleBlur}
          onChange={handleChange}
          label={t('firstNameLabel')}
          error={!!touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName ? t('firstNameRequired') : ''}
        />
        <Typography className={classes.textSmall} >{t('lastName')}*</Typography>
        <CustomTextField
          name="lastName"
          type="lastName"
          value={lastName}
          onBlur={handleBlur}
          onChange={handleChange}
          label={t('lastNameLabel')}
          error={!!touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName ? t('lastNameRequired') : ''}
        />
        <Typography className={classes.textSmall} >{t('role')}*</Typography>
        <CustomTextField
          name="role"
          type="role"
          value={role}
          onBlur={handleBlur}
          onChange={handleChange}
          label={t('roleLabel')}
          error={!!touched.role && !!errors.role}
          helperText={touched.role && errors.role ? t('roleRequired') : ''}
        />
        <Typography className={classes.textSmall} >{t('emailPro')}*</Typography>
        <CustomTextField
          name="email"
          type="email"
          value={email}
          onBlur={handleBlur}
          onChange={handleChange}
          label={t('emailLabel')}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email ? t('emailRequired') : ''}
        />
        <Typography className={classes.textSmall} >{t('phoneNumber')}*</Typography>
        <CustomTextField
          name="phoneNumber"
          type="phoneNumber"
          value={phoneNumber}
          onBlur={handleBlur}
          onChange={handleChange}
          label={t('phoneNumberLabel')}
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber ? t('emailRequired') : ''}
        />
        <Typography variant={'subtitle2'}>{signupErrorMessage}</Typography>
      </>
    );
  }

  const setPassword = () => {
    return (
      <Typography>it works?  HEY IT WOOOORKS !!!</Typography>
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

  return (
    <>
      {/* <Grid
        container
        direction="column"
        justify="center"
        alignItems="left"
      > */}
      <Grid item xs={5} >

        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} classname={classes.stepper}>
              <StepButton onClick={handleStep(index)} >
                {label}
              </StepButton>

            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <CustomButton
          type="submit"
          handleClick={() => handleSubmit({ email, password })}
          loading={signupLoading}
          title={activeStep === 0 ? t('nextButton') : t('signUpSubmit')}
        >
        </CustomButton>
      </Grid>
      {/* </Grid> */}
    </>
  )
};

export default SignUpForm;
