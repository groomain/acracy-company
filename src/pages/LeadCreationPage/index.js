import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router';
import { Formik, Form } from 'formik';
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
import { leadSaveLaunched, getLeadDraftLaunched, putLeadDraftLaunched, dispatchLeadId } from "./reducer";
import clsx from "clsx";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CustomLoader from '../../components/Loader';

import { formatType, formatFrequencyType, formatDurationType, formatBudgetType, formatSeniorityType, formatLanguagesValues } from '../../utils/services/format';

let leadSave;
let formData = false;
const LeadCreationPage = (props) => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let location = useLocation();
  const ref = useRef();

  const scroll = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const [disableAppbarSaveBtn, setDisableAppbarSaveBtn] = useState(true);
  const [activeStep, setActiveStep] = useState();
  const [saveBtnClicked, setSaveBtnClicked] = useState(false);
  const [missionTitle, setMissionTitle] = useState();

  const { leadSaveLoading, leadDraftData, leadDraftSearchData, deliverablesArray, dateFromCalendar, dailyRate,
    leadCreationStep, leadDraftId, selectedExpertiseList, expertisePriorities, selectedSensitivity,
    sensitivityPriority, selectedLanguage, languagePriority, uploadedFileName, leadAttachmentId } = useSelector(state => ({
      leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
      leadDraftSearchData: state.getIn(['leadCreation', 'leadDraftSearchData']),
      deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray']),
      dateFromCalendar: state.getIn(['leadCreation', 'dateFromCalendar']),
      dailyRate: state.getIn(['leadCreation', 'dailyRate']),
      leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
      leadCreationStep: state.getIn(['dashboard', 'leadCreationStep']),
      leadDraftId: state.getIn(['leadCreation', 'leadDraftId']),
      selectedExpertiseList: state.getIn(['leadCreation', 'selectedExpertiseList']),
      expertisePriorities: state.getIn(['leadCreation', 'expertisePriorities']),
      selectedSensitivity: state.getIn(['leadCreation', 'selectedSensitivity']),
      sensitivityPriority: state.getIn(['leadCreation', 'sensitivityPriority']),
      selectedLanguage: state.getIn(['leadCreation', 'selectedLanguage']),
      languagePriority: state.getIn(['leadCreation', 'languagePriority']),
      uploadedFileName: state.getIn(['leadCreation', 'uploadedFileName']),
      leadAttachmentId: state.getIn(['leadCreation', 'leadAttachmentId'])
    }));

  useEffect(() => {
    setActiveStep(leadCreationStep)
  }, [leadCreationStep]);

  const [leadId, setLeadId] = useState();
  const [splittedUrl, setSplittedUrl] = useState();

  useEffect(() => {
    if (location.search) {
      setSplittedUrl(location.search.split('&'));
    } else if (location.pathname.split("/").length > 2) {
      setSplittedUrl(location.pathname.split("/"));
      setLeadId(location.pathname.split("/")[2]);
      dispatch(dispatchLeadId(location.pathname.split('/')[2]))
    } else if (leadDraftId) {
      setLeadId(leadDraftId)
    }
  }, [dispatch, location.search, location.pathname, leadDraftId, leadId]);

  // useEffect(() => {
  //   if (leadId) {
  //     dispatch(getLeadDraftLaunched(leadId));
  //   }
  // }, [dispatch, leadId])

  // // Handle the 'save & close' and the 'call me' buttons' disabled state
  // useEffect(() => {
  //   if (activeStep === 0 && ((!leadDraftSearchData?.search && !leadDraftData?.search) || missionTitle.trim().length < 1)) {
  //     setDisableAppbarSaveBtn(true)
  //   } else {
  //     setDisableAppbarSaveBtn(false)
  //   }
  // }, [leadDraftSearchData, activeStep, missionTitle]);

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
        code: search.objectID,
        links: search.DELIVERABLES || search.PROFILES
      })
    }
  }
  let redirect = true;
  leadSave = (leads, deliverables, formData, redirect, redirectToMission) => {
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

    const minDate = new Date().setDate(new Date().getDate() + 30);

    let leadDraft, lead;

    leadDraft = {
      search: leadDraftData?.search || getSearchResult || '',
      desireds: leadDraftData?.desireds || getDesireds || '',
      missionContext: {
        title: values?.missionTitle || '',
        startDate: dateFromCalendar ? new Date(dateFromCalendar).toISOString() : new Date(minDate).toISOString(), // operateur ternaire pour remettre profil à 0 quand profil a été recherché
        format: formatType(values?.workspace) || '',
        weeklyRythm: values.frequency ? +values?.frequency?.match(/\d+/)[0] : null,
        duration: {
          nb: +values?.duration || null,
          unit: formatDurationType(values?.durationType) || '',
        },
        budget: {
          value: +values?.budget || null,
          type: values?.budgetType === 'Jours' ? 'DAILY_RATE' : 'TOTAL' || ''
        },
        estimatedAverageDailyRate: dailyRate || leadDraftData?.missionContext?.estimatedAverageDailyRate || null,
        profileNumber: values?.profilesNumber || '',
        address: values?.companyAddress || '',
      },
    };

    const formattedExpertiseList = selectedExpertiseList => {
      if (selectedExpertiseList.length > 0) { // change the whole object
        return selectedExpertiseList?.map(x => ({ expertise: { code: x.code, text: x.text }, priority: expertisePriorities.includes(x.text) }));
      } else if (selectedExpertiseList?.length === 0 && expertisePriorities !== leadDraftData?.missionRequirements?.expertises.filter(x => x.priority).map(x => x.expertise.text)) { // If only change priorities
        return leadDraftData?.missionRequirements?.expertises.map(x => ({ expertise: { code: x.expertise.code, text: x.expertise.text }, priority: expertisePriorities.includes(x.expertise.text) }))
      } else {
        return leadDraftData?.missionRequirements?.expertises // no changes for this category
      }
    }

    const formattedSensitivity = selectedSensitivity => {
      if (selectedSensitivity.length > 0) {
        const sensitivity = selectedSensitivity?.map(x => ({ sensitivity: { code: x.code, text: x.text }, essential: selectedSensitivity[0].text === sensitivityPriority[0] }));
        const [extractedSensitivity] = sensitivity;
        return extractedSensitivity;
      } else if (selectedSensitivity.length === 0 && sensitivityPriority !== [leadDraftData?.missionRequirements?.sensitivity].filter(x => x?.essential).map(x => x?.sensitivity?.text)) {
        const sensitivity = [leadDraftData?.missionRequirements?.sensitivity].map(x => ({ sensitivity: { code: x?.sensitivity.code, text: x?.sensitivity.text }, essential: sensitivityPriority.includes(x?.sensitivity?.text) }));
        const [extractedSensitivity] = sensitivity;
        return extractedSensitivity;
      } else {
        return leadDraftData?.missionRequirements?.sensitivity
      }
    }

    const formattedLanguage = selectedLanguage => {
      if (selectedLanguage.length > 0) {
        return selectedLanguage?.map(x => ({ language: x.type, essential: x.text === languagePriority[0] }));
      } else if (selectedLanguage?.length === 0 && languagePriority !== leadDraft?.missionRequirements?.languages.filter(x => x?.essential).map(x => formatLanguagesValues(x.language))) {
        return leadDraftData?.missionRequirements?.languages.map(x => ({ language: x.language, essential: languagePriority.includes(formatLanguagesValues(x.language)) }))
      } else {
        return leadDraftData?.missionRequirements?.language
      }
    }

    if (activeStep === 0) {
      lead = leadDraft;
    } else {
      lead = {
        ...leadDraft,
        missionDetail: {
          contextAndTasks: leadDraftData?.missionDetail?.contextAndTasks || values?.contextAndTasks || '',
          detailsOfDeliverables: leadDraftData?.missionDetail?.contextAndTasks || values?.detailsOfDeliverables || '',
          sharedDocuments: [
            {
              name: uploadedFileName ?? '',
              externalId: leadAttachmentId ?? ''
            }
          ]
        },
        missionRequirements: {
          expertises: formattedExpertiseList(selectedExpertiseList) ?? [],
          sensitivity: formattedSensitivity(selectedSensitivity) ?? '',
          languages: formattedLanguage(selectedLanguage) ?? [],
          seniority: formatSeniorityType(values?.seniority) ?? ''
        }
      }
    }

    // console.log('lead :', lead, 'redirect :', redirect);

    if (leadId) {
      dispatch(putLeadDraftLaunched({ leadId, lead, redirect, redirectToMission }))
    } else {
      dispatch(leadSaveLaunched({ lead, redirect, redirectToMission }));
    }
  };

  const isItADeliverable = (leadDraftData?.search?.type === "DELIVERABLE") ? leadDraftData?.search : leadDraftData?.desireds;

  const initialValues = {
    "externalId": '',
    "status": '',
    "search": {
      "type": '',
      "code": '',
      "text": ''
    },
    "desireds": [
    ],
    "missionContext": {
      "title": '',
      "startDate": 1599381085983,
      "format": '',
      "address": '',
      "weeklyRythm": '',
      "duration": {
        "nb": '',
        "unit": ''
      },
      "budget": {
        "value": '',
        "type": ''
      },
      "estimatedAverageDailyRate": 0,
      "profilNumber": 1
    },
    "missionDetail": {
      "contextAndTasks": '',
      "detailsOfDeliverables": '',
      "sharedDocuments": [
      ]
    },
    "missionRequirements": {
      "expertises": [
        {
          'expertise': {
            'code': 'recbDpORQTeXfigoD', 'text': "Accompagnement de l'innovation"
          },
          'priority': true
        }
      ],
      "sensitivity": {
        "sensitivity": {
          "code": 'recTlNn2tYMPyrYYG',
          "text": 'data'
        },
        "essential": false
      },
      "languages": [{ "language": "NATIVE_GERMAN", "essential": true }
      ],
      "seniority": ''
    }
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
    seniority: Yup.string().required(),
    contextAndTasks: Yup.string().required(),
    detailsOfDeliverables: Yup.string().required(),
  });
  const handleSubmit = (values) => { console.log(values) }
  const values = {}

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.root}
    >
      <AppBar position="fixed" className={clsx(classes.appbar, { [classes.shadow]: scroll })}>
        <CustomSnackBar />
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
              handleClick={() => {
                setSaveBtnClicked(true);
                leadSave(leadDraftSearchData, deliverablesArray, formData, redirect)
              }}
              loading={saveBtnClicked && leadSaveLoading} />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      {activeStep === 1 && leadSaveLoading
        ? <Grid container alignItems='center' justify='center' style={{ height: '100vh' }}>
          <CustomLoader size={70} />
        </Grid>
        : <>
          <Main>
            <Formik
              render={props =>
                <Form>
                  <LeadCreationForm
                    leadId={leadId}
                    onUpdateMissionTitle={e => setMissionTitle(e)}
                    {...props}
                  />
                </Form>
              }

              initialValues={initialValues}
              // validationSchema={ValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            // ref={ref}
            />

          </Main>
          <Sidebar>
            <Grid container style={{ position: 'sticky', top: '10rem' }}>
              {(leadCreationStep === 1) ? (
                <>
                  <Grid item className={classes.briefTipRoot}>
                    <Tip title='#01' subtitle='Mieux vaut trop' description={t('leadCreation.tip1')} />
                  </Grid>
                  <Grid item className={classes.briefTipRoot} style={{ marginTop: '2rem' }}>
                    <Tip title='#02' subtitle='Donnez envie' description={t('leadCreation.tip2')} Url="https://medium.com/@weareacracy/travailler-avec-des-talents-cr%C3%A9atifs-en-direct-mode-demploi-2-3-c7c379fac8b5" linkTitle={t('leadCreation.discoverTips')} />
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
        </>}
    </Grid>
  )
}

export { leadSave };
export default LeadCreationPage;
