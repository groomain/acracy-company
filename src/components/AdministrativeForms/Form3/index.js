import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import styles from "../styles";
import CustomTextField from "../../Inputs/CustomTextField";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import CustomSwitch from "../../Switch";

export const Form3 = ({values, errors, touched, handleBlur, handleChange, handleSubmit}) => {
    const {t} = useTranslation();
    const classes = styles();
    const [switchAddress, setSwitchAddress] = useState(false);

    const {sameAddress, address, zipCode, city, country} = values;

    return (
        <Grid item container direction={'column'} className={classes.card}>
            <Typography variant={'h2'} className={classes.cardTitle}>Siège social</Typography>
            <Grid item container direction={'column'} className={classes.container}>
                <Grid item container direction={'row'} className={classes.switch}>
                    <CustomSwitch switchSize={'small'}
                                  setChecked={setSwitchAddress}
                                  checked={switchAddress}
                                  name={'sameAddress'}
                                  value={sameAddress}
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
                                     name={'address'}
                                     value={address}
                                     onBlur={handleBlur}
                                     onChange={handleChange}
                                     error={!!touched.address && !!errors.address}
                    />
                    < Grid item container direction={'row'}>
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
                                  optionsValues={['test', 'test2']}
                                  placeholder={'Pays'}
                                  name={'country'}
                                  value={country}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={!!touched.country && !!errors.country}
                    />
                </Grid>
                }
                <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
                              disabled={(address === "" || zipCode === "" || city === "" || country === "") && switchAddress === false}
                              handleClick={() => switchAddress ? handleSubmit({sameAddress: true}): handleSubmit({address, zipCode, city, country})}
                />
            </Grid>
        </Grid>
    );
};
export default Form3;
