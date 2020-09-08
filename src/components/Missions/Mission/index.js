import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from "clsx";
import { NavLink } from 'react-router-dom';
import { push } from "connected-react-router";
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Box, Typography } from "@material-ui/core";
import CircleImage from "../../CircleImage";
import IconButton from "@material-ui/core/IconButton";
import LeftOverlay from "./LeftOverlay";
import { MenuIcon } from "../../../assets/icons/MenuIcon";
import { AValiderIcon } from "../../../assets/icons/AValiderIcon";
import { MatchingIcon } from "../../../assets/icons/MatchingIcon";
import match from '../../../assets/icons/match.svg';
import { DemarreIcon } from "../../../assets/icons/DemarreIcon";
import { EnCoursIcon } from "../../../assets/icons/EnCoursIcon";
import { TravailIcon } from "../../../assets/icons/TravailIcon";
import { RetardIcon } from "../../../assets/icons/RetardIcon";
import { MissionHistoIcon } from "../../../assets/icons/MissionHistoIcon";
import CustomLoader from '../../Loader';
import CustomModal from '../../Modal';
import CustomButton from '../../Button';
import InvoiceManagementModal from '../../../pages/HomePage/Modals/InvoiceManagementModal';
import ValidationModal, { RefusalModal } from '../../../pages/HomePage/Modals/ValidationModal';
import styles from './styles';
import { getQuotesLaunched, getCompaniesLaunched, setComingFromDashboard } from '../../../pages/HomePage/reducer';
import severinePicture from '../../../assets/pics/severine/severine-small.png';
import { shortenLongText, addTwoWorkingDays, formatDate, formatDateForComparaison } from '../../../utils/services/format';
import * as moment from 'moment';
import {
  WAITING_FOR_VALIDATION,
  WAITING_FOR_PAYMENT,
  WAITING_FOR_ACCEPTANCE,
  WAITING_FOR_SIGNATURE,
  WAITING_FOR_MATCHING,
  WAITING_FOR_CUSTOMER_SELECTION,
  FINISHED,
  IN_PROGRESS,
  WAITING_FOR_QUOTES,
  PAID,
  REFUSED
} from '../constants';
import QuoteSignatureValidationModal from "../../../pages/HomePage/Modals/QuoteSignatureValidationModal";
import { useTranslation } from "react-i18next";
import { formatType } from '../../../utils/services/format';
moment.locale('fr');

