import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Grid, Box } from "@material-ui/core";
import { checkMissingInfosForm4 } from '../../../pages/AdministrativePage/reducer';
import { getIn } from "formik";
import { getPhonePrefixCode } from "../../../utils/services/format.js";
import areaCodes from "../../../utils/areaCodes.json";
import { isNullOrEmpty } from "../isNullOrEmpty";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomSelect from "../../Inputs/CustomSelect";
import CustomButton from "../../Button";
import styles from "../styles";

export const Form4 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { administrativeProfile } = values;

  useEffect(() => {
    if (!isNullOrEmpty(administrativeProfile?.billing?.lastName?.trim()) && !isNullOrEmpty(administrativeProfile?.billing?.email) && !isNullOrEmpty(administrativeProfile?.billing?.phone?.code) && administrativeProfile?.billing?.phone?.number > 0) {
      dispatch(checkMissingInfosForm4(true))
    } else {
      dispatch(checkMissingInfosForm4(false))
    }
  }, [administrativeProfile.billing]);

  const { companyUpdateLoading } = useSelector(state => ({
    companyUpdateLoading: state.getIn(['Administrative', 'companyUpdateLoading']),
  }));

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Coordonnées de la personne en charge de
                la facturation</Typography>
      <Grid container direction="row" spacing={4} className={classes.card}>
        <Grid item md={6}>
          <CustomTextField
            label={'Prénom*'}
            placeholder={'Prénom'}
            name={'administrativeProfile.billing.firstName'}
            value={administrativeProfile.billing.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.billing.firstName') && !!getIn(errors, 'administrativeProfile.billing.firstName')}
          />
        </Grid>
        <Grid item md={6}>
          <CustomTextField
            label={'Nom*'}
            placeholder={'Nom'}
            name={'administrativeProfile.billing.lastName'}
            value={administrativeProfile.billing.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.billing.lastName') && !!getIn(errors, 'administrativeProfile.billing.lastName')}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item md={6}>
            <CustomTextField
              label={'Email*'}
              placeholder={'Email'}
              name={'administrativeProfile.billing.email'}
              value={administrativeProfile.billing.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!getIn(touched, 'administrativeProfile.billing.email') && !!getIn(errors, 'administrativeProfile.billing.email')}
            />
          </Grid>
          <Grid item container direction={'row'} md={6} style={{ paddingLeft: 20 }}>
            <Grid item>
              <Typography variant={'h4'}>{t('signup.phoneNumber') + '*'}</Typography>
            </Grid>
            <Grid item container spacing={4} className={classes.phoneMargin}>
              <Grid item md={5}>
                <CustomSelect
                  name='administrativeProfile.billing.phone.code'
                  optionsValues={areaCodes}
                  value={administrativeProfile.billing.phone.code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!getIn(touched, 'administrativeProfile.billing.phone.code') && !!getIn(errors, 'administrativeProfile.billing.phone.code')}
                />
              </Grid>
              <Grid item md={7}>
                <CustomTextField
                  name="administrativeProfile.billing.phone.number"
                  type="text"
                  value={administrativeProfile.billing.phone.number}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t('signup.phoneNumberPlaceholder')}
                  error={!!getIn(touched, 'administrativeProfile.billing.phone.number') && !!getIn(errors, 'administrativeProfile.billing.phone.number')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" className={classes.card}>
          <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
            disabled={isNullOrEmpty(administrativeProfile.billing.firstName) || isNullOrEmpty(administrativeProfile.billing.lastName) || isNullOrEmpty(administrativeProfile.billing.email) || isNullOrEmpty(administrativeProfile.billing.phone.code) || isNullOrEmpty(administrativeProfile.billing.phone.number)}
            handleClick={() => handleSubmit({ firstName: administrativeProfile.billing.firstName, lastName: administrativeProfile.billing.lastName, email: administrativeProfile.billing.email, code: getPhonePrefixCode(administrativeProfile.billing.phone.code), number: administrativeProfile.billing.phone.number })}
            loading={companyUpdateLoading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Form4;
