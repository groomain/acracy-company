import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import GeneralInformation from "../../components/GeneralInformation";
import CustomTextField from "../../components/Inputs/CustomTextField";
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomSwitch from "../../components/Switch";
import CustomButton from "../../components/Button";
import * as Scroll from "react-scroll/modules";
import {Toolbar} from "@material-ui/core";

export const AdministrativePage = (props) => {
    const classes = styles();
    const Element = Scroll.Element;
    const scrollSpy = Scroll.scrollSpy;

    useEffect(() => {
        scrollSpy.update();
    }, []);

    return (
        <Grid item xs={12} container className={classes.container}>
            <Grid item xs={3} container justify={'center'} className={classes.leftContainer}>
                <GeneralInformation/>
            </Grid>
            <Grid item xs={9} container alignItems={'center'} justify={'center'} style={{marginBottom: 200}}>
                <Typography variant={'h1'} style={{width: '80%', marginTop: 40}}>Données de l'entreprise</Typography>
                <Element name={2} className={classes.element}>
                    {/* FORM Informations générales */}
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h2'} className={classes.cardTitle}>Informations générales</Typography>
                        <Grid item container direction={'row'}>
                            <Grid item container direction={'column'} style={{width: '50%', padding: 25}}>
                                <CustomSelect className={classes.textfield} label={'Forme juridique*'}
                                              optionsValues={['test', 'test2']} placeholder={'Forme juridique'}/>
                                <CustomTextField className={classes.textfield} label={'SIRET*'} placeholder={'SIRET'}/>
                                <CustomTextField className={classes.textfield} label={'Site web'}
                                                 placeholder={'Site web'}/>
                                <Grid item container direction={'row'} className={classes.switchTVA}>
                                    <CustomSwitch switchSize={'small'}/>
                                    <Typography variant={'body1'} className={classes.tva}>Je suis soumis à la TVA
                                        intracommunautaire</Typography>
                                </Grid>
                                <CustomTextField className={classes.textfield} label={'Numéro de TVA'}
                                                 placeholder={'Numéro de TVA'}/>
                                <CustomButton title={'Sauvegarder'} theme={'filledButton'}
                                              className={classes.saveButton}/>
                            </Grid>
                            <Grid item container direction={'column'} style={{width: '50%', padding: 25}}>
                                <CustomTextField className={classes.textfield} label={'Raison sociale*'}
                                                 placeholder={'Raison sociale'}/>
                                <CustomTextField className={classes.textfield} label={'Capital social (€)*'}
                                                 placeholder={'Capital social (€)'}/>
                                <CustomTextField className={classes.textfield} label={'Ville d\'immatriculation au RCS'}
                                                 placeholder={'Ville d\'immatriculation au RCS'}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Element>

                {/* FORM Siège social */}
                <Element name={3} className={classes.element}>
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h2'} className={classes.cardTitle}>Siège social</Typography>
                        <Grid item container direction={'column'} style={{width: '100%', padding: 25}}>
                            <CustomTextField className={classes.textfield} label={'Adresse*'} placeholder={'Adresse'}/>

                            <Grid item container direction={'row'}>
                                <CustomTextField className={classes.zipCode} label={'Code postal*'}
                                                 placeholder={'Code Postal'}/>
                                <CustomTextField className={classes.city} label={'Ville*'} placeholder={'Ville'}/>
                            </Grid>
                            <CustomSelect className={classes.select} label={'Pays*'}
                                          optionsValues={['test', 'test2']} placeholder={'Pays'}/>
                            <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}/>
                        </Grid>
                    </Grid>
                </Element>

                {/* FORM Documents légaux */}
                <Element name={4} className={classes.element}>
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h2'} className={classes.cardTitle}>Documents légaux</Typography>
                        <Grid item container direction={'column'} style={{width: '100%', padding: 25}}>

                        </Grid>
                    </Grid>
                </Element>


                {/* FORM Adresse de facturation */}
                <Element name={6} className={classes.element}>
                    <Typography variant={'h1'} style={{marginBottom: 40}}>Facturation</Typography>
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h2'} className={classes.cardTitle}>Adresse de facturation</Typography>
                        <Grid item container direction={'column'} style={{width: '100%', padding: 25}}>
                            <Grid item container direction={'row'} className={classes.switchTVA}>
                                <CustomSwitch switchSize={'small'}/>
                                <Typography variant={'body1'} >L'adresse de facturation est identique à celle du siège social</Typography>
                            </Grid>
                            <CustomTextField className={classes.textfield} label={'Adresse*'} placeholder={'Adresse'}/>

                            <Grid item container direction={'row'}>
                                <CustomTextField className={classes.zipCode} label={'Code postal*'}
                                                 placeholder={'Code Postal'}/>
                                <CustomTextField className={classes.city} label={'Ville*'} placeholder={'Ville'}/>
                            </Grid>
                            <CustomSelect className={classes.select} label={'Pays*'}
                                          optionsValues={['test', 'test2']} placeholder={'Pays'}/>
                            <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}/>
                        </Grid>
                    </Grid>
                </Element>

                {/* FORM Coordonnées de la personne en charge de la facturation */}
                <Element name={7} className={classes.element}>
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h2'} className={classes.cardTitle}>Coordonnées de la personne en charge de
                            la facturation</Typography>
                        <Grid item container direction={'row'}>
                            <Grid item container direction={'column'} style={{width: '50%', padding: 25}}>
                                <CustomSelect className={classes.textfield} label={'Prénom*'}
                                              optionsValues={['test', 'test2']} placeholder={'Prénom'}/>
                                <CustomTextField className={classes.textfield} label={'Email*'} placeholder={'Email'}/>
                                <CustomButton title={'Sauvegarder'} theme={'filledButton'}
                                              className={classes.saveButton}/>
                            </Grid>
                            <Grid item container direction={'column'} style={{width: '50%', padding: 25}}>
                                <CustomTextField className={classes.textfield} label={'Nom*'}
                                                 placeholder={'Nom'}/>
                                <Grid item container direction={'row'}>
                                    <CustomTextField className={classes.textfield} label={'Nom*'}
                                                     placeholder={'Nom'}/>
                                    <CustomTextField className={classes.textfield} label={'Nom*'}
                                                     placeholder={'Nom'}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Element>

                {/* FORM Documents légaux */}
                <Element name={8} className={classes.element}>
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h2'} className={classes.cardTitle}>Détails facturation</Typography>
                        <Grid item container direction={'column'} style={{width: '100%', padding: 25}}>
                            <CustomTextField className={classes.textfield} label={'Adresse*'} placeholder={'Adresse'}/>

                            <Grid item container direction={'row'} className={classes.switchTVA}>
                                <CustomTextField className={classes.textfield} label={'Code postal*'}
                                                 placeholder={'Code Postal'}/>
                                <CustomTextField className={classes.textfield} label={'Ville*'} placeholder={'Ville'}/>
                            </Grid>
                            <CustomSelect className={classes.textfield} label={'Adresse*'}
                                          optionsValues={['test', 'test2']} placeholder={'Adresse'}/>
                            <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}/>
                        </Grid>
                    </Grid>
                </Element>
            </Grid>
        </Grid>
    )
};

export default AdministrativePage;
