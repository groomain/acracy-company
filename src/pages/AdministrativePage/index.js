import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import GeneralInformation from "../../components/GeneralInformation";
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import * as Scroll from "react-scroll/modules";
import * as Yup from "yup";
import {Formik} from "formik";
import {useTranslation} from "react-i18next";
import Form1 from "../../components/AdministrativeForms/Form1";
import Form2 from "../../components/AdministrativeForms/Form2";
import Form3 from "../../components/AdministrativeForms/Form3";
import Form4 from "../../components/AdministrativeForms/Form4";
import Form5 from "../../components/AdministrativeForms/Form5";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyLaunched} from "./reducer";
import CustomLoader from "../../components/Loader";

export const AdministrativePage = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = styles();
    const Element = Scroll.Element;
    const scrollSpy = Scroll.scrollSpy;

    useEffect(() => {
        dispatch(getCompanyLaunched());
        scrollSpy.update();
    }, []);

    const { companyData, companyLoading } = useSelector(state => ({
        companyData: state.getIn(['Administrative', 'companyData']),
        companyLoading: state.getIn(['Administrative', 'companyLoading']),
    }));

    console.log('companyData', companyData);
    console.log('companyLoading', companyLoading);

    const initialValuesForm1 = {
        legalForm: '',
        socialReason: '',
        siret: '',
        shareCapital: '',
        webSite: '',
        cityOfRcsRegistration: '',
        intraCommunityVAT: false,
        VatNumber: ''
    };

    const ValidationSchemaForm1 = Yup.object().shape({
        legalForm: Yup.string().required(),
        socialReason: Yup.string().required(),
        siret: Yup.string().required(),
        shareCapital: Yup.string().required(),
        webSite: Yup.string(),
        cityOfRcsRegistration: Yup.string(),
        intraCommunityVAT: Yup.bool(),
        VatNumber: Yup.number(),
    });

    const initialValuesForm2 = {
        address: '',
        zipCode: '',
        city: '',
        country: '',
    };

    const ValidationSchemaForm2 = Yup.object().shape({
        address: Yup.string().required(),
        zipCode: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
    });

    const initialValuesForm3 = {
        sameAddress: false,
        address: '',
        zipCode: '',
        city: '',
        country: '',
    };

    const ValidationSchemaForm3 = Yup.object().shape({
        sameAddress: Yup.string(),
        address: Yup.string().required(),
        zipCode: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
    });

    const initialValuesForm4 = {
        firstName: '',
        lastName: '',
        email: '',
        phonePrefix: '',
        phoneNumber: ''
    };

    const ValidationSchemaForm4 = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required(),
        phonePrefix: Yup.string().required(),
        phoneNumber: Yup.number().required(),
    });

    const initialValuesForm5 = {
        purchaseOrder: false,
        chart: false,
    };

    const ValidationSchemaForm5 = Yup.object().shape({
        purchaseOrder: Yup.bool().required(),
        chart: Yup.bool().required(),
    });


    return (
        <Grid item xs={12} container className={classes.container}>
            <Grid item xs={3} container justify={'center'} className={classes.leftContainer}>
                <GeneralInformation/>
            </Grid>
            {companyData &&
            <Grid item xs={9} container alignItems={'center'} justify={'center'} style={{marginBottom: 500}}>
                <Typography variant={'h1'} style={{width: '80%', marginTop: 40}}>Données de l'entreprise</Typography>
                <Element name={2} className={classes.element}>
                    {/* FORM Informations générales */}
                    <Formik
                        render={props => <Form1 {...props}/>}
                        initialValues={initialValuesForm1}
                        validationSchema={ValidationSchemaForm1}
                        onSubmit={(credentials) => console.log(credentials)}
                    />
                </Element>

                {/* FORM Siège social */}
                <Element name={3} className={classes.element}>
                    <Formik
                        render={props => <Form2 {...props}/>}
                        initialValues={initialValuesForm2}
                        validationSchema={ValidationSchemaForm2}
                        onSubmit={(credentials) => console.log(credentials)}
                    />
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
                    <Formik
                        render={props => <Form3 {...props}/>}
                        initialValues={initialValuesForm3}
                        validationSchema={ValidationSchemaForm3}
                        onSubmit={(credentials) => console.log(credentials)}
                    />
                </Element>

                {/* FORM Coordonnées de la personne en charge de la facturation */}
                <Element name={7} className={classes.element}>
                    <Formik
                        render={props => <Form4 {...props}/>}
                        initialValues={initialValuesForm4}
                        validationSchema={ValidationSchemaForm4}
                        onSubmit={(credentials) => console.log(credentials)}
                    />
                </Element>

                {/* FORM Documents légaux */}
                <Element name={8} className={classes.element}>
                    <Formik
                        render={props => <Form5 {...props}/>}
                        initialValues={initialValuesForm5}
                        validationSchema={ValidationSchemaForm5}
                        onSubmit={(credentials) => console.log(credentials)}
                    />
                </Element>
            </Grid>
            }
            {
                companyLoading &&
            <Grid item xs={9} container alignItems={'center'} justify={'center'}>
                <CustomLoader />
            </Grid>
            }
        </Grid>
    )
};

export default AdministrativePage;
