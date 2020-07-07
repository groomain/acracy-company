import React from 'react';
import { useTranslation } from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import countries from "../../../utils/countries.json";

export const Form2 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const classes = styles();

  const { address, zipCode, city, country } = values;

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Siège social</Typography>
      <Grid item container direction={'column'} className={classes.container}>
        <CustomTextField className={classes.textfield}
          label={'Adresse*'}
          placeholder={'Adresse'}
          name={'address'}
          value={address}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.address && !!errors.address}
        />
        <Grid item container direction={'row'}>
          <CustomTextField className={classes.zipCode}
            label={'Code postal*'}
            placeholder={'Code Postal'}
            name={'zipCode'}
            value={zipCode}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.zipCode && !!errors.zipCode}
          />
          <CustomTextField className={classes.city}
            label={'Ville*'}
            placeholder={'Ville'}
            name={'city'}
            value={city}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.city && !!errors.city}
          />
        </Grid>
        <CustomSelect className={classes.select}
          label={'Pays*'}
          optionsValues={countries}
          placeholder={'Pays'}
          name={'country'}
          value={country}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.country && !!errors.country}
        />
        <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
          disabled={address === "" || zipCode === "" || city === "" || country === ""}
          handleClick={() => handleSubmit({ address, zipCode, city, country })}
        />
      </Grid>
    </Grid>
  );
};
export default Form2;
