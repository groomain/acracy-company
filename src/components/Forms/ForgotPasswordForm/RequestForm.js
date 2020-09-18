import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';

import styles from '../../../utils/styles';
import { CustomButton } from '../../Button';
import CustomTextField from '../../Inputs/CustomTextField';

import { checkLength } from '../../../utils/services/validationChecks';

const RequestForm = (props) => {
  const { t } = useTranslation();
  const { requestCodeLoading } = useSelector(state => ({
    requestCodeLoading: state.getIn(['app', 'requestCodeLoading'])
  }));

  const classes = styles();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = props;
  const { email } = values;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (checkLength(email, 0)) {
      setDisabled(false);
    } else {
      setDisabled(true)
    }
  }, [email])

  return (
    <Grid
      container
      direction="column"
      justify="center"
    >
      <Typography variant="h1" className={classes.titleForgotPassword}>{t('forgotPassword.forgotPasswordPageTitle')}</Typography>
      <Typography variant="body1">{t('forgotPassword.forgotPasswordSubtitle')}</Typography>

      <Grid className={classes.container}>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            id="Email"
            name="email"
            value={email}
            onBlur={handleBlur}
            onChange={handleChange}
            label={t('email') + '*'}
            placeholder={t('yourEmail')}
            error={!!touched.email && !!errors.email}
          />
          <Grid container justify='flex-end' style={{marginTop: 19}}>
            <CustomButton
              type="submit"
              loading={requestCodeLoading}
              title={t('buttonTitles.validate')}
              theme={disabled ? "disabledFilled" : "filledButton"}
              disabled={disabled}
            />
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RequestForm;
