import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CustomButton } from '../Button';
import CustomTextField from '../Inputs/CustomTextField';

const RequestForm = (props) => {
  const { t } = useTranslation();
  const { requestCodeErrorMessage, requestCodeLoading } = useSelector(state => ({
    requestCodeErrorMessage: state.getIn(['app', 'requestCodeErrorMessage']),
    requestCodeLoading: state.getIn(['app', 'requestCodeLoading'])
  }));
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
      alignItems="center"
    >
      <CustomTextField
        id="Email"
        name="email"
        value={email}
        onBlur={handleBlur}
        onChange={handleChange}
        label={t('email')}
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email ? t(errors.email) : ''}
      />
      <CustomButton
        type="submit"
        handleClick={() => { handleSubmit({ email }); }}
        loading={requestCodeLoading}
        title={t('requestCodeButton')}
      />
      <Typography variant={'subtitle2'}>{requestCodeErrorMessage}</Typography>
    </Grid>
  );
};

export default RequestForm;
