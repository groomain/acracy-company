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

const LeadCreationPage = () => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ref = useRef();

  const { leadSaveLoading, leadDraftData, deliverablesArray } = useSelector(state => ({
    leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
    leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
    deliverablesArray: state.getIn(['leadCreation', 'deliverablesArray'])
  }));

  const leadSave = (leads, array) => {
    console.log("search: ", leads);              // resultat algolia
    console.log(" données formulaire ", ref.current.state.values);  // data formulaire
    let search = leads.search;
    let deliverables = array;
    console.log('deliverables :', deliverables);
    let values = ref.current.state.values;
    let customDeliverable = values.customDeliverable;
    // for (let i = 0; i < deliverables.length; i++) {
    //   if (deliverables[i] === 'Ne figure pas dans la liste') {
    //     return deliverables[i] == customDeliverable;
    //   }
    // };
    let customIndex = deliverables.indexOf("Ne figure pas dans la liste")
    if (~customIndex) {
      deliverables[customIndex] = customDeliverable;
    }
    console.log('whut :', deliverables);

    let leadDraft = {
      search: {
        type: search?.TYPE,
        text: search?.TEXT,
        code: search?.objectID
      },
      missionContext: {
        title: values.missionTitle,
        startDate: values.missionStartDate, // operateur ternaire pour remettre profil à 0 quand profil a été recherché
        format: values.workspace,
        weeklyRythm: values.frequency,
        duration: {
          nb: values.duration,
          type: values.durationType,
        },
        estimatedAverageDailyRate: '',
        profilNumber: values.profilesNumber,
        adress: values.companyAddress,
        desireds: deliverables
      },
      ////////////////////////////////
      budget: values.budget,
      budgetType: values.budgetType,
      customDeliverable: values.customDeliverable,
      deliverable: values.deliverable,
      profile: (search?.TYPE === 'DE') ? values.profile : '',
    };
    dispatch(leadSaveLaunched(leadDraft));
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
              handleClick={() => leadSave(leadDraftData, deliverablesArray)}
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

export default LeadCreationPage;
