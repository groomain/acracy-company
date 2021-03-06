import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from "@material-ui/core";
import CustomTextField from "../../../Inputs/CustomTextField";
import styles from "../styles";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../../Inputs/CustomSelect";
import CustomButton from "../../../Button";
import * as Scroll from "react-scroll/modules";
import { useTranslation } from 'react-i18next';
import { checkLength } from '../../../../utils/services/validationChecks';
import areaCodes from '../../../../utils/areaCodes.json';

export const PersonalInformationsForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, initialValues, isValid }) => {
  const classes = styles();
  const { t } = useTranslation();

  const Element = Scroll.Element;
  const scrollSpy = Scroll.scrollSpy;
  useEffect(() => {
    scrollSpy.update();
  }, []);

  const { putMyProfileLoading, putMyProfileErrorMessage } = useSelector(state => ({
    putMyProfileLoading: state.getIn(['MyProfile', 'putMyProfileLoading']),
    putMyProfileErrorMessage: state.getIn(['MyProfile', 'putMyProfileErrorMessage'])
  }));

  const { firstName, lastName, email, phoneCode, phoneNumber, role, employeeId } = values;

  const [disabledPersonalInformations, setDisabledPersonalInformations] = useState(true);

  useEffect(() => {
    if (
      firstName !== initialValues?.firstName ||
      lastName !== initialValues?.lastName ||
      email !== initialValues?.email ||
      phoneCode !== initialValues?.phoneCode ||
      phoneNumber !== initialValues?.phoneNumber ||
      role !== initialValues?.role
    ) {
      setDisabledPersonalInformations(false);
    } else {
      setDisabledPersonalInformations(true);
    }
  }, [firstName, lastName, email, phoneCode, phoneNumber, role])

  return (
    <Grid item container className={classes.container}>
      <Grid item container>
        <Element name={6} className={classes.element}>
          <Typography variant={'h1'} className={classes.cardTitle}>{t('myProfile.personalInformations')}</Typography>
          <Grid item container className={classes.card} spacing={4}>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField
                  label={t('myProfile.firstName') + '*'}
                  placeholder={t('myProfile.firstName')}
                  value={firstName}
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.firstName && !!errors.firstName} />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label={t('myProfile.lastName') + '*'}
                  placeholder={t('myProfile.lastName')}
                  value={lastName}
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.lastName && !!errors.lastName} />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField
                  label={t('myProfile.professionalEmail') + '*'}
                  placeholder={t('myProfile.professionalEmail')}
                  value={email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email} />
              </Grid>
              <Grid item xs={6} className={classes.phoneBox}>
                <Typography variant={'h4'}>{t('myProfile.phoneNumber') + '*'}</Typography>
                <Grid item container spacing={2}>
                  <Grid item xs={5}>
                    <CustomSelect
                      optionsValues={areaCodes}
                      value={phoneCode}
                      name="phoneCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.phoneCode && !!errors.phoneCode} />
                  </Grid>
                  <Grid item xs={7}>
                    <CustomTextField
                      placeholder={t('myProfile.phoneNumberPlaceholder')}
                      value={phoneNumber}
                      name="phoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.phoneNumber && !!errors.phoneNumber} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField
                  label={t('myProfile.role') + '*'}
                  placeholder={t('myProfile.rolePlaceholder')}
                  value={role}
                  name="role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.role && !!errors.role} />
              </Grid>
            </Grid>
            <Typography variant={'subtitle2'}>{putMyProfileErrorMessage}</Typography>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <CustomButton
                  type='submit'
                  theme={disabledPersonalInformations ? "disabledFilled" : "filledButton"}
                  handleClick={() => handleSubmit({ employeeId, firstName, lastName, email, phoneCode, phoneNumber, role })}
                  loading={putMyProfileLoading}
                  title={t('myProfile.save')}
                  disabled={disabledPersonalInformations || !isValid}
                />
              </Grid>
            </Grid>
          </Grid>
        </Element>
      </Grid >
    </Grid >
  )
};

export default PersonalInformationsForm;
