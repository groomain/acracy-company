import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import countries from "../../../utils/countries.json";
import { checkMissingInfosForm2 } from '../../../pages/AdministrativePage/reducer';

export const Form2 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { administrativeProfile } = values;

  useEffect(() => {
    if (administrativeProfile.headOffice.address.trim() != "" && administrativeProfile.headOffice.zipCode != "" && administrativeProfile.headOffice.city.trim() != "" && administrativeProfile.headOffice.country.trim() != "") {
      dispatch(checkMissingInfosForm2(true))
    }
  }, [administrativeProfile.headOffice]);

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
          error={!!touched.address && !!errors.address}
        />
        <Grid item container direction={'row'}>
          <CustomTextField className={classes.zipCode}
            label={'Code postal*'}
            placeholder={'Code Postal'}
            name={'administrativeProfile.headOffice.zipCode'}
            value={administrativeProfile.headOffice.zipCode}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.zipCode && !!errors.zipCode}
          />
          <CustomTextField className={classes.city}
            label={'Ville*'}
            placeholder={'Ville'}
            name={'administrativeProfile.headOffice.city'}
            value={administrativeProfile.headOffice.city}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.city && !!errors.city}
          />
        </Grid>
        <CustomSelect className={classes.select}
          label={'Pays*'}
          optionsValues={countries}
          placeholder={'Pays'}
          name={'administrativeProfile.headOffice.country'}
          value={administrativeProfile.headOffice.country}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.country && !!errors.country}
        />
        <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
          disabled={administrativeProfile.headOffice.address === "" || administrativeProfile.headOffice.zipCode === "" || administrativeProfile.headOffice.city === "" || administrativeProfile.headOffice.country === ""}
          handleClick={() => handleSubmit({
            address: administrativeProfile.headOffice.address,
            zipCode: administrativeProfile.headOffice.zipCode,
            city: administrativeProfile.headOffice.city,
            country: administrativeProfile.headOffice.country })}
        />
      </Grid>
    </Grid>
  );
};
export default Form2;
