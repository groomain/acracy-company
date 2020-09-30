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


let leadSave
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

  const [initialValues, setInitialValues] = useState({
    missionContext: {
      "format": "WHATEVER",
      "weeklyRythm": 5,
      "duration": {
        "unit": "DAY",
        "nb": null
      },
      "profilNumber": 1
    }
  })


  const [disableAppbarSaveBtn, setDisableAppbarSaveBtn] = useState(true);
  const [activeStep, setActiveStep] = useState();
  const [saveBtnClicked, setSaveBtnClicked] = useState(false);
  const [missionTitle, setMissionTitle] = useState();
  const [updatedValues, setUpdatedValues] = useState()


  const { leadSaveLoading, leadDraftData, getLeadDraftLoading, leadCreationPageWithSearchResult, leadCreationStep, leadDraftId,
    updateLeadDraftLoading } = useSelector(state => ({
      leadSaveLoading: state.getIn(['leadCreation', 'leadSaveLoading']),
      leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
      getLeadDraftLoading: state.getIn(['leadCreation', 'getLeadDraftLoading']),
      leadCreationStep: state.getIn(['dashboard', 'leadCreationStep']),
      leadDraftId: state.getIn(['leadCreation', 'leadDraftId']),
      updateLeadDraftLoading: state.getIn(['leadCreation', 'updateLeadDraftLoading']),
      leadCreationPageWithSearchResult: state.getIn(['dashboard', 'leadCreationPageWithSearchResult'])
    }));

  useEffect(() => {
    if (leadCreationPageWithSearchResult?.TEXT || leadCreationPageWithSearchResult?.value) {
      let newInitialValues = { ...initialValues, "search": { "code": leadCreationPageWithSearchResult.KEY || "", "text": leadCreationPageWithSearchResult.TEXT || leadCreationPageWithSearchResult.value, "type": leadCreationPageWithSearchResult.TYPE || 'OTHER' } }
      setInitialValues(newInitialValues)
    }
  }, [leadCreationPageWithSearchResult]);

  useEffect(() => {
    setActiveStep(leadCreationStep)
  }, [leadCreationStep]);

  // Handle the 'save & close' and the 'call me' buttons' disabled state
  useEffect(() => {
    if (activeStep === 0 && (!updatedValues?.search?.text || updatedValues?.desireds?.length < 1 || !updatedValues?.desireds?.length || updatedValues?.missionContext?.title?.trim()?.length < 1 || !updatedValues?.missionContext?.title)
    ) {
      setDisableAppbarSaveBtn(true)
    }
    else {
      setDisableAppbarSaveBtn(false)
    }
    if (updatedValues?.search?.type === 'OTHER' && updatedValues?.missionContext?.title) {
      setDisableAppbarSaveBtn(false)
    }

  }, [updatedValues, activeStep]);

  const [leadId, setLeadId] = useState();
  const [splittedUrl, setSplittedUrl] = useState();

  useEffect(() => {
    if (location.search) {
      setSplittedUrl(location.search.split('&'));
    } else if (location.pathname.split("/").length > 2) {
      setSplittedUrl(location.pathname.split("/"));
      setLeadId(location.pathname.split("/")[2]);
      dispatch(dispatchLeadId(location.pathname.split('/')[2]))
      dispatch(getLeadDraftLaunched(location.pathname.split('/')[2]))
    } else if (leadDraftId) {
      setLeadId(leadDraftId)
    }
  }, [dispatch, location.search, location.pathname, leadDraftId, leadId, activeStep]);

  useEffect(() => {
    if (leadDraftData?.externalId) {
      setInitialValues(leadDraftData)
    }
  }
    , [leadDraftData])

  leadSave = async (values, redirect, redirectToMission) => {
    if (leadId) {
      const validationSchema = Yup.object().shape({
        search: Yup.object().required(),
        missionContext: Yup.object().shape({
          title: Yup.string().required(),
          startDate: Yup.string().required(),
          format: Yup.string().required()
        }).required(),
        missionDetail: Yup.object(),
        missionRequirements: Yup.object(),
      });
      const isValid = await validationSchema.isValid(values);
      if (isValid) {
        dispatch(putLeadDraftLaunched({ leadId, values, redirect, redirectToMission }))
      }
    } else {
      const validationSchema = Yup.object().shape({
        search: Yup.object().required(),
        missionContext: Yup.object().shape({
          title: Yup.string().required(),
          startDate: Yup.string().required(),
          format: Yup.string().required()
        }).required(),
        missionDetail: Yup.object(),
        missionRequirements: Yup.object(),
      });
      const isValid = await validationSchema.isValid(values);
      if (isValid) {
        dispatch(leadSaveLaunched({ values, redirect }));
      }
    }
  }

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
            <CustomButton
              title={t('saveAndClose')}
              theme={disableAppbarSaveBtn ? 'disabledOutlined' : 'secondaryButton'}
              className={classes.buttonSave}
              disabled={disableAppbarSaveBtn}
              handleClick={() => {
                setSaveBtnClicked(true);
                leadSave(updatedValues, true)
              }}
              loading={saveBtnClicked && (leadSaveLoading || updateLeadDraftLoading)} />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      {activeStep === 1 && (leadSaveLoading || updateLeadDraftLoading)
        ? <Grid container alignItems='center' justify='center' style={{ height: '100vh' }}>
          <CustomLoader size={70} />
        </Grid>
        : <>
          <Main>
            {getLeadDraftLoading ?
              <Grid container alignItems='center' justify='center' style={{ height: '100vh' }}>
                <CustomLoader size={70} />
              </Grid> :
              <Formik
                render={props => {
                  setUpdatedValues(props.values)
                  return (
                    <Form>
                      <LeadCreationForm
                        leadId={leadId}
                        onUpdateMissionTitle={e => setMissionTitle(e)}
                        {...props}
                      />
                    </Form>
                  )
                }
                }
                initialValues={initialValues}
                onSubmit={(values, redirect, redirectToMission) => leadSave(values, redirect, redirectToMission)}
                enableReinitialize
              />
            }
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
                        <img className={classes.image} src={phonecall} alt="Appel téléphonique" />
                      </Grid>
                      <Typography className={classes.description}>Cliquez sur «
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