export const Mission = ({ mission, matching, today, ...props }) => {
  const dispatch = useDispatch();
  const classes = styles();
  const { t } = useTranslation();

  const { quotes, quotesLoading, companiesData, companiesLoading, companiesDataFetched, updateMissionSent, companyId } = useSelector(state => ({
    companyId: state.getIn(['app', 'userDynamo', 'companyId']),
    quotes: state.getIn(['dashboard', 'quotes']),
    quotesLoading: state.getIn(['dashboard', 'quotesLoading']),
    companiesData: state.getIn(['dashboard', 'companiesData']),
    companiesLoading: state.getIn(['dashboard', 'companiesLoading']),
    companiesDataFetched: state.getIn(['dashboard', 'companiesDataFetched']),
    updateMissionSent: state.getIn(['dashboard', 'updateMissionSent'])
  }));

  const [open, setOpen] = useState(false);
  const [infosOpen, setInfosOpen] = useState(false);
  const [missionStatus, setMissionStatus] = useState();
  const [matchingValues, setMatchingValues] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const [redirectionPopupOpen, setRedirectionPopupOpen] = useState(false);
  const [validationModalOpen, setValidationModalOpen] = useState(updateMissionSent);
  const [refusalModalOpen, setRefusalModalOpen] = useState(false);
  const [invoicesModalOpen, setInvoicesModalOpen] = useState(false);
  const [preselectedFile, setPreselectedFile] = useState();

  const weekly = mission?.brief?.missionContext?.weeklyRythm || matching?.missionContext?.weeklyRythm;
  const durationNb = mission?.brief?.missionContext?.duration?.nb || matching?.missionContext?.duration?.nb;
  const durationUnit = mission?.brief?.missionContext?.duration?.unit || matching?.missionContext?.duration?.unit;
  const startDate = mission?.brief?.missionContext?.startDate || matching?.missionContext?.startDate;
  const sortedInvoices = mission?.invoices?.filter(x => x.status === WAITING_FOR_PAYMENT).sort((a, b) => new Date(Math.round(new Date(a.paymentDate).getTime())) - new Date(Math.round(new Date(b.paymentDate).getTime())));
  const sortedCRA = mission?.invoices?.filter(x => x.status === WAITING_FOR_VALIDATION).sort((a, b) => new Date(Math.round(new Date(a.startDate).getTime())) - new Date(Math.round(new Date(b.startDate).getTime())));
  const matchingStartDate = matching?.dateStartMatching;

  useEffect(() => {
    if (updateMissionSent) {
      setValidationModalOpen(false);
    }
  }, [updateMissionSent, dispatch]);

  const getStatusIcon = (mission) => {
    const status = mission?.status;
    if (status === REFUSED) {
      return <RetardIcon className={classes.icon} />
    } else if (status === WAITING_FOR_ACCEPTANCE || status === WAITING_FOR_SIGNATURE) {
      return <AValiderIcon className={classes.icon} />;
    } else if (status === WAITING_FOR_MATCHING || status === WAITING_FOR_CUSTOMER_SELECTION || status === WAITING_FOR_QUOTES) {
      return <MatchingIcon className={classes.icon} />;
    } else {
      if (mission?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT && x.paymentDate < today)) {
        return <RetardIcon className={classes.icon} /> // retard paiment
      }
      if (status === IN_PROGRESS && mission?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT && x.lastInvoice)) {
        return <TravailIcon className={classes.icon} />; // travail terminé
      }
      if (mission?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT)) {
        return <TravailIcon className={classes.icon} /> // facture à payer
      }
      if (mission?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION)) {
        return <EnCoursIcon className={classes.icon} /> // facture en attente de validation
      }
      if (status === IN_PROGRESS && mission?.dateStart > today) {
        return <DemarreIcon className={classes.icon} /> // démarre dans X jours 
      }
      if (status === FINISHED) {
        return <MissionHistoIcon className={classes.icon} />; // mission finalisée (historique)
      }
      return <EnCoursIcon className={classes.icon} />; // par défaut (mission en cours)
    }
  }

  useEffect(() => {
    const getBriefStatus = (briefStatus) => {
      switch (briefStatus) {
        case WAITING_FOR_ACCEPTANCE:
          return {
            status: 'Validation du brief en cours',
            avatar: match,
            title: 'En attente de validation du brief'
          };
        case WAITING_FOR_MATCHING:
        case WAITING_FOR_QUOTES:
          return {
            status: 'Matching en cours',
            avatar: match,
            title: 'Matching en cours',
            subtext: `Garanti en 48h.\n Estimé au ${addTwoWorkingDays(matchingStartDate, 2)}`
          };
        case WAITING_FOR_CUSTOMER_SELECTION:
          return {
            status: 'Faire votre sélection',
            avatar: '?',
            title: `Découvrir les profils`,
            subtext: `Nous vous proposons ${quotes?.length ?? 0} top freelance ${quotes?.length > 1 ? 's' : ''} !`,
            buttonText: 'Valider et découvrir les profils'
          };
        case WAITING_FOR_SIGNATURE:
          return {
            status: 'Devis à valider',
            buttonText: 'Valider devis',
            avatar: quotes && quotes[0]?.serviceProviderProfile?.linkedinAvatar,
            title: `${quotes && quotes[0]?.serviceProviderProfile?.firstName} ${quotes && quotes[0]?.serviceProviderProfile?.lastName} `,
          };
        default:
          break;
      }
    }
    const result = getBriefStatus(matching?.status);
    setMatchingValues(result);
  }, [matching, startDate, quotes]);

  useEffect(() => {
    const getMissionStatus = (missionInvoiceStatus, mission) => {

      if (mission?.status === REFUSED) { // Missions refusées
        return {
          status: t('dashboard.missions.refusedByAcracy'),
          color: 'danger',
        }
      }

      if (mission?.status === FINISHED) { // Missions finalisées
        return {
          status: `Mission finalisée le ${formatDate(mission?.dateEnd)} `,
          color: 'secondary'
        }
      }

      // Missions en cours
      if (mission?.status === IN_PROGRESS) {

        // Missions futures
        const futureMission = formatDateForComparaison(mission?.dateStart) > formatDateForComparaison(today);
        if (futureMission) {
          const startingPoint = new Date(mission?.dateStart).getTime();
          const todayInTimestamp = new Date(today).getTime();
          const days = Math.floor((startingPoint - todayInTimestamp) / 86400000);
          return {
            status: `Démarre dans ${days} jour${days > 2 ? 's' : ''} `,
          }
        } else {

          // Missions avec facture en attente
          if (mission?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT)) {
            if (mission?.invoices?.find(x => x.paymentDate && (formatDateForComparaison(x.paymentDate) <= formatDateForComparaison(today)))) { // Avec retard de facture
              return {
                status: 'Retard de paiement',
                color: 'danger',
                buttonText: 'Payer facture'
              }
            } else {
              if (mission?.invoices?.find(x => x.attachment)) { // Avec facture en PJ
                return {
                  status: 'Facture à payer',
                  buttonText: 'Payer facture'
                }
              }
            }
          }
          if (mission?.invoices?.find(x => x?.status === WAITING_FOR_VALIDATION)) {
            return {
              status: 'Facture en attente de validation', // Sans facture en PJ
              buttonText: "Contrôler le compte rendu d'activité"
            }
          } else {
            // Missions sans facture en attente
            if (mission?.invoices?.find(x => x?.latestInvoice)) {
              return {
                status: 'Travail terminé'
              }
            } else {
              return {
                status: 'Missions en cours'
              }
            }
          }
        }
      }
    }
    const result = getMissionStatus(mission?.invoices?.map(x => x.status), mission);
    setMissionStatus(result);
  }, [mission, today]);

  const handleClick = (param) => {
    if (param?.status === WAITING_FOR_SIGNATURE) {
      setInfosOpen(true)
    } else {
      if (param?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION)) {
        setValidationModalOpen(true);
        setPreselectedFile(sortedCRA[0]);
      } else if (param?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT)) {
        setInvoicesModalOpen(true);
        setPreselectedFile(sortedInvoices[0]);
      } else {
        setLoadingButton(true);
      }
      dispatch(getCompaniesLaunched(companyId));
    }
  }

  // 
  useEffect(() => {
    if (companiesDataFetched && loadingButton) {
      if (!companiesData || !companiesData.administrativeProfile || !companiesData.administrativeProfile.legalDocuments || !companiesData.administrativeProfile.headOffice) {
        setRedirectionPopupOpen(true);
        dispatch(setComingFromDashboard(true)); // Initialize the redirection from the administrative page -> true ? push('/reveal')
        // dispatch(openSnackBar({ message: "Pour accéder à la sélection, il suffit de remplir vos informations administratives", error: false })) //////////////
      } else {
        if (mission?.externalId || matching?.externalId) {
          dispatch(push(`/reveal/${mission?.externalId || matching?.externalId}`));
        }
      }
    }
  }, [companiesDataFetched, companiesData, dispatch, loadingButton, mission, matching])

  const renderMissionButton = (param) => {
    if (param?.status === REFUSED) {
      return (
        <Grid container className={classes.gridRightNoCursor}> {/* Add an empty navlink to fill the button space */}
        </Grid>
      )
    } else if (param?.status === WAITING_FOR_CUSTOMER_SELECTION || param?.status === WAITING_FOR_SIGNATURE || param?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT && x.attachment) || param?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION)) {
      return (
        <Grid container
          className={clsx(classes.gridRight, param?.invoices?.find(x => x.paymentDate < today) ? classes.rightRed : classes.primary)}
          alignItems={'center'} justify={'center'}
          onClick={() => handleClick(param)}
        >
          <Grid item>
            {loadingButton && companiesLoading
              ? <CustomLoader />
              : <Typography className={classes.button}>{matchingValues?.buttonText || missionStatus?.buttonText}</Typography>
            }
          </Grid>
        </Grid >
      )
    } else {
      return (
        <Grid container className={classes.gridRight}> {/* Add an empty navlink to fill the button space */}
          <NavLink to={mission ? `/mission/${mission?.externalId}` : `/brief/${matching?.externalId}`}
            className={clsx(classes.gridCenter)}
          />
        </Grid>
      )
    }
  };

  // Retrieve quotes for the specified "profile matching" missions
  useEffect(() => {
    if (matching?.status === WAITING_FOR_CUSTOMER_SELECTION || mission?.status === WAITING_FOR_SIGNATURE) {
      dispatch(getQuotesLaunched(matching?.externalId));
    }
  }, [matching, mission, dispatch]);

  const missionDone = mission?.status === FINISHED && mission?.invoices?.every(x => x.status === PAID)
  return (
    <Box mt={3} mb={6}>
      <Grid container direction={'column'}>
        {!quotesLoading ?
          <Grid container direction={'row'} className={clsx(classes.container, missionDone ? classes.gridCenterFinished : null)}>
            <Grid container className={clsx(classes.gridLeft, missionDone ? classes.gridLeftFinished : null)} // LEFT PART
              direction={'column'}>
              <Grid container item   // left part, top zone
                className={classes.statusContainer}
                alignItems='center'>
                <Grid item xs={2}>
                  {matching ? getStatusIcon(matching) : getStatusIcon(mission)}
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    className={clsx(classes.statusTitleBase,
                      mission?.status === FINISHED && mission?.dateEnd && missionStatus?.color === 'secondary'
                        ? classes.finishedMission
                        : missionStatus?.color === 'danger'
                          ? classes.statusTitleRed
                          : null)}>
                    {matchingValues?.status || missionStatus?.status}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {mission?.status !== REFUSED &&
                    <IconButton className={classes.buttonIcon} aria-label="display more actions"
                      onClick={() => setOpen(true)} color="secondary">
                      <MenuIcon />
                    </IconButton>}
                </Grid>
              </Grid>

              <Grid item className={classes.titleContainer}>
                <Typography className={classes.title}>{shortenLongText(mission?.brief?.missionContext?.title || matching?.brief?.missionContext?.title || matching?.missionContext?.title, 42)}</Typography>
              </Grid>
              <Grid item className={classes.description}>
                <Typography variant="body2">
                  {(matching?.deliverables || mission?.brief?.deliverables || matching?.brief?.deliverables)?.map((x, key) => `0${key + 1} ${x.text} ${key + 1 !== (matching?.deliverables?.length || matching?.brief?.deliverables.length || mission?.brief?.deliverables?.length) ? '- ' : ''} `)}
                </Typography>
              </Grid>
              {open && <LeftOverlay setOpen={setOpen} matching={matching} mission={mission} />}
            </Grid>

            <NavLink
              to={mission ? `/mission/${mission?.externalId}` : `/brief/${matching?.externalId}`}
              onClick={e => mission?.status === REFUSED ? e.preventDefault() : e}
              className={clsx(classes.gridCenter, missionDone ? classes.gridCenterFinished : mission?.status === REFUSED ? classes.noCursor : null)}>
              <Grid container>  {/*RIGHT PART*/}
                <Grid item container xs={12} direction='row'>
                  {/* 1st column */}
                  <Grid item xs={4}>
                    <Grid item className={classes.blocAvatar}>
                      <CircleImage theme={'avatarLarge'} src={mission?.serviceProviderProfile?.linkedinAvatar || matchingValues?.avatar} icon={matchingValues?.avatar} />
                    </Grid>
                  </Grid>

                  {/* 2nd column */}
                  <Grid item xs={4}>
                    <Grid item className={classes.blocTypoUp}>
                      <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                      <Typography variant={"body1"} className={classes.typo}>{formatType(mission?.brief?.missionContext?.format || matching?.missionContext?.format)}</Typography>
                    </Grid>
                  </Grid>

                  {/* 3rd column */}
                  <Grid item xs={4}>
                    <Grid item className={classes.blocTypoUp}>
                      <Typography variant={"h4"} className={classes.typo}>Taux journalier</Typography>
                      <Typography variant={"body1"} className={classes.typo}>{Math.ceil(mission?.missionContext?.budget?.dailyRate || matching?.missionContext?.budget?.dailyRate)} €/j</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} direction='row'>
                  {/* 1st column */}
                  <Grid item xs={4}>
                    <Grid item className={classes.blocTypoDownAvatar}>
                      <Typography variant={"h4"} className={classes.typo}>
                        {mission?.serviceProviderProfile?.firstName || matching?.serviceProviderProfile?.firstName || matchingValues?.title}
                        {mission?.serviceProviderProfile?.lastName || matching?.serviceProviderProfile?.lastName}
                      </Typography>
                      <Typography variant={"body1"} className={classes.typo}>{mission?.brief?.profile?.text}</Typography>
                      <Typography variant={"body1"} className={classes.typo}>{matchingValues?.subtext}</Typography>
                    </Grid>
                  </Grid>

                  {/* 2nd column */}
                  <Grid item xs={4}>
                    <Grid item className={classes.blocTypoDown}>
                      <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                      <Typography variant={"body1"} className={classes.typo}>
                        {weekly === 5 ? 'Plein temps' : 'Temps partiel'} ({weekly} jours)
                  </Typography>
                    </Grid>
                  </Grid>

                  {/* 3rd column */}
                  <Grid item xs={4}>
                    <Grid item className={classes.blocTypoDown}>
                      <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                      <Typography variant={"body1"} className={classes.typo}>
                        {durationNb}{' '}{t(`dashboard.missions.${durationUnit?.toLowerCase()}`)}{(durationNb > 1 && durationUnit !== 'MONTH') && 's'} à partir du {formatDate(startDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </NavLink>
            {renderMissionButton(matching || mission)}
          </Grid>
          :
          <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={classes.container}>
            <CustomLoader />
          </Grid>
        }
        <Grid container direction={'row'} alignItems={'center'} className={classes.outsideContainer}>
          {matching && <CircleImage src={severinePicture} />}
          <Typography variant="body2" className={classes.outsideTypo}>
            {mission ? mission?.secondaryMessage || '' : 'Séverine est en charge de votre dossier'}
          </Typography>
        </Grid>
        {infosOpen &&
          <QuoteSignatureValidationModal
            open={infosOpen}
            handleClose={() => setInfosOpen(false)}
          />
        }
        {redirectionPopupOpen &&
          <CustomModal
            open={redirectionPopupOpen}
            handleClose={() => setRedirectionPopupOpen(false)}
            title="Avant d’accéder à la sélection nous avons besoin de vos informations administratives"
            withoutButton
            disableBackdrop
          >
            <Typography>Cela ne prend que quelques minutes, nous avons une page dédiée pour ça.</Typography>
            <CustomButton theme='filledButton' title="Compléter mes informations administratives" component={RouterLink} to='/administrative' />
          </CustomModal>
        }
      </Grid>
      {invoicesModalOpen && (
        <InvoiceManagementModal
          open={invoicesModalOpen}
          handleClose={() => setInvoicesModalOpen(false)}
          files={sortedInvoices}
          missionId={mission?.externalId}
          preselectedFile={preselectedFile}
        />
      )}
      <ValidationModal
        open={validationModalOpen}
        setValidationModalOpen={setValidationModalOpen}
        setRefusalModalOpen={setRefusalModalOpen}
        handleClose={() => setValidationModalOpen(false)}
        files={sortedCRA}
        missionId={mission?.externalId}
        preselectedFile={preselectedFile}
      />
      <RefusalModal
        refusalModalOpen={refusalModalOpen}
        setRefusalModalOpen={setRefusalModalOpen} />
    </Box>
  )
};

export default Mission;
