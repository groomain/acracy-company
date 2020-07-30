import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import CustomSwitch from "../../Switch";
import countries from "../../../utils/countries.json";
import {checkMissingInfosForm3} from '../../../pages/AdministrativePage/reducer';
import {isNullOrEmpty} from "../isNullOrEmpty";
import {getIn} from "formik";

export const Form3 = ({values, errors, touched, handleBlur, handleChange, handleSubmit}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = styles();

    const {administrativeProfile} = values;
    const [switchAddress, setSwitchAddress] = useState(administrativeProfile.sameAddress === true);

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
                                  error={!!touched.sameAddress && !!errors.sameAddress}
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
                                     error={!!touched.address && !!errors.address}
                    />
                    < Grid item container direction={'row'}>
                        <CustomTextField className={classes.zipCode}
                                         label={'Code postal*'}
                                         placeholder={'Code Postal'}
                                         name={'administrativeProfile.billing.zipCode'}
                                         value={administrativeProfile.billing.zipCode}
                                         onBlur={handleBlur}
                                         onChange={handleChange}
                                         error={!!touched.zipCode && !!errors.zipCode}
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
                              disabled={(isNullOrEmpty(administrativeProfile.billing.address) || isNullOrEmpty(administrativeProfile.billing.zipCode) || isNullOrEmpty(administrativeProfile.billing.city) || isNullOrEmpty(administrativeProfile.billing.country)) && switchAddress === false}
                              handleClick={() => switchAddress ? handleSubmit({sameAddress: true}) : handleSubmit({
                                  sameAddress: false,
                                  address: administrativeProfile.billing.address,
                                  zipCode: administrativeProfile.billing.zipCode,
                                  city: administrativeProfile.billing.city,
                                  country: administrativeProfile.billing.country
                              })}
                              loading={companyUpdateLoading}
                />
            </Grid>
        </Grid>
    );
};
export default Form3;
