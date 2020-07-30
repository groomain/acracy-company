import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import areaCodes from "../../../utils/areaCodes.json";
import { checkMissingInfosForm4 } from '../../../pages/AdministrativePage/reducer';
import { getPhonePrefixCode } from "../../../utils/services/format.js";
import {isNullOrEmpty} from "../isNullOrEmpty";

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
      <Grid item container direction={'row'}>
        <Grid item container direction={'column'} className={classes.columnContainer}>
          <CustomTextField className={classes.textfield}
            label={'Prénom*'}
            placeholder={'Prénom'}
            name={'administrativeProfile.billing.firstName'}
            value={administrativeProfile.billing.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.firstName && !!errors.firstName}
          />
          <CustomTextField className={classes.textfield}
            label={'Email*'}
            placeholder={'Email'}
            name={'administrativeProfile.billing.email'}
            value={administrativeProfile.billing.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.email && !!errors.email}
          />
          <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
            disabled={isNullOrEmpty(administrativeProfile.billing.firstName) || isNullOrEmpty(administrativeProfile.billing.lastName) || isNullOrEmpty(administrativeProfile.billing.email) || isNullOrEmpty(administrativeProfile.billing.phone.code) || isNullOrEmpty(administrativeProfile.billing.phone.number)}
            handleClick={() => handleSubmit({ firstName: administrativeProfile.billing.firstName, lastName: administrativeProfile.billing.lastName, email: administrativeProfile.billing.email, code: getPhonePrefixCode(administrativeProfile.billing.phone.code), number: administrativeProfile.billing.phone.number })}
                        loading={companyUpdateLoading}
          />
        </Grid>
        <Grid item container direction={'column'} className={classes.columnContainer}>
          <CustomTextField className={classes.textfield}
            label={'Nom*'}
            placeholder={'Nom'}
            name={'administrativeProfile.billing.lastName'}
            value={administrativeProfile.billing.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.lastName && !!errors.lastName}
          />
          <Grid item container direction={'row'}>
            <Grid container item direction='column' className={classes.phoneMargin}>
              <Typography variant={'body1'}>{t('signup.phoneNumber') + '*'}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <CustomSelect
                    name='administrativeProfile.billing.phone.code'
                    optionsValues={areaCodes}
                    value={administrativeProfile.billing.phone.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                  />
                </Grid>
                <Grid item xs={7}>
                  <CustomTextField
                    name="administrativeProfile.billing.phone.number"
                    type="text"
                    value={administrativeProfile.billing.phone.number}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t('signup.phoneNumberPlaceholder')}
                    error={!!touched.number && !!errors.number}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Form4;
