import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography } from '@material-ui/core';

import { CustomButton } from '../Button';
import CustomTextField from '../Inputs/CustomTextField';
import styles from '../../utils/styles';

const RequestForm = (props) => {
  const { t } = useTranslation();
  const { requestCodeErrorMessage, requestCodeLoading } = useSelector(state => ({
    requestCodeErrorMessage: state.getIn(['app', 'requestCodeErrorMessage']),
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

  console.log(errors);
  return (
    <Grid
      container
      direction="column"
      justify="center"
    >
      <Typography variant="h1" className={classes.titleSignIn}>{t('forgotPassword.forgotPasswordPageTitle')}</Typography>
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
            helperText={touched.email && errors.email ? t(errors.email) : ''}
          />
          <Grid container justify='flex-end'>
            <CustomButton
              type="submit"
              loading={requestCodeLoading}
              title={t('buttonTitles.validate')}
              theme={"filledButton"}
            />
          </Grid>
        </form>
        <Typography variant={'subtitle2'}>{requestCodeErrorMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default RequestForm;
