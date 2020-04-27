import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { CustomButton } from '../Button';
import CustomTextField from '../CustomTextField';


const FirstLoginForm = (props) => {
  const { t } = useTranslation();
  const { updateUserErrorMessage, updateUserLoading } = useSelector(state => ({
    updateUserErrorMessage: state.getIn(['app', 'loginErrorMessage']),
    updateUserLoading: state.getIn(['app', 'updateUserLoading'])
  }));
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { firstName, lastName } = values;

  return (
    <>
      <CustomTextField
        id="firstName"
        value={firstName}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('firstName')}
        error={!!touched.firstName && !!errors.firstName}
        helperText={touched.firstName && errors.firstName ? t(errors.firstName) : ''}
      />
      <CustomTextField
        id="lastName"
        value={lastName}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('lastName')}
        error={!!touched.lastName && !!errors.lastName}
        helperText={touched.lastName && errors.lastName ? t(errors.lastName) : ''}
      />
      <CustomButton
        type="submit"
        handleClick={handleSubmit}
        loading={updateUserLoading}
        title={t('updateUserSubmit')}
      />
      <Typography variant="subtitle2">{updateUserErrorMessage}</Typography>
    </>
  );
};

export default FirstLoginForm;
