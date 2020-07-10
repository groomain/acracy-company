import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomButton from "../../../Button";
import { CustomPasswordField } from "../../../Inputs/CustomTextField";
import { checkLength } from '../../../../utils/services/validationChecks';
import { Typography, Grid } from "@material-ui/core";
import styles from "../styles";
import * as Scroll from "react-scroll/modules";

const PasswordForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const classes = styles();

  const Element = Scroll.Element;
  const scrollSpy = Scroll.scrollSpy;
  useEffect(() => {
    scrollSpy.update();
  }, []);

  const { changePasswordErrorMessage, changePasswordLoading } = useSelector(state => ({
    changePasswordErrorMessage: state.getIn(['MyProfile', 'changePasswordErrorMessage']),
    changePasswordLoading: state.getIn(['MyProfile', 'changePasswordLoading'])
  }));

  const { user, oldPassword, newPassword, confirmNewPassword } = values;

  const [disabledPassword, setDisabledPassword] = useState(true);

  useEffect(() => {
    if (
      checkLength(oldPassword?.trim(), 7) &&
      checkLength(newPassword?.trim(), 7) &&
      checkLength(confirmNewPassword?.trim(), 7) &&
      confirmNewPassword === newPassword
    ) {
      setDisabledPassword(false)
    } else {
      setDisabledPassword(true)
    }
  }, [user, oldPassword, newPassword, confirmNewPassword]);

  return (
    <Grid item container className={classes.container}>
      <Grid item container>
        <Element name={6} className={classes.element}>
          <Typography variant={'h1'} className={classes.cardTitle}>{t('myProfile.password')}</Typography>
          <Grid item container className={classes.card}>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <CustomPasswordField
                  name="oldPassword"
                  value={oldPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('myProfile.oldPasswordPlaceholder')}
                  label={t('myProfile.oldPassword') + '*'}
                  error={!!touched.oldPassword && !!errors.oldPassword}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <CustomPasswordField
                  name="newPassword"
                  value={newPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('myProfile.newPasswordPlaceholder')}
                  label={t('myProfile.newPassword') + '*'}
                  error={!!touched.newPassword && !!errors.newPassword}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomPasswordField
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('myProfile.confirmNewPasswordPlaceholder')}
                  label={t('myProfile.confirmNewPassword') + '*'}
                  error={!!touched.confirmNewPassword && !!errors.confirmNewPassword}
                />
              </Grid>
            </Grid>
            <Typography variant={'subtitle2'}>{changePasswordErrorMessage}</Typography>
            <CustomButton
              type='submit'
              theme={disabledPassword ? "disabledFilled" : "filledButton"}
              handleClick={() => handleSubmit({ user, oldPassword, newPassword })}
              loading={changePasswordLoading}
              title={t('myProfile.modifyPassword')}
              disabled={changePasswordLoading}
            ></CustomButton>
          </Grid>
        </Element>
      </Grid>
    </Grid>
  )
};

export default PasswordForm;