import React from 'react';
import Grid from "@material-ui/core/Grid";
import GeneralInformation from "../../components/GeneralInformation";
import CustomTextField from "../../components/Inputs/CustomTextField";
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomSwitch from "../../components/Switch";
import CustomButton from "../../components/Button";

export const AdministrativePage = (props) => {
    const classes = styles();

    return (
        <Grid item xs={12} container className={classes.container}>
            <Grid item xs={3} container alignItems={'center'} justify={'center'} className={classes.leftContainer}
                  style={{border: '1px solid red'}}>
                <GeneralInformation/>
            </Grid>
            <Grid item xs={9} container alignItems={'center'} justify={'center'} style={{border: '1px solid green'}}>
                {/* FORM Informations générales */}
                <Grid item container direction={'column'} className={classes.card}>
                    <Typography variant={'h2'} className={classes.cardTitle}>Informations générales</Typography>
                    <Grid item container direction={'row'}>
                        <Grid item container direction={'column'} style={{width: '50%', padding: 25}}>
                            <CustomSelect className={classes.textfield} label={'Forme juridique*'}
                                          optionsValues={['test', 'test2']} placeholder={'Forme juridique'} />
                            <CustomTextField className={classes.textfield} label={'SIRET*'} placeholder={'SIRET'}/>
                            <CustomTextField className={classes.textfield} label={'Site web'} placeholder={'Site web'}/>
                            <Grid item container direction={'row'} className={classes.switchTVA}>
                                <CustomSwitch switchSize={'small'}/>
                                <Typography variant={'body1'} className={classes.tva}>Je suis soumis à la TVA intracommunautaire</Typography>
                            </Grid>
                            <CustomTextField className={classes.textfield} label={'Numéro de TVA'} placeholder={'Numéro de TVA'}/>
                            <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}/>
                        </Grid>
                        <Grid item container direction={'column'} style={{width: '50%', padding: 25}}>
                            <CustomTextField className={classes.textfield} label={'Raison sociale*'} placeholder={'Raison sociale'}/>
                            <CustomTextField className={classes.textfield} label={'Capital social (€)*'} placeholder={'Capital social (€)'}/>
                            <CustomTextField className={classes.textfield} label={'Ville d\'immatriculation au RCS'} placeholder={'Ville d\'immatriculation au RCS'}/>
                        </Grid>
                    </Grid>
                </Grid>

                {/* FORM Siège social */}
                <Grid item container direction={'column'} className={classes.card}>
                    <Typography variant={'h2'} className={classes.cardTitle}>Siège social</Typography>
                        <Grid item container direction={'column'} style={{width: '100%', padding: 25}}>
                            <CustomTextField className={classes.textfield} label={'Adresse*'} placeholder={'Adresse'}/>

                            <Grid item container direction={'row'} className={classes.switchTVA}>
                                <CustomTextField className={classes.textfield} label={'Code postal*'} placeholder={'Code Postal'}/>
                                <CustomTextField className={classes.textfield} label={'Ville*'} placeholder={'Ville'}/>
                            </Grid>
                            <CustomSelect className={classes.textfield} label={'Adresse*'}
                                          optionsValues={['test', 'test2']} placeholder={'Adresse'} />                            <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}/>
                        </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default AdministrativePage;
