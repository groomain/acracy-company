import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../Button';
import { Grid, Typography } from '@material-ui/core';
import CustomTextField from "../../Inputs/CustomTextField";
import CustomSnackBar from "../../SnackBar";
import { NavLink } from "react-router-dom";
import styles from "./styles";

const ConfirmSignupForm = (props) => {
  const { t } = useTranslation();
  const classes = styles();

  const [open, setOpen] = React.useState(false);

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

  const checkLength = (text) => {
    if (text?.length >= 6) {
      return true
    }
    return false
  };

  useEffect(() => {
    if (checkLength(code)) {
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
      {/* <NavLink to={'/password'} className={classes.navLink}>{t('forgotPasswordButton')}</NavLink> */}
    </form>
  );
};

export default ConfirmSignupForm;
