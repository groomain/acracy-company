import React, { useState, useEffect } from 'react';
import styles from './styles';
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
import { WhiteCircle } from '../../../assets/icons/WhiteCircle';
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { SettingsOutlined } from '@material-ui/icons';

import { NavLink } from 'react-router-dom';

import { shortenLongText, addTwoWorkingDays, formatDate } from '../../../utils/services/format';
import * as moment from 'moment';
moment.locale('fr');

export const Mission = ({ mission, matching, today, ...props }) => {
  const classes = styles();
  const [open, setOpen] = React.useState(false);

  const weekly = mission?.brief.missionContext.weeklyRythm || matching?.missionContext.weeklyRythm;
  const durationNb = mission?.brief.missionContext.duration.nb || matching?.missionContext.duration.nb;
  const durationUnit = mission?.brief.missionContext.duration.unit || matching?.missionContext.duration.unit;
  const startDate = mission?.brief.missionContext.startDate || matching?.missionContext.startDate;

  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <AValiderIcon className={classes.icon} />;
      case 'WAITING_FOR_MATCHING':
      case 'WAITING_FOR_CUSTOMER_SELECTION':
        return <MatchingIcon className={classes.icon} />;
      case 2:
        return <DemarreIcon className={classes.icon} />;
      case 'WAITING_FOR_ACCEPTANCE':
      case 'WAITING_FOR_SIGNATURE':
        return <EnCoursIcon className={classes.icon} />;
      case 4:
        return <TravailIcon className={classes.icon} />;
      case 5:
        return <RetardIcon className={classes.icon} />;
      case 6:
        return <MissionHistoIcon className={classes.icon} />;
      case 'FINISHED':
        return <WhiteCircle className={classes.icon} />;
      default:
        return <EnCoursIcon className={classes.icon} />; ///////////// CHECK IF ALL CASES ARE OK
    }
  };

  const [matchingValues, setMatchingValues] = useState();
  useEffect(() => {
    const getBriefStatus = (briefStatus) => {
      switch (briefStatus) {
        case 'WAITING_FOR_ACCEPTANCE':
          return {
            status: 'Validation du brief en cours',
            avatar: match,
            title: ''
          };
        case 'WAITING_FOR_MATCHING':
        case 'WAITING_FOR_QUOTES':
          return {
            status: 'Matching en cours',
            avatar: match,
            title: 'Matching en cours',
            subtext: `Garanti en 48h.\n Estimé au ${addTwoWorkingDays(startDate * 1000, 2)}`
          };
        case 'WAITING_FOR_CUSTOMER_SELECTION':
          return {
            status: 'Faites votre sélection',
            avatar: '?',
            title: `Découvrir les profils`,
            subtext: 'Nous vous proposons X top freelance ! (=nb de quotes)',
            buttonText: 'Sélectionner profil'
          };
        case 'WAITING_FOR_SIGNATURE':
          return {
            status: 'Devis à valider',
            buttonText: 'Valider devis'
          };
        default:
          break;
      }
    }
    const result = getBriefStatus(matching?.status);
    setMatchingValues(result);
  }, [matching, startDate]);

  const missionStatus = () => {
    if (today && mission?.brief.missionContext.startDate > today) {
      const days = Math.floor((mission?.brief.missionContext.startDate - today) / 86400);
      return `Démarre dans ${days} jour${days > 2 ? 's' : ''}`;
    } else if (mission?.status === 'FINISHED') {
      return `Mission finalisée le ${formatDate(mission?.brief.dateEnd)}`
    }
  };

  const renderMissionButton = (status) => {
    switch (status) {
      case 'WAITING_FOR_CUSTOMER_SELECTION':
      case 'WAITING_FOR_SIGNATURE':
        return (
          <Grid container
            className={clsx(classes.gridRight, { [classes.withoutButton]: props.status === 6 }, { [classes.rightRed]: props.status === 5 })}
            alignItems={'center'} justify={'center'}>
            {props.status !== 6 &&
              <Grid item>
                <Typography className={classes.button}>{matchingValues?.buttonText}</Typography>
              </Grid>}
          </Grid>
        )
      default:
        break;
    }
  };

  return (
    <Box mt={3} mb={6}>
      <Grid container direction={'column'}>
        {!props.isLoading ?
          <Grid container direction={'row'} className={classes.container}>
            <Grid container className={clsx(classes.gridLeft, { [classes.gridLeftFinished]: props.status === 6 })}
              direction={'column'}>
              <Grid container item className={classes.statusContainer} direction={'row'}>
                {matching ? getStatusIcon(matching?.status) : getStatusIcon(mission?.status)}
                <Typography
                  className={clsx(classes.statusTitle, mission?.status === 'FINISHED' ? classes.finishedMission : null, { [classes.statusTitleRed]: props.status === 5 })}>
                  {matchingValues?.status || missionStatus()}
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <IconButton className={classes.buttonIcon} aria-label="display more actions"
                  onClick={() => setOpen(true)} color="secondary">
                  <MenuIcon className={classes.menuIcon} />
                </IconButton>
              </Grid>
              <Grid item className={classes.titleContainer}>
                <Typography className={classes.title}>{shortenLongText(mission?.brief.missionContext.title || matching?.missionContext.title, 42)}</Typography>
              </Grid>
              <Grid item className={classes.description}>
                <Typography variant="body2">
                  {(matching?.deliverables || mission?.brief.deliverables).map((x, key) => `0${key + 1} ${x.text} ${key + 1 !== (matching?.deliverables.length || mission?.brief.deliverables.length) ? '- ' : ''}`)}</Typography>
              </Grid>
              {open && <LeftOverlay setOpen={setOpen} matching={matching} mission={mission} />}
            </Grid>

            <NavLink
              to={`/mission/${mission?.externalId}` || `/mission/${matching?.externalId}`}
              className={clsx(classes.gridCenter, { [classes.gridCenterFinished]: props.status === 6 })}>
              {/* 1st column */}
              <Grid item xs={4}>
                <Grid item className={classes.blocAvatar}>
                  <CircleImage theme={'avatarLarge'} src={mission?.serviceProviderProfile.linkedinAvatar || matchingValues?.avatar} icon={matchingValues?.avatar} />
                </Grid>

                {/* ///// */}
                <Grid item className={classes.blocTypoDownAvatar}>
                  <Typography variant={"h4"} className={classes.typo}>{mission?.serviceProviderProfile.firstName || matchingValues?.title} {mission?.serviceProviderProfile.lastName}</Typography>
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief.profile.text || matchingValues?.subtext}</Typography>
                </Grid>
                {/* /////// */}

              </Grid>

              {/* 2nd column */}
              <Grid item xs={4}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief.missionContext.format || matching?.missionContext.format}</Typography>
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
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief.missionContext.estimatedAverageDailyRate || matching?.missionContext.estimatedAverageDailyRate} €/j</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                  <Typography variant={"body1"} className={classes.typo}>
                    {durationNb}{' '}{durationUnit.toLowerCase()}{durationNb > 1 && 's'} à partir du {formatDate(startDate)}
                  </Typography>
                </Grid>
              </Grid>
            </NavLink>
            {renderMissionButton(matching?.status || mission?.status)}
          </Grid>
          :
          <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={classes.container}>
            <CircularProgress />
          </Grid>
        }
        <Grid container direction={'row'} alignItems={'center'} className={classes.outsideContainer}>
          {matching && <CircleImage />}
          <Typography variant="body2" className={classes.outsideTypo}>
            {mission ? mission?.secondaryMessage || '' : 'Séverine est en charge de votre dossier'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Mission;
