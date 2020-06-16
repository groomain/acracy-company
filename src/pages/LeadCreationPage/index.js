import React, { useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import LeadCreationForm from '../../components/LeadCreationForm';
import { Grid, Typography } from '@material-ui/core';
import phonecall from '../../assets/icons/phone-call.svg';
import styles from './styles';
import CustomSnackBar from "../../components/SnackBar";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import CustomButton from "../../components/Button";
import { useTranslation } from "react-i18next";
import acracyLogo from "../../assets/icons/logo-acracy.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { leadSaveLaunched } from "./reducer";

let leadSave;
let needhelp = false;
let formData = false;
const LeadCreationPage = () => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ref = useRef();

  const { leadSaveLoading, leadDraftData, deliverablesArray, dateFromCalendar, missionTitle } = useSelector(state => ({
    leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
    leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
    deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray']),
    dateFromCalendar: state.getIn(['leadCreation', 'dateFromCalendar']),
    missionTitle: state.getIn(['leadCreation', 'missionTitle'])
  }));

  const setDesireds = (leads, values, deliverables) => {
    console.log('setDesireds values :', values);
    console.log('setDesireds leads :', leads);
    console.log('setDesireds deliverables: ', deliverables);
    let leadType = leads.search?.TYPE;
    console.log('setDesireds leadType :', leadType);
    if (leads.search === null) {
      const desireds = []
      return desireds;
    } else

      if (leadType === 'PROFILE') {
        console.log('PROFILE :');
        let desiredDeliverables = [];
        for (let i = 0; i < leads.search.DELIVERABLES.length; i++) {
          if (deliverables.includes(leads.search.DELIVERABLES[i].TEXT)) {
            desiredDeliverables.push(leads.search.DELIVERABLES[i]);
          }
        }
        console.log('desiredDeliverables :', desiredDeliverables);
        if (values?.customDeliverable !== '') {
          desiredDeliverables.push({
            "type": "",
            "text": values.customDeliverable,
            "code": ""
          })
          console.log('custom desiredDeliverables :', desiredDeliverables);
        }
        return desiredDeliverables;
      } else if (leadType === 'DELIVERABLE') {
        console.log('DELIVERABLE :');
        let desiredProfiles = [];
        for (let i = 0; i < leads.search.PROFILES.length; i++) {
          if ((values.profile).includes(leads.search.PROFILES[i].TEXT)) {
            desiredProfiles.push(leads.search.PROFILES[i])
          }
        }
        console.log('desiredProfiles :', desiredProfiles);
        return desiredProfiles;
      }
  }

  const setSearchResultType = (search) => {
    console.log('set draft search :', search.TEXT);
    if (search.label) {
      return ({
        type: '',
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

  leadSave = (leads, deliverables, formData, needHelp) => {
    // console.log('formContent :', formContent);
    console.log('needHelp :', needHelp);
    console.log("leads (algolia): ", leads);              // resultat algolia
    console.log(" ref formik", ref.current.state.values);  // data formulaire
    let search = leads.search;
    console.log('deliverables from redux:', deliverables);
    let values;
    if (formData === false) {
      values = ref.current.state.values;
    } else {
      values = formData;
    };

    console.log('values :', values);
    // let customDeliverable = values.customDeliverable;
    let getSearchResult;
    let getDesireds;
    let getEstimatedRate;
    let getHelp = '';
    if (needHelp === true) {
      getHelp = 'HELP_NEEDED';
    }
    console.log('getHelp :', getHelp);
    console.log('1')

    getEstimatedRate = (values) => {
      if (values) {
        if (values.budget && values.budgetType && values.duration && values.durationType) {
          if (values.budgetType === 'Taux journalier') {
            if (values.durationType === 'Mois') {

            } else if (values.durationType === 'Semaines') {

            } else if (values.durationType === 'Jours') {

            }
          } else if (values.budgetType === 'Budget total') {

          }
        }
      }
    }
    console.log('2')

    if (leads && values && deliverables) {
      getDesireds = setDesireds(leads, values, deliverables);
      console.log('getDesireds :', getDesireds);
    }
    // search n'a pas la meme forme quand saisie libre !!!!!!!!!!!!!!!!!!!
    if (search) {
      getSearchResult = setSearchResultType(search);
      console.log('getSearchResult :', getSearchResult);
    }

    console.log('3')

    let leadDraft = {
      search: getSearchResult || '',
      missionContext: {
        title: missionTitle,
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
        estimatedAverageDailyRate: '',
        profilNumber: values.profilesNumber || '',
        adress: values.companyAddress || '',
        desireds: getDesireds || '',
        status: getHelp
      },
    };
    console.log('leadDraft :', leadDraft);
    // dispatch(leadSaveLaunched(leadDraft));
  };
  const [open, setOpen] = React.useState(false);

  const initialValues = {
    deliverable: '',
    researchValue: {},
    customDeliverable: '',
    profile: 'Recevoir une recommandation acracy',
    missionTitle: '',
    missionStartDate: '',
    workspace: '',
    companyAddress: '',
    frequency: '',
    duration: '',
    durationType: 'Jours',
    budget: '',
    budgetType: '',
    profilesNumber: 1,
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
              className={classes.buttonSave}
              handleClick={() => leadSave(leadDraftData, deliverablesArray, formData, needhelp)}
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
        <Grid
          container
          direction='column'
          className={classes.briefTipRoot}
        >
          <Grid item className={classes.icon}>
            <img src={phonecall} alt="Appel téléphonique" />
          </Grid>
          <Typography variant='body1' className={classes.description}>Cliquez sur Cliquez sur «
          <span className={classes.yellowText}> être rappelé.e. </span>»
          en bas de page et nous finaliserons le brief ensemble.</Typography>

        </Grid>
      </Sidebar>
    </Grid >
  )
}

export { leadSave };
export default LeadCreationPage;