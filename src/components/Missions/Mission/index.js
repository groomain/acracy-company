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
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { SettingsOutlined } from '@material-ui/icons';

import { formatWithLineBreak } from '../../../utils/format';
import * as moment from 'moment';
moment.locale('fr');

export const Mission = ({ mission, matching, ...props }) => {
  // console.log('Mission -> matching', matching)
  // console.log('Mission -> mission', mission)
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const [hoveredMenu, setOveredMenu] = React.useState(false);

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
      default:
        return <EnCoursIcon className={classes.icon} />; ///////////// CHECK IF ALL CASES ARE OK
    }
  };

  const inTwoDays = moment.unix(matching?.missionContext.startDate + 24 * 3600 * 2).format("DD/MM/YYYY")

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
            subtext: `Garanti en 48h.\n Estimé au ${inTwoDays}`
          };
        case 'WAITING_FOR_CUSTOMER_SELECTION':
          return {
            status: 'Faites votre sélection',
            avatar: '?',
            title: `Découvrir les profils`,
            subtext: 'Nous vous proposons X top freelance ! (=nb de quotes)'
          };
        case 'WAITING_FOR_SIGNATURE':
          return {
            status: 'Devis à valider',

          };
        default:
          break;
      }
    }
    const result = getBriefStatus(matching?.status);
    setMatchingValues(result);
  }, [matching]);

  return (
    <Box mt={3} mb={6}>
      <Grid container direction={'column'}>
        {!props.isLoading ?
          <Grid container direction={'row'} className={classes.container}>
            <Grid container className={clsx(classes.gridLeft, { [classes.gridLeftFinished]: props.status === 6 })}
              direction={'column'}>
              <Grid container item className={classes.statusContainer} direction={'row'}>
                {getStatusIcon(matching?.status)}
                <Typography
                  className={clsx(classes.statusTitle, { [classes.statusTitleRed]: props.status === 5 })}>{matchingValues?.status.toUpperCase() || "mission en cours"}</Typography>
                <div style={{ flexGrow: 1 }} />
                <IconButton className={classes.buttonIcon} aria-label="display more actions"
                  onClick={() => setOpen(true)} color="secondary">
                  <MenuIcon className={classes.menuIcon} hovered={hoveredMenu && hoveredMenu}
                    onMouseEnter={() => setOveredMenu(true)}
                    onMouseLeave={() => setOveredMenu(false)} />
                </IconButton>
              </Grid>
              <Grid item className={classes.titleContainer}>
                <Typography className={classes.title}>{mission?.brief.missionContext.title || matching?.missionContext.title}</Typography>
              </Grid>
              <Grid item className={classes.description}>
                <Typography variant="body2">
                  {(matching?.deliverables || mission?.brief.deliverables).map((x, key) => `0${key + 1} ${x.text} ${key + 1 !== (matching?.deliverables.length || mission?.brief.deliverables.length) ? '- ' : ''}`)}</Typography>
              </Grid>
              {open && <LeftOverlay setOpen={setOpen} />}
            </Grid>
            <Grid container direction={'row'}
              className={clsx(classes.gridCenter, { [classes.gridCenterFinished]: props.status === 6 })}>
              <Grid container item xs={4} direction={'column'} alignItems={'center'}>
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
              <Grid container item xs={4} direction={'column'} alignItems={'center'}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                  <Typography variant={"body1"} className={classes.typo}>{mission?.brief.missionContext.format || matching?.missionContext.format}</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                  <Typography variant={"body1"} className={classes.typo}>
                    Plein temps ( {mission?.brief.missionContext.weeklyRythm || matching?.missionContext.weeklyRythm} jours)
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={4} direction={'column'} alignItems={'center'}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Taux journalier</Typography>
                  <Typography variant={"body1"} className={classes.typo}>550 €/j</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                  <Typography variant={"body1"} className={classes.typo}>10 jours à partir du
                                    20/05/20</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container
              className={clsx(classes.gridRight, { [classes.withoutButton]: props.status === 6 }, { [classes.rightRed]: props.status === 5 })}
              alignItems={'center'} justify={'center'}>
              {props.status !== 6 &&
                <Grid item>
                  <Typography className={classes.button}>Confirmer la fin de la mission</Typography>
                </Grid>
              }
            </Grid>
          </Grid>
          :
          <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={classes.container}>
            <CircularProgress />
          </Grid>
        }
        {!props.isLoading &&
          <Grid container direction={'row'} alignItems={'center'} className={classes.outsideContainer}>
            <CircleImage />
            <Typography variant="body2" className={classes.outsideTypo}>Severine est en charge de votre
                        dossier</Typography>
          </Grid>
        }
      </Grid>
    </Box>
  )
};

export default Mission;
