import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
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

export const Form4 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { firstName, lastName, email, phonePrefix, phoneNumber } = values;

  useEffect(() => {
    if (lastName.trim() != "" && email != "" && phonePrefix != "" && phoneNumber > 0) {
      dispatch(checkMissingInfosForm4(true))
    }
  }, [lastName, email, phonePrefix, phoneNumber]);

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Coordonnées de la personne en charge de
                la facturation</Typography>
      <Grid item container direction={'row'}>
        <Grid item container direction={'column'} className={classes.columnContainer}>
          <CustomTextField className={classes.textfield}
            label={'Prénom*'}
            placeholder={'Prénom'}
            name={'firstName'}
            value={firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.firstName && !!errors.firstName}
          />
          <CustomTextField className={classes.textfield}
            label={'Email*'}
            placeholder={'Email'}
            name={'email'}
            value={email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.email && !!errors.email}
          />
          <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
            disabled={firstName === "" || lastName === "" || email === "" || phonePrefix === "" || phoneNumber === ""}
            handleClick={() => handleSubmit({ firstName, lastName, email, phonePrefix: getPhonePrefixCode(phonePrefix), phoneNumber })} />
        </Grid>
        <Grid item container direction={'column'} className={classes.columnContainer}>
          <CustomTextField className={classes.textfield}
            label={'Nom*'}
            placeholder={'Nom'}
            name={'lastName'}
            value={lastName}
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
                    name='phonePrefix'
                    optionsValues={areaCodes}
                    value={phonePrefix}
                    onBlur={handleBlur('phonePrefix')}
                    onChange={handleChange}
                    error={!!touched.phonePrefix && !!errors.phonePrefix}
                  />
                </Grid>
                <Grid item xs={7}>
                  <CustomTextField
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t('signup.phoneNumberPlaceholder')}
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
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