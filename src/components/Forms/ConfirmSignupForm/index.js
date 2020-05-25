import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../Button';
import { Grid, Typography } from '@material-ui/core';
import CustomTextField from "../../Inputs/CustomTextField";
import CustomSnackBar from "../../SnackBar";
import { NavLink } from "react-router-dom";
import styles from "./styles";

const ConfirmSignupForm = (props) => {
  const classes = styles();
  const [open, setOpen] = React.useState(false);

  const { confirmSignupErrorMessage, confirmSignupLoading } = useSelector(state => ({
    confirmSignupErrorMessage: state.getIn(['app', 'confirmSignupErrorMessage']), /////////////////////////////////////////
    confirmSignupLoading: state.getIn(['app', 'confirmSignupLoading']) //////////////////////////////////////////////
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

  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.container}
    >
      <form onSubmit={handleSubmit}>
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

        {/* <NavLink to={'/password'} className={classes.navLink}>{t('forgotPasswordButton')}</NavLink> */}
        <Grid container direction={'row'} justify={'flex-end'}>
          <CustomButton
            type="submit"
            loading={confirmSignupLoading}
            title={t('confirmSignupPage.buttonTitle')}
            disabled={false}
          />
        </Grid>
      </form>
      {confirmSignupErrorMessage && <CustomSnackBar message={confirmSignupErrorMessage} open={open} setOpen={setOpen} />}
    </Grid>
  );
};

export default ConfirmSignupForm;
