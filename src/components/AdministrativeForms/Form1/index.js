import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSwitch from "../../Switch";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import { checkMissingInfosForm1 } from '../../../pages/AdministrativePage/reducer';

export const Form1 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { legalForm, socialReason, siret, shareCapital, webSite, cityOfRcsRegistration, intraCommunityVAT, vatNumber } = values;
  const [switchTVA, setSwitchTVA] = useState(vatNumber != "" ? true : false);

  useEffect(() => {
    if (legalForm.trim() != "" && socialReason.trim() != "" && siret > 0 && shareCapital > 0) {
      dispatch(checkMissingInfosForm1(true))
    }
  }, [legalForm, socialReason, siret, shareCapital]);

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Informations générales</Typography>
      <Grid item container direction={'row'}>
        <Grid item container direction={'column'} xs={6} className={classes.columnContainer}>
          <CustomSelect className={classes.textfield}
            label={'Forme juridique*'}
            optionsValues={['SA Société Anonyme', 'SAS Société par Actions Simplifiées', 'EURL Entreprise Unipersonnelle à Responsabilité Limitée', 'EIRL Entrepreneur Individuel à Responsabilité Limitée', 'EI Entreprise Individuelle', 'AE Auto-Entrepreneur', 'SASU Société par Actions Simplifiée Unipersonnelle', 'SAU Société Anonyme Unipersonnelle', 'GIE Groupement d’Intérêt Économique', 'SARL Société Anonyme à Responsabilité Limitée']}
            placeholder={'Forme juridique'}
            name={'legalForm'}
            value={legalForm}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.legalForm && !!errors.legalForm}
          />
          <CustomTextField className={classes.textfield}
            label={'SIRET*'}
            placeholder={'SIRET'}
            value={siret}
            name={'siret'}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.siret && !!errors.siret}
          />
          <CustomTextField className={classes.textfield}
            label={'Site web'}
            placeholder={'Site web'}
            name={'webSite'}
            value={webSite}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.webSite && !!errors.webSite}
          />
          <Grid item container direction={'row'} className={classes.switch}>
            <CustomSwitch switchSize={'small'} checked={switchTVA} setChecked={setSwitchTVA}
              name={'intraCommunityVAT'}
              value={intraCommunityVAT}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.intraCommunityVAT && !!errors.intraCommunityVAT} />
            <Typography variant={'body1'} className={classes.tva}>Je suis soumis à la TVA
                            intracommunautaire</Typography>
          </Grid>
          {switchTVA &&
            <CustomTextField className={classes.textfield}
              label={'Numéro de TVA'}
              placeholder={'Numéro de TVA'}
              name={'vatNumber'}
              value={vatNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.vatNumber && !!errors.vatNumber}
            />
          }
          <CustomButton title={'Sauvegarder'} theme={'filledButton'}
            className={classes.saveButton}
            disabled={legalForm === "" || socialReason === "" || siret === "" || shareCapital === ""}
            handleClick={() => handleSubmit({ legalForm, socialReason, siret, shareCapital, webSite, cityOfRcsRegistration, intraCommunityVAT, vatNumber })}
          />
        </Grid>
        <Grid item container direction={'column'} xs={6} className={classes.columnContainer}>
          <CustomTextField className={classes.textfield}
            label={'Raison sociale*'}
            placeholder={'Raison sociale'}
            name={'socialReason'}
            value={socialReason}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.socialReason && !!errors.socialReason}
          />
          <CustomTextField className={classes.textfield}
            label={'Capital social (€)*'}
            placeholder={'Capital social (€)'}
            name={'shareCapital'}
            value={shareCapital}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.shareCapital && !!errors.shareCapital}
          />
          <CustomTextField className={classes.textfield}
            label={'Ville d\'immatriculation au RCS'}
            placeholder={'Ville d\'immatriculation au RCS'}
            name={'cityOfRcsRegistration'}
            value={cityOfRcsRegistration}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.cityOfRcsRegistration && !!errors.cityOfRcsRegistration}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Form1;