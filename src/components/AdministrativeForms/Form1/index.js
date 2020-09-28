import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Box } from '@material-ui/core';
import { getIn } from "formik";
import { checkMissingInfosForm1, putCompanyLaunched } from '../../../pages/AdministrativePage/reducer';
import { isNullOrEmpty } from "../isNullOrEmpty";
import CustomTextField from '../../Inputs/CustomTextField';
import CustomSelect from '../../Inputs/CustomSelectAdministrative';
import CustomSwitch from '../../Switch';
import CustomButton from '../../Button';
//
import { handleNumberInput } from '../../../utils/services/format';

import styles from '../styles';

export const Form1 = ({ values, errors, touched, handleBlur, handleChange, companyId, initialValues }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { administrativeProfile, webSite } = values;
  const [switchTVA, setSwitchTVA] = useState(administrativeProfile?.intraCommunityVAT);
  const [disabled, setDisabled] = useState(true);

  const legalFormValues = [
    { value: 'SA', label: 'SA Société Anonyme' },
    { value: 'SAS', label: 'SAS Société par Actions Simplifiées' },
    { value: 'EURL', label: 'EURL Entreprise Unipersonnelle à Responsabilité Limitée' },
    { value: 'EIRL', label: 'EIRL Entrepreneur Individuel à Responsabilité Limitée' },
    { value: 'EI', label: 'EI Entreprise Individuelle' },
    { value: 'AE', label: 'AE Auto-Entrepreneur' },
    { value: 'SASU', label: 'SASU Société par Actions Simplifiée Unipersonnelle' },
    { value: 'SAU', label: 'SAU Société Anonyme Unipersonnelle' },
    { value: 'GIE', label: 'GIE Groupement d’Intérêt Économique' },
    { value: 'SARL', label: 'SARL Société Anonyme à Responsabilité Limitée' }
  ];

  useEffect(() => {
    if (!isNullOrEmpty(administrativeProfile.legalForm?.trim()) && !isNullOrEmpty(administrativeProfile.socialReason?.trim()) && !isNullOrEmpty(administrativeProfile.siret?.trim()) && administrativeProfile.shareCapital > 0) {
      dispatch(checkMissingInfosForm1(true));
    } else {
      dispatch(checkMissingInfosForm1(false));
    }
  }, [administrativeProfile.legalForm, administrativeProfile.socialReason, administrativeProfile.siret, administrativeProfile.shareCapital]);

  const { companyUpdateLoading } = useSelector(state => ({
    companyUpdateLoading: state.getIn(['Administrative', 'companyUpdateLoading']),
  }));

  const handleNumberField = (e, limit) => {
    const numberResult = handleNumberInput(e, limit);
    handleChange(numberResult);
  };

  const handleSubmit = (payload) => {
    dispatch(putCompanyLaunched({ ...payload, companyId }))
  };

  useEffect(() => {
    if (
      administrativeProfile.legalForm !== initialValues?.administrativeProfile.legalForm ||
      administrativeProfile.socialReason !== initialValues?.administrativeProfile.socialReason ||
      administrativeProfile.siret !== initialValues?.administrativeProfile.siret ||
      parseFloat(administrativeProfile.shareCapital) !== initialValues?.administrativeProfile.shareCapital ||
      (switchTVA && administrativeProfile.vatNumber !== initialValues?.administrativeProfile?.vatNumber) ||
      administrativeProfile.intraCommunityVAT !== initialValues?.administrativeProfile?.intraCommunityVAT ||
      administrativeProfile.cityOfRcsRegistration !== initialValues?.administrativeProfile?.cityOfRcsRegistration ||
      webSite !== initialValues?.webSite
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [administrativeProfile, webSite])

  return (
    <Grid item container direction="row" className={classes.card}>
      <Typography variant="h2" className={classes.cardTitle}>Informations générales</Typography>
      <Grid container direction="row" spacing={4} className={classes.card}>
        <Grid item md={6}>
          <CustomSelect
            label="Forme juridique*"
            optionsValues={legalFormValues}
            placeholder="Forme juridique"
            name="administrativeProfile.legalForm"
            value={administrativeProfile.legalForm}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.legalForm') && !!getIn(errors, 'administrativeProfile.legalForm')}
          />
        </Grid>
        <Grid item md={6}>
          <CustomTextField
            label="Raison sociale*"
            placeholder="Raison sociale"
            name="administrativeProfile.socialReason"
            value={administrativeProfile.socialReason}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.socialReason') && !!getIn(errors, 'administrativeProfile.socialReason')}
          />
        </Grid>
        <Grid item md={6}>
          <CustomTextField
            label="SIRET*"
            placeholder="SIRET"
            value={administrativeProfile.siret}
            name="administrativeProfile.siret"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.siret') && !!getIn(errors, 'administrativeProfile.siret')}
          />
        </Grid>
        <Grid item md={6}>
          <CustomTextField
            label="Capital social (€)*"
            placeholder="Capital social (€)"
            name="administrativeProfile.shareCapital"
            value={administrativeProfile.shareCapital}
            onBlur={handleBlur}
            onChange={e => handleNumberField(e, 3)} // Substing = numbers included : pass 3 for 2 decimals
            error={!!getIn(touched, 'administrativeProfile.shareCapital') && !!getIn(errors, 'administrativeProfile.shareCapital')}
          />
        </Grid>
        <Grid item md={6}>
          <CustomTextField
            label="Site web"
            placeholder="Site web"
            name="webSite"
            value={webSite}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.webSite && !!errors.webSite}
          />
        </Grid>
        <Grid item md={6}>
          <CustomTextField
            label={'Ville d\'immatriculation au RCS'}
            placeholder={'Ville d\'immatriculation au RCS'}
            name="administrativeProfile.cityOfRcsRegistration"
            value={administrativeProfile.cityOfRcsRegistration}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.cityOfRcsRegistration') && !!getIn(errors, 'administrativeProfile.cityOfRcsRegistration')}
          />
        </Grid>
        <Grid item container direction="row" className={classes.switch}>
          <CustomSwitch
            switchSize="small"
            checked={switchTVA}
            setChecked={setSwitchTVA}
            name="administrativeProfile.intraCommunityVAT"
            value={administrativeProfile.intraCommunityVAT}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.intraCommunityVAT') && !!getIn(errors, 'administrativeProfile.intraCommunityVAT')}
          />
          <Typography variant="body1" className={classes.tva}>
            Je suis soumis à la TVA
            intracommunautaire
            </Typography>
        </Grid>
        {switchTVA
          && (
            <Grid item md={6}>
              <CustomTextField
                label="Numéro de TVA"
                placeholder="Numéro de TVA"
                name="administrativeProfile.vatNumber"
                value={administrativeProfile.vatNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!getIn(touched, 'administrativeProfile.vatNumber') && !!getIn(errors, 'administrativeProfile.vatNumber')}
              />
            </Grid>
          )
        }
        <Grid container className={classes.card}>
          <CustomButton
            title="Sauvegarder"
            theme="filledButton"
            className={classes.saveButton}
            disabled={isNullOrEmpty(administrativeProfile.legalForm) || isNullOrEmpty(administrativeProfile.socialReason) || isNullOrEmpty(administrativeProfile.siret) || isNullOrEmpty(administrativeProfile.shareCapital) || !/\d/.test(administrativeProfile.shareCapital) || (isNullOrEmpty(administrativeProfile.vatNumber) && administrativeProfile.intraCommunityVAT === true) || disabled}
            handleClick={() => handleSubmit({
              administrativeProfile: {
                ...administrativeProfile,
                vatNumber: administrativeProfile.intraCommunityVAT ? administrativeProfile.vatNumber : null,
                shareCapital: parseFloat(administrativeProfile.shareCapital)
              },
              webSite
            })}
            loading={companyUpdateLoading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Form1;
