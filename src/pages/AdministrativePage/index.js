import React, { useEffect, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import GeneralInformation from "../../components/GeneralInformation";
import CustomAppbar from '../../components/AppBar'
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import * as Scroll from "react-scroll/modules";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { getAreaCodeFromNumber } from "../../utils/services/format";
import Form1 from "../../components/AdministrativeForms/Form1";
import Form2 from "../../components/AdministrativeForms/Form2";
import Form3 from "../../components/AdministrativeForms/Form3";
import Form4 from "../../components/AdministrativeForms/Form4";
import Form5 from "../../components/AdministrativeForms/Form5";
import Upload from "../../components/Inputs/Upload";
import { useDispatch, useSelector } from "react-redux";
import { handleCurrentStep } from '../../components/App/reducer';
import {
  checkMissingFilesForm,
  closeAdminSnackBar,
  getCompanyLaunched,
  openAdminSnackBar,
  putCompanyLaunched
} from "./reducer";
import CustomLoader from "../../components/Loader";
import smallCheck from "../../assets/icons/small-check.svg";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import { Box } from "@material-ui/core";
import DarkWrapper from "../../components/Layout/DarkWrapper";

export const AdministrativePage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();
  const Element = Scroll.Element;
  const scrollSpy = Scroll.scrollSpy;
  const [kbis, setKbis] = useState(null);
  const [status, setStatus] = useState(null);
  const [cin1, setCin1] = useState(null);
  const [cin2, setCin2] = useState(null);
  const [cin3, setCin3] = useState(null);
  const [cin4, setCin4] = useState(null);

  const { companyData, companyLoading, companyId, adminSnackBarOpen, adminSnackBarMessage, adminSnackBarError } = useSelector(state => ({
    companyData: state.getIn(['Administrative', 'companyData']),
    companyLoading: state.getIn(['Administrative', 'companyLoading']),
    companyId: state.getIn(['app', 'userDynamo', 'companyId']),
    // companyId: 827,                                              ///// mock ID for offline use
    adminSnackBarOpen: state.getIn(['Administrative', 'adminSnackBarOpen']),
    adminSnackBarMessage: state.getIn(['Administrative', 'adminSnackBarMessage']),
    adminSnackBarError: state.getIn(['Administrative', 'adminSnackBarError']),
  }));

  useEffect(() => {
    dispatch(handleCurrentStep(0))
    dispatch(getCompanyLaunched(companyId));
    scrollSpy.update();
  }, [dispatch]);

  useEffect(() => {
    if (companyData?.administrativeProfile?.legalDocuments?.filter((file) => file.name === 'kbis' || file.name === 'cin1' || file.name === 'status').length === 3) {
      dispatch(checkMissingFilesForm(true))
    }
  }, [companyData]);

  const closeSnackBar = () => {
    dispatch(closeAdminSnackBar());
  };

  const initialValuesForm1 = {
    legalForm: companyData?.administrativeProfile?.legalForm || '',
    socialReason: companyData?.administrativeProfile?.socialReason || '',
    siret: companyData?.administrativeProfile?.siret || '',
    shareCapital: companyData?.administrativeProfile?.shareCapital || '',
    webSite: companyData?.webSite || '',
    cityOfRcsRegistration: companyData?.administrativeProfile?.cityOfRcsRegistration || '',
    intraCommunityVAT: companyData?.administrativeProfile?.intraCommunityVAT || '',
    vatNumber: companyData?.administrativeProfile?.vatNumber || '',
  };

  const ValidationSchemaForm1 = Yup.object().shape({
    legalForm: Yup.string().required(),
    socialReason: Yup.string().required(),
    siret: Yup.number().required(),
    shareCapital: Yup.number().required(),
    webSite: Yup.string(),
    cityOfRcsRegistration: Yup.string(),
    intraCommunityVAT: Yup.bool(),
    vatNumber: Yup.number(),
  });

  const initialValuesForm2 = {
    address: companyData?.administrativeProfile?.headOffice?.address || '',
    zipCode: companyData?.administrativeProfile?.headOffice?.zipCode || '',
    city: companyData?.administrativeProfile?.headOffice?.city || '',
    country: companyData?.administrativeProfile?.headOffice?.country || '',
  };

  const ValidationSchemaForm2 = Yup.object().shape({
    address: Yup.string().required(),
    zipCode: Yup.number().required(),
    city: Yup.string().required(),
    country: Yup.string().required(),
  });

  const initialValuesForm3 = {
    sameAddress: companyData?.administrativeProfile?.sameAddress || false,
    address: companyData?.administrativeProfile?.billing?.address || '',
    zipCode: companyData?.administrativeProfile?.billing?.zipCode || '',
    city: companyData?.administrativeProfile?.billing?.city || '',
    country: companyData?.administrativeProfile?.billing?.country || '',
  };

  const ValidationSchemaForm3 = Yup.object().shape({
    sameAddress: Yup.bool(),
    address: Yup.string().required(),
    zipCode: Yup.number().required(),
    city: Yup.string().required(),
    country: Yup.string().required(),
  });

  const initialValuesForm4 = {
    firstName: companyData?.administrativeProfile?.billing?.firstName || '',
    lastName: companyData?.administrativeProfile?.billing?.lastName || '',
    email: companyData?.administrativeProfile?.billing?.email || '',
    phonePrefix: companyData?.administrativeProfile?.billing?.phone?.code ? getAreaCodeFromNumber(companyData?.administrativeProfile?.billing?.phone?.code) : '',
    phoneNumber: companyData?.administrativeProfile?.billing?.phone?.number || '',
  };

  const ValidationSchemaForm4 = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phonePrefix: Yup.string().required(),
    phoneNumber: Yup.number().required(),
  });

  const initialValuesForm5 = {
    purchaseOrder: companyData?.administrativeProfile?.purchaseOrder || false,
    chart: false,
  };

  const ValidationSchemaForm5 = Yup.object().shape({
    purchaseOrder: Yup.bool().required(),
    chart: Yup.bool().required(),
  });

  const handleSubmit = (payload) => {
    dispatch(putCompanyLaunched({ ...payload, companyId }))
  }

  return (
    <Grid item xs={12} container className={classes.container}>
      <CustomAppbar path='/home' />
      <Grid item xs={3} container justify={'center'} className={classes.leftContainer}>
        <GeneralInformation />
      </Grid>
      {companyData &&
        <Grid item xs={9} container alignItems={'center'} justify={'center'} style={{ marginBottom: 500 }}>
          <Typography variant={'h1'} style={{ width: '80%', marginTop: 40 }}>Données de l'entreprise</Typography>
          <Element name={'2'} className={classes.element}>
            {/* FORM Informations générales */}
            <Formik
              render={props => <Form1 {...props} />}
              initialValues={initialValuesForm1}
              validationSchema={ValidationSchemaForm1}
              enableReinitialize
              onSubmit={handleSubmit}
            />
          </Element>

          {/* FORM Siège social */}
          <Element name={'3'} className={classes.element}>
            <Formik
              render={props => <Form2 {...props} />}
              initialValues={initialValuesForm2}
              validationSchema={ValidationSchemaForm2}
              onSubmit={handleSubmit}
            />
          </Element>

          {/* FORM Documents légaux */}
          <Element name={'4'} className={classes.element}>
            <Grid item container direction={'column'} className={classes.card}>
              <Typography variant={'h2'} className={classes.cardTitle}>Documents légaux</Typography>
              <Grid item container direction={'column'} style={{ width: '100%', padding: 25 }}>
                <Box my={3}>
                  <Typography variant="h1">{t('upload.title.single')}</Typography>
                </Box>
                <Box my={2}>
                  <Typography variant="body1">{t('upload.subtitle')}</Typography>
                </Box>
                <DarkWrapper justify='space-between' alignItems='start'>
                  <Upload name={'kbis'} placeHolder={'Kbis*'} setName={setKbis} type={'COMPANY_LEGAL_DOCUMENT'} withOutText={true} />
                  <Upload name={'status'} placeHolder={'Status*'} setName={setStatus} type={'COMPANY_LEGAL_DOCUMENT'} withOutText={true} />
                  <Upload name={'cin1'} placeHolder={'Carte d\'identité 1*'} setName={setCin1} type={'COMPANY_LEGAL_DOCUMENT'} withOutText={true} />
                  <Upload name={'cin2'} placeHolder={'Carte d\'identité 2'} setName={setCin2} type={'COMPANY_LEGAL_DOCUMENT'} withOutText={true} />
                  <Upload name={'cin3'} placeHolder={'Carte d\'identité 3'} setName={setCin3} type={'COMPANY_LEGAL_DOCUMENT'} withOutText={true} />
                  <Upload name={'cin4'} placeHolder={'Carte d\'identité 4'} setName={setCin4} type={'COMPANY_LEGAL_DOCUMENT'} withOutText={true} />
                </DarkWrapper>
                <Box my={2}>
                  <Typography variant="body1" color="primary">{t('upload.confidentialityText')}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Element>


          {/* FORM Adresse de facturation */}
          <Element name={'6'} className={classes.element}>
            <Typography variant={'h1'} style={{ marginBottom: 40 }}>Facturation</Typography>
            <Formik
              render={props => <Form3 {...props} />}
              initialValues={initialValuesForm3}
              validationSchema={ValidationSchemaForm3}
              onSubmit={handleSubmit}
            />
          </Element>

          {/* FORM Coordonnées de la personne en charge de la facturation */}
          <Element name={'7'} className={classes.element}>
            <Formik
              render={props => <Form4 {...props} />}
              initialValues={initialValuesForm4}
              validationSchema={ValidationSchemaForm4}
              onSubmit={handleSubmit}
            />
          </Element>

          {/* FORM Documents légaux */}
          <Element name={'8'} className={classes.element}>
            <Formik
              render={props => <Form5 {...props} />}
              initialValues={initialValuesForm5}
              validationSchema={ValidationSchemaForm5}
              // onSubmit={handleSubmit}
              onSubmit={handleSubmit}
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
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={adminSnackBarOpen}
        onClose={() => closeSnackBar()}
        children={
          <Grid container alignItems={'center'} justify={'space-between'} className={classes.snackBar}>
            {adminSnackBarError ?
              <CloseIcon fontSize="small" />
              :
              <img alt={'smallCheck'} src={smallCheck} />
            }
            <Typography className={classes.typoSnackBar}>{adminSnackBarMessage}</Typography>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackBar()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        }
      />
    </Grid>
  )
};

export default AdministrativePage;