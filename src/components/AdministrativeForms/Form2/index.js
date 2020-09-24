import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import countries from "../../../utils/countries.json";
import { checkMissingInfosForm2 } from '../../../pages/AdministrativePage/reducer';
import { isNullOrEmpty } from "../isNullOrEmpty";
import { getIn } from "formik";

export const Form2 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, initialValues }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { administrativeProfile } = values;
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isNullOrEmpty(administrativeProfile.headOffice?.address?.trim()) && !isNullOrEmpty(administrativeProfile.headOffice?.zipCode) && !isNullOrEmpty(administrativeProfile.headOffice?.city?.trim()) && !isNullOrEmpty(administrativeProfile.headOffice?.country?.trim())) {
      dispatch(checkMissingInfosForm2(true))
    } else {
      dispatch(checkMissingInfosForm2(false))
    }
  }, [administrativeProfile.headOffice]);

  useEffect(() => {
    if (
      administrativeProfile.headOffice.address !== initialValues?.administrativeProfile.headOffice.address ||
      administrativeProfile.headOffice.zipCode !== initialValues?.administrativeProfile.headOffice.zipCode ||
      administrativeProfile.headOffice.city !== initialValues?.administrativeProfile.headOffice.city ||
      administrativeProfile.headOffice.country !== initialValues?.administrativeProfile?.headOffice.country
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [administrativeProfile])

  const { companyUpdateLoading } = useSelector(state => ({
    companyUpdateLoading: state.getIn(['Administrative', 'companyUpdateLoading']),
  }));

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Siège social</Typography>
      <Grid item container direction={'column'} className={classes.container}>
        <CustomTextField className={classes.textfield}
          label={'Adresse*'}
          placeholder={'Adresse'}
          name={'administrativeProfile.headOffice.address'}
          value={administrativeProfile.headOffice.address}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!getIn(touched, 'administrativeProfile.headOffice.address') && !!getIn(errors, 'administrativeProfile.headOffice.address')}
        />
        <Grid item container direction={'row'}>
          <CustomTextField className={classes.zipCode}
            label={'Code postal*'}
            placeholder={'Code Postal'}
            name={'administrativeProfile.headOffice.zipCode'}
            value={administrativeProfile.headOffice.zipCode}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.headOffice.zipCode') && !!getIn(errors, 'administrativeProfile.headOffice.zipCode')}
          />
          <CustomTextField className={classes.city}
            label={'Ville*'}
            placeholder={'Ville'}
            name={'administrativeProfile.headOffice.city'}
            value={administrativeProfile.headOffice.city}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.headOffice.city') && !!getIn(errors, 'administrativeProfile.headOffice.city')}
          />
        </Grid>
        <Grid item md={7}>
          <CustomSelect className={classes.select}
            label={'Pays*'}
            optionsValues={countries}
            placeholder={'Pays'}
            name={'administrativeProfile.headOffice.country'}
            value={administrativeProfile.headOffice.country}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.headOffice.country') && !!getIn(errors, 'administrativeProfile.headOffice.country')}
          />
        </Grid>
        <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
          disabled={isNullOrEmpty(administrativeProfile.headOffice.address) || isNullOrEmpty(administrativeProfile.headOffice.zipCode) || isNullOrEmpty(administrativeProfile.headOffice.city) || isNullOrEmpty(administrativeProfile.headOffice.country) || disabled}
          handleClick={() => handleSubmit({
            address: administrativeProfile.headOffice.address,
            zipCode: administrativeProfile.headOffice.zipCode,
            city: administrativeProfile.headOffice.city,
            country: administrativeProfile.headOffice.country
          })}
          loading={companyUpdateLoading}
        />
      </Grid>
    </Grid>
  );
};
export default Form2;
