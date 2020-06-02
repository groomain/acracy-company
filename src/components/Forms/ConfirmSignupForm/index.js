import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../Button';
import { Grid } from '@material-ui/core';
import CustomTextField from "../../Inputs/CustomTextField";

import { checkLength } from '../../../utils/validationChecks';

const ConfirmSignupForm = (props) => {
  const { t } = useTranslation();

  const { confirmSignupLoading } = useSelector(state => ({
    confirmSignupLoading: state.getIn(['app', 'confirmSignupLoading'])
  }));

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { code, email } = values;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (checkLength(code, 5)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [code, email]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems='center'>
        <CustomTextField
          id="code"
          type='text'
          label={t('confirmSignupPage.label')}
          placeholder={t('confirmSignupPage.placeholder')}
          value={code}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.code && !!errors.code}
        />

        <CustomButton
          type="submit"
          loading={confirmSignupLoading}
          title={t('confirmSignupPage.buttonTitle')}
          theme={disabled ? 'disabledOutlined' : 'primaryButton'}
          disabled={disabled}
          style={{ margin: '1rem 0 0 2rem' }}
        />
      </Grid>
    </form>
  );
};

export default ConfirmSignupForm;