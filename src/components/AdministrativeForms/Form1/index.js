import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from '../styles';
import CustomTextField from '../../Inputs/CustomTextField';
import CustomButton from '../../Button';
import CustomSwitch from '../../Switch';
import CustomSelect from '../../Inputs/CustomSelectAdministrative';
import { checkMissingInfosForm1 } from '../../../pages/AdministrativePage/reducer';

export const Form1 = ({
  values, errors, touched, handleBlur, handleChange, handleSubmit
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { administrativeProfile, webSite } = values;
  const [switchTVA, setSwitchTVA] = useState(administrativeProfile.vatNumber !== '' && administrativeProfile.vatNumber !== null);

  useEffect(() => {
    if (administrativeProfile.legalForm?.trim() !== '' && administrativeProfile.socialReason?.trim() !== '' && administrativeProfile.siret > 0 && administrativeProfile.shareCapital > 0) {
      dispatch(checkMissingInfosForm1(true));
    }
  }, [administrativeProfile.legalForm, administrativeProfile.socialReason, administrativeProfile.siret, administrativeProfile.shareCapital]);


  return (
    <Grid item container direction="column" className={classes.card}>
      <Typography variant="h2" className={classes.cardTitle}>Informations générales</Typography>
      <Grid item container direction="row">
        <Grid item container direction="column" xs={6} className={classes.columnContainer}>
          <CustomSelect
            className={classes.textfield}
            label="Forme juridique*"
            optionsValues={[
              {
                value: 'SA',
                label: 'SA Société Anonyme'
              },
              {
                value: 'SAS',
                label: 'SAS Société par Actions Simplifiées'
              },
              {
                value: 'EURL',
                label: 'EURL Entreprise Unipersonnelle à Responsabilité Limitée'
              },
              {
                value: 'EIRL',
                label: 'EIRL Entrepreneur Individuel à Responsabilité Limitée'
              },
              {
                value: 'EI',
                label: 'EI Entreprise Individuelle'
              },
              {
                value: 'AE',
                label: 'AE Auto-Entrepreneur'
              },
              {
                value: 'SASU',
                label: 'SASU Société par Actions Simplifiée Unipersonnelle'
              },
              {
                value: 'SAU',
                label: 'SAU Société Anonyme Unipersonnelle'
              },
              {
                value: 'GIE',
                label: 'GIE Groupement d’Intérêt Économique'
              },
              {
                value: 'SARL',
                label: 'SARL Société Anonyme à Responsabilité Limitée'
              },
            ]}
            placeholder="Forme juridique"
            name="administrativeProfile.legalForm"
            value={administrativeProfile.legalForm}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.legalForm && !!errors.legalForm}
          />
          <CustomTextField
            className={classes.textfield}
            label="SIRET*"
            placeholder="SIRET"
            value={administrativeProfile.siret}
            name="administrativeProfile.siret"
            type="number"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.siret && !!errors.siret}
          />
          <CustomTextField
            className={classes.textfield}
            label="Site web"
            placeholder="Site web"
            name="webSite"
            value={webSite}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.webSite && !!errors.webSite}
          />
          <Grid item container direction="row" className={classes.switch}>
            <CustomSwitch
              switchSize="small"
              checked={switchTVA}
              setChecked={setSwitchTVA}
              name="administrativeProfile.intraCommunityVAT"
              value={administrativeProfile.intraCommunityVAT}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.intraCommunityVAT && !!errors.intraCommunityVAT}
            />
            <Typography variant="body1" className={classes.tva}>
Je suis soumis à la TVA
                            intracommunautaire
            </Typography>
          </Grid>
          {switchTVA
            && (
            <CustomTextField
              className={classes.textfield}
              label="Numéro de TVA"
              placeholder="Numéro de TVA"
              name="administrativeProfile.vatNumber"
              value={administrativeProfile.vatNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.vatNumber && !!errors.vatNumber}
            />
            )
          }
          <CustomButton
            title="Sauvegarder"
            theme="filledButton"
            className={classes.saveButton}
            disabled={administrativeProfile.legalForm === '' || administrativeProfile.socialReason === '' || administrativeProfile.siret === '' || administrativeProfile.shareCapital === ''}
            handleClick={() => handleSubmit({ administrativeProfile, webSite })}
          />
        </Grid>
        <Grid item container direction="column" xs={6} className={classes.columnContainer}>
          <CustomTextField
            className={classes.textfield}
            label="Raison sociale*"
            placeholder="Raison sociale"
            name="administrativeProfile.socialReason"
            value={administrativeProfile.socialReason}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.socialReason && !!errors.socialReason}
          />
          <CustomTextField
            className={classes.textfield}
            label="Capital social (€)*"
            placeholder="Capital social (€)"
            name="administrativeProfile.shareCapital"
            type="number"
            value={administrativeProfile.shareCapital}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.shareCapital && !!errors.shareCapital}
          />
          <CustomTextField
            className={classes.textfield}
            label={'Ville d\'immatriculation au RCS'}
            placeholder={'Ville d\'immatriculation au RCS'}
            name="administrativeProfile.cityOfRcsRegistration"
            value={administrativeProfile.cityOfRcsRegistration}
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
