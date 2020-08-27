import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { requestPasswordCodeLaunched } from '../../App/reducer';
import { CustomButton } from '../../Button/';
import { Grid, Box, Divider, Typography } from '@material-ui/core/';
import CustomTextField, { CustomPasswordField } from "../../Inputs/CustomTextField";
import sharedStyles from '../../../utils/styles';
import { checkLength } from '../../../utils/services/validationChecks';

const SubmitForm = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharedClasses = sharedStyles();

  const [codeNotReceivedClicked, setCodeNotReceivedClicked] = useState(false);

  const { submitPasswordLoading, resendCodeSuccessMessage } = useSelector(state => ({
    submitPasswordLoading: state.getIn(['app', 'submitPasswordLoading']),
    resendCodeSuccessMessage: state.getIn(['app', 'resendCodeSuccessMessage']),
  }));

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { code, password, confirmPassword, email } = values;

  const requestCode = () => {
    dispatch(requestPasswordCodeLaunched({ email: email }));
    setTimeout(() => {
      setCodeNotReceivedClicked(true);
    }, 800);
  };

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (checkLength(code, 5) &&
      checkLength(password, 7) &&
      checkLength(confirmPassword, 7)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [code, password, confirmPassword])

  return (
    <Grid>
      <Typography variant='h1' className={sharedClasses.titleSignIn}>{t('forgotPassword.newPasswordTitle')}</Typography>
      <Typography variant="body1">{t('forgotPassword.newPasswordSubtitle')} <span className={sharedClasses.email}>{email}</span></Typography>
      <Box my={8}>
        <form onSubmit={handleSubmit}>
          <Box className={sharedClasses.midWidth}>
            <CustomTextField
              value={code}
              name='code'
              onBlur={handleBlur}
              onChange={handleChange}
              label={t('confirmSignupPage.label')}
              placeholder={t('confirmSignupPage.placeholder')}
              error={!!touched.code && !!errors.code}
            />
          </Box>
          <Box my={3}>
            <CustomPasswordField
              value={password}
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              label={t('forgotPassword.newPasswordTitle') + '*'}
              placeholder={t('forgotPassword.newPasswordPlaceholder')}
              error={!!touched.password && !!errors.password}
            />
          </Box>
          <Box my={3}>
            <CustomPasswordField
              value={confirmPassword}
              name='confirmPassword'
              onBlur={handleBlur}
              onChange={handleChange}
              label={t('forgotPassword.confirmPasswordLabel') + '*'}
              placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
              error={!!touched.confirmPassword && !!errors.confirmPassword}
            />
          </Box>
          <Grid container justify='flex-end'>
            <CustomButton
              type="submit"
              loading={submitPasswordLoading}
              title={t('submitNewPasswordButton')}
              theme={disabled ? 'disabledFilled' : 'filledButton'}
              disabled={disabled}
            />
          </Grid>
          <div className={sharedClasses.hrdivider} />
          <Typography variant={'body1'}>{t('confirmSignupPage.resendCodeMessage')}</Typography>
          <CustomButton theme="asLinkPrimary" title={t('forgotPassword.resendVerificationCodeButton')} rippleDisabled onClick={requestCode} />
          {resendCodeSuccessMessage &&
            codeNotReceivedClicked &&
            <Typography variant="body1" color="primary">{resendCodeSuccessMessage}</Typography>
          }
        </form>
      </Box>
    </Grid>
  );
};

export default SubmitForm;
