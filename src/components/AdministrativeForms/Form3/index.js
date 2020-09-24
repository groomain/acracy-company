import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import CustomSwitch from "../../Switch";
import countries from "../../../utils/countries.json";
import { checkMissingInfosForm3 } from '../../../pages/AdministrativePage/reducer';
import { isNullOrEmpty } from "../isNullOrEmpty";
import { getIn } from "formik";

export const Form3 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, initialValues }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { administrativeProfile } = values;
  const [switchAddress, setSwitchAddress] = useState(administrativeProfile.sameAddress === true);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (administrativeProfile.sameAddress === true) {
      dispatch(checkMissingInfosForm3(true))
    } else if (!isNullOrEmpty(administrativeProfile?.billing?.address?.trim()) && !isNullOrEmpty(administrativeProfile?.billing?.zipCode) && !isNullOrEmpty(administrativeProfile?.billing?.city?.trim()) && !isNullOrEmpty(administrativeProfile?.billing?.country?.trim())) {
      dispatch(checkMissingInfosForm3(true))
    } else {
      dispatch(checkMissingInfosForm3(false))
    }
  }, [administrativeProfile, administrativeProfile.billing]);

  const { companyUpdateLoading } = useSelector(state => ({
    companyUpdateLoading: state.getIn(['Administrative', 'companyUpdateLoading']),
  }));

  useEffect(() => {
    if (
      administrativeProfile.sameAddress !== initialValues?.administrativeProfile.sameAddress ||
      administrativeProfile.billing.zipCode !== initialValues?.administrativeProfile.billing.zipCode ||
      administrativeProfile.billing.address !== initialValues?.administrativeProfile.billing.address ||
      administrativeProfile.billing.city !== initialValues?.administrativeProfile.billing.city ||
      administrativeProfile.billing.country !== initialValues?.administrativeProfile?.billing.country
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [administrativeProfile])

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Siège social</Typography>
      <Grid item container direction={'column'} className={classes.container}>
        <Grid item container direction={'row'} className={classes.switch}>
          <CustomSwitch switchSize={'small'}
            setChecked={setSwitchAddress}
            checked={switchAddress}
            name={'administrativeProfile.sameAddress'}
            value={administrativeProfile.sameAddress}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!getIn(touched, 'administrativeProfile.sameAddress') && !!getIn(errors, 'administrativeProfile.sameAddress')}
          />
          <Typography variant={'body1'}>L'adresse de facturation est identique à celle du siège
                        social</Typography>
        </Grid>
        {!switchAddress &&
          <Grid item container direction={'column'}>
            <CustomTextField className={classes.textfield}
              label={'Adresse*'}
              placeholder={'Adresse'}
              name={'administrativeProfile.billing.address'}
              value={administrativeProfile.billing.address}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!getIn(touched, 'administrativeProfile.billing.address') && !!getIn(errors, 'administrativeProfile.billing.address')}
            />
            < Grid item container direction={'row'}>
              <CustomTextField className={classes.zipCode}
                label={'Code postal*'}
                placeholder={'Code Postal'}
                name={'administrativeProfile.billing.zipCode'}
                value={administrativeProfile.billing.zipCode}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!getIn(touched, 'administrativeProfile.billing.zipCode') && !!getIn(errors, 'administrativeProfile.billing.zipCode')}
              />
              <CustomTextField className={classes.city}
                label={'Ville*'}
                placeholder={'Ville'}
                name={'administrativeProfile.billing.city'}
                value={administrativeProfile.billing.city}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!getIn(touched, 'administrativeProfile.billing.city') && !!getIn(errors, 'administrativeProfile.billing.city')}
              />
            </Grid>
            <CustomSelect className={classes.select}
              label={'Pays*'}
              optionsValues={countries}
              placeholder={'Pays'}
              name={'administrativeProfile.billing.country'}
              value={administrativeProfile.billing.country}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!getIn(touched, 'administrativeProfile.billing.country') && !!getIn(errors, 'administrativeProfile.billing.country')}
            />
          </Grid>
        }
        <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
          disabled={(isNullOrEmpty(administrativeProfile.billing.address) || isNullOrEmpty(administrativeProfile.billing.zipCode) || isNullOrEmpty(administrativeProfile.billing.city) || isNullOrEmpty(administrativeProfile.billing.country)) && switchAddress === false || disabled}
          handleClick={handleSubmit}
          loading={companyUpdateLoading}
        />
      </Grid>
    </Grid>
  );
};
export default Form3;
