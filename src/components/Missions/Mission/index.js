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
import InvoiceManagementModal from '../../InvoiceManagementModal';
import styles from './styles';

import { getQuotesLaunched, getCompaniesLaunched, setComingFromDashboard } from '../../../pages/HomePage/reducer';
import severinePicture from '../../../assets/pics/severine/severine-small.png';
import { shortenLongText, addTwoWorkingDays, formatDate } from '../../../utils/services/format';
import { getPath } from '../../../utils/services/validationChecks';
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
  WAITING_FOR_QUOTES
} from '../constants';
moment.locale('fr');

export const Mission = ({ mission, matching, today, ...props }) => {

  const dispatch = useDispatch();
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [infosOpen, setInfosOpen] = useState(false);
  const [redirectionPopupOpen, setRedirectionPopupOpen] = useState(false);
  const [invoicesModalOpen, setInvoicesModalOpen] = useState(false);

  const weekly = mission?.brief?.missionContext?.weeklyRythm || matching?.missionContext?.weeklyRythm;
  const durationNb = mission?.brief?.missionContext?.duration?.nb || matching?.missionContext?.duration?.nb;
  const durationUnit = mission?.brief?.missionContext?.duration?.unit || matching?.missionContext?.duration?.unit;
  const startDate = mission?.brief?.missionContext?.startDate || matching?.missionContext?.startDate;

  const { quotes, quotesLoading, companiesData, companiesLoading, companiesDataFetched } = useSelector(state => ({
    quotes: state.getIn(['dashboard', 'quotes']),
    quotesLoading: state.getIn(['dashboard', 'quotesLoading']),
    companiesData: state.getIn(['dashboard', 'companiesData']),
    companiesLoading: state.getIn(['dashboard', 'companiesLoading']),
    companiesDataFetched: state.getIn(['dashboard', 'companiesDataFetched'])
  }));

  const getStatusIcon = (mission) => {
    const status = mission?.status;
    if (status === WAITING_FOR_ACCEPTANCE || status === WAITING_FOR_SIGNATURE) {
      return <AValiderIcon className={classes.icon} />;
    } else if (status === WAITING_FOR_MATCHING || status === WAITING_FOR_CUSTOMER_SELECTION) {
      return <MatchingIcon className={classes.icon} />;
    } else if (!mission?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT)) {
      if (status === IN_PROGRESS) {
        return <EnCoursIcon className={classes.icon} />;
      } else if (status === FINISHED) {
        return <TravailIcon className={classes.icon} />;
      }
    } else {
      if (mission?.invoices?.find(x => x.paymentDate < today)) {
        return <RetardIcon className={classes.icon} />;
      } else {
        if (getPath(mission?.invoices?.attachement).length > 0 || !mission?.invoices?.attachment) {
          return <TravailIcon className={classes.icon} />;
        } else {
          if (status === IN_PROGRESS) {
            if (mission?.dateStart > today) {
              return <DemarreIcon className={classes.icon} />
            } else {
              return <EnCoursIcon className={classes.icon} />;
            }
          } else if (status === FINISHED) {
            if (mission?.dateEnd.length > 1) {
              return <MissionHistoIcon className={classes.icon} />;
            } else {
              return <TravailIcon className={classes.icon} />;
            }
          }
        }
      }
    }
    return <EnCoursIcon className={classes.icon} />;
  }

  const [matchingValues, setMatchingValues] = useState();
  useEffect(() => {
    const getBriefStatus = (briefStatus) => {
      switch (briefStatus) {
        case WAITING_FOR_ACCEPTANCE:
          return {
            status: 'Validation du brief en cours',
            avatar: match,
            title: ''
          };
        case WAITING_FOR_MATCHING:
        case WAITING_FOR_QUOTES:
          return {
            status: 'Matching en cours',
            avatar: match,
            title: 'Matching en cours',
            subtext: `Garanti en 48h.\n Estimé au ${addTwoWorkingDays(startDate, 2)
              }`
          };
        case WAITING_FOR_CUSTOMER_SELECTION:
          return {
            status: 'Faites votre sélection',
            avatar: '?',
            title: `Découvrir les profils`,
            subtext: `Nous vous proposons ${quotes?.length ?? 0} top freelance!`,
            buttonText: 'Sélectionner profil'
          };
        case WAITING_FOR_SIGNATURE:
          return {
            status: 'Devis à valider',
            buttonText: 'Valider devis',
            avatar: quotes?.brief.serviceProviderProfile.linkedinAvatar,
            title: `${quotes?.brief.serviceProviderProfile.firstName} ${quotes?.brief.serviceProviderProfile.lastName} `,
            subtext: quotes?.brief.serviceProviderProfile.profile.text
          };
        default:
          break;
      }
    }
    const result = getBriefStatus(matching?.status);
    setMatchingValues(result);
  }, [matching, startDate, quotes]);

  const [missionStatus, setMissionStatus] = useState();
  useEffect(() => {
    const getMissionStatus = (missionInvoiceStatus, mission) => {

      const futureMission = mission?.dateStart > today;
      const days = Math.floor((mission?.dateStart - today) / 86400);

      if (futureMission) {
        return {
          status: `Démarre dans ${days} jour${days > 2 ? 's' : ''} `,
          color: 'primary'
        }
      }

      // No invoice with "WAITING_FOR_PAYMENT" status
      if (!mission?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT)) {
        if (mission?.status === FINISHED) {
          if (mission?.dateEnd?.length < 1) {
            return {
              status: `Mission finalisée le ${formatDate(mission?.dateEnd)} `,
            }
          } else {
            return {
              status: 'Travail terminé'
            }
          }
        }

        if (mission?.status === IN_PROGRESS) {
          return {
            status: 'Mission en cours'
          }
        }
      } else {
        // At least 1 invoice has "WAITING_FOR_PAYMENT" status
        if (mission?.invoices?.find(x => x.paymentDate < today)) {
          return {
            status: 'Retard de paiement',
            color: 'danger',
            buttonText: 'Payer facture'
          }
        }
        if (mission?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION && getPath(x.attachment, "attachment").length > 0)) {
          return {
            status: 'Facture à payer',
            buttonText: 'Payer facture'
          }
        }
        if (mission?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION && (!x.attachment || getPath(x.attachment, "attachment").length === 0))) {
          return {
            status: 'Valider CRA',
            buttonText: 'CRA à valider'
          }
        }
      }
    }
    const result = getMissionStatus(mission?.invoices?.map(x => x.status), mission);
    setMissionStatus(result);
  }, [mission, today]);

  const [loadingButton, setLoadingButton] = useState(false);
  const handleClick = (status) => {
    if (status === WAITING_FOR_SIGNATURE) {
      setInfosOpen(true)
    } else if (status?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT) || status?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION))
      setInvoicesModalOpen(true);
    else {
      setLoadingButton(true);
    }
  }

  // 
  useEffect(() => {
    if (companiesDataFetched && loadingButton) {
      if (getPath(companiesData, 'companiesData').length !== 0) {
        setRedirectionPopupOpen(true);
        dispatch(setComingFromDashboard(true)); // Initialize the redirection from the administrative page -> true ? push('/reveal')
      } else {
        dispatch(push(`/reveal/${mission?.externalId || matching?.externa}`));
      }
    }
  }, [companiesDataFetched, companiesData, dispatch, loadingButton, mission, matching])

  const renderMissionButton = (status) => {
    if (status === WAITING_FOR_CUSTOMER_SELECTION || status === WAITING_FOR_SIGNATURE || status?.invoices?.find(x => x.status === WAITING_FOR_PAYMENT) || status?.invoices?.find(x => x.status === WAITING_FOR_VALIDATION)) {
      return (
        <Grid container
          className={clsx(classes.gridRight, status?.invoices?.find(x => x.paymentDate < today) ? classes.rightRed : classes.primary)}
          alignItems={'center'} justify={'center'}
          onClick={() => handleClick(status)}
        >
          <Grid item>
            {loadingButton && companiesLoading
              ? <CustomLoader />
              : <Typography className={classes.button}>{matchingValues?.buttonText || missionStatus?.buttonText}</Typography>
            }
          </Grid>
        </Grid >
      )
    }
  };

  // Retrieve quotes for the specified "profile matching" missions
  useEffect(() => {
    if (matching?.status === WAITING_FOR_CUSTOMER_SELECTION || mission?.status === WAITING_FOR_SIGNATURE) {
      dispatch(getQuotesLaunched(matching?.externalId));
    }
  }, [matching, mission, dispatch]);

  return (
    <Box mt={3} mb={6}>
      <Grid container direction={'column'}>
        {!quotesLoading ?
          <Grid container direction={'row'} className={classes.container}>
            <Grid container className={clsx(classes.gridLeft, { [classes.gridLeftFinished]: props.status === 6 })}
              direction={'column'}>
              <Grid container item className={classes.statusContainer} direction={'row'}>
                {matching ? getStatusIcon(matching) : getStatusIcon(mission)}
                <Typography
                  className={clsx(classes.statusTitleBase,
                    mission?.status === FINISHED
                      ? classes.finishedMission
                      : missionStatus?.color === 'danger'
                        ? classes.statusTitleRed
                        : classes.statusTitle)}>
                  {matchingValues?.status || missionStatus?.status}
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <IconButton className={classes.buttonIcon} aria-label="display more actions"
                  onClick={() => setOpen(true)} color="secondary">
                  <MenuIcon className={classes.menuIcon} />
                </IconButton>
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
              className={clsx(classes.gridCenter, { [classes.gridCenterFinished]: props.status === 6 })}>
              {/* 1st column */}
              <Grid item xs={4}>
                <Grid item className={classes.blocAvatar}>
                  <CircleImage theme={'avatarLarge'} src={mission?.serviceProviderProfile?.linkedinAvatar || matchingValues?.avatar} icon={matchingValues?.avatar} />
                </Grid>
                <Grid item className={classes.blocTypoDownAvatar}>
                  <Typography variant={"h4"} className={classes.typo}>{mission?.serviceProviderProfile?.firstName || matchingValues?.title} {mission?.serviceProviderProfile?.lastName}</Typography>
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief?.profile?.text || matchingValues?.subtext}</Typography>
                </Grid>
              </Grid>

              {/* 2nd column */}
              <Grid item xs={4}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief?.missionContext?.format || matching?.missionContext?.format}</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                  <Typography variant={"body1"} className={classes.typo}>
                    {weekly === 5 ? 'Plein temps' : 'Temps partiel'} ({weekly} jours)
                  </Typography>
                </Grid>
              </Grid>

              {/* 3rd column */}
              <Grid item xs={4}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Taux journalier</Typography>
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief?.missionContext?.estimatedAverageDailyRate || matching?.missionContext?.estimatedAverageDailyRate} €/j</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                  <Typography variant={"body1"} className={classes.typo}>
                    {durationNb}{' '}{durationUnit?.toLowerCase()}{durationNb > 1 && 's'} à partir du {formatDate(startDate)}
                  </Typography>
                </Grid>
              </Grid>
            </NavLink>
            {renderMissionButton(matching?.status || mission)}
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
          <CustomModal
            open={infosOpen}
            handleClose={() => setInfosOpen(false)}
            title="EN ATTENTE WORDING"
          >
            <Typography>Le devis vous a été envoyé par email pour signature</Typography>
          </CustomModal>
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
          files={mission?.invoices}
        />
      )}
    </Box>
  )
};

export default Mission;
