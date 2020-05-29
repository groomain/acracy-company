import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../Button/';
import { Grid, Typography } from '@material-ui/core/';
import CustomTextField, { CustomPasswordField } from "../../Inputs/CustomTextField";

const SubmitForm = (props) => {
  const { t } = useTranslation();
  const { submitPasswordErrorMessage, submitPasswordLoading } = useSelector(state => ({
    submitPasswordErrorMessage: state.getIn(['app', 'submitPasswordErrorMessage']),
    submitPasswordLoading: state.getIn(['app', 'submitPasswordLoading'])
  }));
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { code, password, confirmPassword } = values;

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <CustomTextField
        value={code}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('code')}
        error={!!touched.code && !!errors.code}
        helperText={touched.code && errors.code ? t(errors.code) : ''}
      />
      <CustomPasswordField
        value={password}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('password')}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password ? t(errors.password) : ''}
      />
      <CustomPasswordField
        value={confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('confirmPassword')}
        error={!!touched.confirmPassword && !!errors.confirmPassword}
        helperText={touched.confirmPassword && errors.confirmPassword ? t(errors.confirmPassword) : ''}
      />
      <CustomButton
        type="submit"
        handleClick={() => { handleSubmit({ code, password, confirmPassword }) }}
        loading={submitPasswordLoading}
        title={t('submitNewPasswordButton')}
      />
      <Typography variant={'subtitle2'}>{submitPasswordErrorMessage}</Typography>
    </Grid>
  );
};

export default SubmitForm;
