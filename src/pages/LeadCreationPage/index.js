import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography } from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Sidebar from '../../components/Layout/Sidebar';
import LeadCreationForm from '../../components/LeadCreationForm';
import CustomSnackBar from "../../components/SnackBar";
import Main from '../../components/Layout/Main';
import Tip from '../../components/Tip';
import DarkWrapper from '../../components/Layout/DarkWrapper';
import CustomButton from "../../components/Button";
import acracyLogo from "../../assets/icons/logo-acracy.svg";
import phonecall from '../../assets/icons/phone-call.svg';
import { useTranslation } from "react-i18next";
import styles from './styles';
import { leadSaveLaunched, getLeadDraftLaunched, putLeadDraftLaunched } from "./reducer";

let leadSave;
let formData = false;
let leadId = null;
const LeadCreationPage = () => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let location = useLocation();
  const ref = useRef();

  const [disableAppbarSaveBtn, setDisableAppbarSaveBtn] = useState(true);

  useEffect(() => {
    if (location.search) {
      leadId = location.search.split('=')[1];
      dispatch(getLeadDraftLaunched(leadId))
    }
  }, [dispatch, location.search]);

  const { leadSaveLoading, leadDraftData, leadDraftSearchData, deliverablesArray, dateFromCalendar, dailyRate, leadCreationStep } = useSelector(state => ({
    leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
    leadDraftSearchData: state.getIn(['leadCreation', 'leadDraftSearchData']),
    deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray']),
    dateFromCalendar: state.getIn(['leadCreation', 'dateFromCalendar']),
    dailyRate: state.getIn(['leadCreation', 'dailyRate']),
    leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
    leadCreationStep: state.getIn(['leadCreation', 'leadCreationStep'])
  }));

  useEffect(() => {
    if (leadDraftSearchData?.search !== null) {
      setDisableAppbarSaveBtn(false)
    } else if (leadDraftSearchData?.search === null) {
      setDisableAppbarSaveBtn(true)
    }
  }, [leadDraftSearchData]);

  const setDesireds = (leads, values, deliverables) => {
    let leadType = leads.search?.TYPE;
    if (leads.search === null) {
      const desireds = []
      return desireds;
    } else if (leadType === 'PROFILE') {
      let desiredDeliverables = [];
      for (let i = 0; i < leads.search.DELIVERABLES.length; i++) {
        if (deliverables.includes(leads.search.DELIVERABLES[i].TEXT)) {
          desiredDeliverables.push({
            "type": "DELIVERABLE",
            "text": leads.search.DELIVERABLES[i].TEXT,
            "code": leads.search.DELIVERABLES[i].KEY
          });
        }
      }
      if (values?.customDeliverable !== '') {
        desiredDeliverables.push({
          "type": "DELIVERABLE",
          "text": values.customDeliverable,
          "code": ""
        })
      }
      return desiredDeliverables;
    } else if (leadType === 'DELIVERABLE') {
      let desiredProfiles = [];
      for (let i = 0; i < leads.search.PROFILES.length; i++) {
        if ((values.profile).includes(leads.search.PROFILES[i].TEXT)) {
          desiredProfiles.push({
            "type": "PROFILE",
            "text": leads.search.PROFILES[i].TEXT,
            "code": leads.search.PROFILES[i].KEY
          })
        }
      }
      if ((values.profile).includes("Recevoir une recommandation acracy")) {
        desiredProfiles.push({
          "type": "PROFILE",
          "text": "Recevoir une recommandation acracy",
          "code": ""
        })
      }
      return desiredProfiles;
    }
  }

  const setSearchResultType = (search) => {
    if (search.label) {
      return ({
        type: 'OTHER',
        text: search.label,
        code: ''
      })
    } else {
      return ({
        type: search.TYPE,
        text: search.TEXT,
        code: search.objectID
      })
    }
  }

  let redirect = true;
  leadSave = (leads, deliverables, formData, redirect) => {
    // console.log("leads (algolia): ", leads);              // resultat algolia
    // console.log(" ref formik", ref.current.state.values);  // data formulaire
    // console.log('deliverables from redux:', deliverables);
    let search = leads.search;
    let values;
    if (formData === false) {
      values = ref.current.state.values;
    } else {
      values = formData;
    };

    let getSearchResult;
    let getDesireds;

    if (leads && values && deliverables) {
      getDesireds = setDesireds(leads, values, deliverables);
    }

    // search results don't have the same content when the user searches with his own words. 
    // checking search results:
    if (search) {
      getSearchResult = setSearchResultType(search);
    }

    let leadDraft = {
      search: getSearchResult || '',
      missionContext: {
        title: values.missionTitle || '',
        startDate: dateFromCalendar || '', // operateur ternaire pour remettre profil à 0 quand profil a été recherché
        format: values.workspace || '',
        weeklyRythm: values.frequency || '',
        duration: {
          nb: values.duration || '',
          type: values.durationType || '',
        },
        budget: {
          value: values.budget || '',
          type: values.budgetType || ''
        },
        estimatedAverageDailyRate: dailyRate,
        profilNumber: values.profilesNumber || '',
        adress: values.companyAddress || '',
        desireds: getDesireds || '',
      },
    };
    console.log('leadDraft :', redirect, leadDraft);
    if (leadId) {
      dispatch(putLeadDraftLaunched(leadDraft, redirect))
    } else {
      dispatch(leadSaveLaunched(leadDraft, redirect));
    }
  };
  const [open, setOpen] = React.useState(false);

  const isItADeliverable = (leadDraftData?.search?.type === "DELIVERABLE") ? leadDraftData?.search : leadDraftData?.desireds;


  const initialValues = {
    deliverable: isItADeliverable || '',
    researchValue: leadDraftData?.search || {},
    customDeliverable: '',
    profile: leadDraftData?.profilNumber || 'Recevoir une recommandation acracy',
    missionTitle: leadDraftData?.missionContext?.title || '',
    missionStartDate: leadDraftData?.missionContext?.startDate || '',
    workspace: leadDraftData?.missionContext?.format || '',
    companyAddress: leadDraftData?.missionContext?.adress || '',
    frequency: leadDraftData?.missionContext?.weeklyRythm || '',
    duration: leadDraftData?.missionContext?.duration?.nb || '',
    durationType: leadDraftData?.missionContext?.duration?.unit || 'Jours',
    budget: leadDraftData?.missionContext?.budget?.value || '',
    budgetType: leadDraftData?.missionContext?.budget?.type || '',
    profilesNumber: leadDraftData?.profilNumber || 1,
    seniority: "Sélectionnez le niveau d'expérience minimum"
  };

  // Form Validation Schema
  const ValidationSchema = Yup.object().shape({
    deliverable: Yup.string().required(),
    researchValue: Yup.string().required(),
    customDeliverable: Yup.string().required(),
    profile: Yup.string().required(),
    missionTitle: Yup.string().required(),
    missionStartDate: Yup.string().required(),
    workspace: Yup.string().required(),
    companyAddress: Yup.string().required(),
    frequency: Yup.string().required(),
    duration: Yup.number().required(),
    durationType: Yup.string().required(),
    budget: Yup.number().required(),
    budgetType: Yup.string().required(),
    profilesNumber: Yup.number().required(),
    seniority: Yup.string().required()
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.root}
    >
      <AppBar position="fixed" className={classes.appbar}>
        <CustomSnackBar message={"Test de snackBar"} open={open} setOpen={setOpen} />
        <Toolbar className={classes.toolbar}>
          <NavLink to={'/'} className={classes.logo}>
            <img src={acracyLogo} alt="acracyLogo" />
          </NavLink>
          <div className={classes.grow} />
          <div className={classes.save}>
            <CustomButton title={t('saveAndClose')}
              theme={disableAppbarSaveBtn ? 'disabledOutlined' : 'secondaryButton'}
              className={classes.buttonSave}
              disabled={disableAppbarSaveBtn}
              handleClick={() => leadSave(leadDraftSearchData, deliverablesArray, formData, redirect)}
              loading={leadSaveLoading} />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Main>
        <Formik
          render={props => <LeadCreationForm {...props} />}
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={leadSave}
          ref={ref}
        />
      </Main>
      <Sidebar>
        <Grid container style={{ position: 'sticky', top: '10rem' }}>
          {(leadCreationStep == 1) ? (
            <>
              <Grid item className={classes.briefTipRoot}>
                <Tip title='#01' subtitle='Mieux vaut trop' description={t('leadCreation.tip1')} />
              </Grid>
              <Grid item className={classes.briefTipRoot} style={{ marginTop: '2rem' }}>
                <Tip title='#02' subtitle='Donnez envie' description={t('leadCreation.tip2')} Url='/dunno' linkTitle={t('leadCreation.discoverTips')} />
                {/* TODO change URL */}
              </Grid>
            </>
          ) : (
              <Grid container item direction='column' className={classes.briefTipRoot}>
                <DarkWrapper
                  direction='column'
                  className={classes.briefTipRoot}
                >
                  <Grid item className={classes.icon}>
                    <img src={phonecall} alt="Appel téléphonique" />
                  </Grid>
                  <Typography variant='body1' className={classes.description}>Cliquez sur Cliquez sur «
                <span className={classes.yellowText}> être rappelé.e. </span>»
                en bas de page et nous finaliserons le brief ensemble.
              </Typography>
                </DarkWrapper>
              </Grid>
            )}
        </Grid>
      </Sidebar>
    </Grid >
  )
}

export { leadSave };
export default LeadCreationPage;