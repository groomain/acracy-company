import React from 'react';
import { useDispatch } from "react-redux";
import styles from './styles';
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from "@material-ui/core/Typography";
import missionEnCours from "../../assets/icons/mission-en-cours.svg";
import matching from "../../assets/icons/group-28.svg";
import matchingEnCours from "../../assets/icons/matching-en-cours.svg";
import selectionProfil from "../../assets/icons/selection-profils.svg";
import selectionProfilYellow from "../../assets/icons/selection-profils-yellow.svg";
import startMission from "../../assets/icons/group-4-copy-8.svg";
import startMissionEnCours from "../../assets/icons/group-37.svg";
import endMissionEnCours from "../../assets/icons/group-38.svg";
import endMission from "../../assets/icons/group-4-copy-7.svg";
import checkStatus from "../../assets/icons/check-statut.svg";
import clsx from "clsx";
import { FactureIcon } from "../../assets/icons/FactureIcon";
import { BriefIcon } from "../../assets/icons/BriefIcon";
import { DevisIcon } from "../../assets/icons/DevisIcon";
import DownloadModal from "../DownloadModal";
import { downloadFileLaunched } from '../DownloadModal/reducer';

export const MissionSuivi = ({ data, pathname, ...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const [devisOpen, setDevisOpen] = React.useState(false);
  const [factureOpen, setfactureOpen] = React.useState(false);
  const [briefOpen, setBriefOpen] = React.useState(false);
  const existingSteps = {
    "WAITING_FOR_ACCEPTANCE": 0,
    "WAITING_FOR_MATCHING": 1,
    "WAITING_FOR_QUOTES": 1,
    "WAITING_FOR_CUSTOMER_SELECTION": 2,
    "IN_PROGRESS": 3,
    "CLOSED": 4
  };
  const step = data.status ? existingSteps[data.status] : 0;

  const downloadFile = (payload) => {
    dispatch(downloadFileLaunched(payload));
  };

  return (
    <Grid container direction={'column'} className={classes.root} {...props}>
      <Typography variant={"h1"} className={classes.title}>Suivi</Typography>
      <Typography variant={"h1"} className={classes.title}>de la mission</Typography>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <ListItemAvatar className={classes.avatar}>
            {step > 0 ? <img src={checkStatus} alt="Done" /> : <img src={missionEnCours} alt="Brief" />}
          </ListItemAvatar>
          <ListItemText
            className={classes.textItem}
            primaryTypographyProps={{ className: clsx(classes.text, { [classes.textDone]: step >= 0 }) }}
            secondaryTypographyProps={{ className: clsx(classes.secondaryText, { [classes.textDone]: step >= 0 }) }}
            primary="Brief"
            secondary={step >= 0 && "Validation en cours"} />
          {(step >= 0 && data?.briefSummary) && <BriefIcon number={data?.briefSummary.length || 0}
            // onClick={() => setBriefOpen(true)}
            onClick={() => downloadFile({ attachmentId: data?.briefSummary?.externalId })}
            className={classes.downloadIcon} />}
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar className={classes.avatar}>
            {step < 1 && <img className={classes.littleIcon} src={matching} alt="matching" />}
            {step === 1 && <img src={matchingEnCours} alt="matchingEnCours" />}
            {step > 1 && <img src={checkStatus} alt="checkStatus" />}
          </ListItemAvatar>
          <ListItemText
            className={classes.textItem}
            primaryTypographyProps={{ className: clsx(classes.text, { [classes.textDone]: step >= 1 }) }}
            secondaryTypographyProps={{ className: clsx(classes.secondaryText, { [classes.textDone]: step >= 1 }) }}
            primary="Matching"
            secondary={step >= 1 && "Garanti en moins de 48h"} />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar className={classes.avatar}>
            {step < 2 && <img className={classes.littleIcon} src={selectionProfil} alt="selectionProfil" />}
            {step === 2 && <img src={selectionProfilYellow} alt="selectionProfilYellow" />}
            {step > 2 && <img src={checkStatus} alt="checkStatus" />}
          </ListItemAvatar>
          <ListItemText
            className={classes.textItem}
            primaryTypographyProps={{ className: clsx(classes.text, { [classes.textDone]: step >= 2 }) }}
            secondaryTypographyProps={{ className: clsx(classes.secondaryText, { [classes.textDone]: step >= 2 }) }}
            primary="Sélection profil"
            secondary={step >= 2 && ""} />
          {step >= 2 && data.signedQuote && <DevisIcon number={1} onClick={() => (setDevisOpen(true))} className={classes.downloadIcon} />}
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar className={classes.avatar}>
            {step < 3 && <img className={classes.littleIcon} src={startMission} alt="startMission" />}
            {step === 3 && <img src={startMissionEnCours} alt="startMissionEnCours" />}
            {step > 3 && <img src={checkStatus} alt="checkStatus" />}
          </ListItemAvatar>
          <ListItemText
            className={classes.textItem}
            primaryTypographyProps={{ className: clsx(classes.text, { [classes.textDone]: step >= 3 }) }}
            secondaryTypographyProps={{ className: clsx(classes.secondaryText, { [classes.textDone]: step >= 3 }) }}
            primary="Début de la mission"
            secondary={step >= 3 && data.status === 'WAITING_FOR_SIGNATURE' ? 'Devis à valider' : data.brief.missionContext.startDate} />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar className={classes.avatar}>
            {step < 4 && <img className={classes.littleIcon} src={endMission} alt="endMission" />}
            {step === 4 && <img src={endMissionEnCours} alt="endMissionEnCours" />}
            {step > 4 && <img src={checkStatus} alt="checkStatus" />}
          </ListItemAvatar>
          <ListItemText
            className={classes.textItem}
            primaryTypographyProps={{ className: clsx(classes.text, { [classes.textDone]: step >= 4 }) }}
            secondaryTypographyProps={{ className: clsx(classes.secondaryText, { [classes.textDone]: step >= 4 }) }}
            primary="Fin de la mission"
            secondary={step >= 4 && `${data.invoices.length} facture(s) à télécharger`} />
          {step >= 4 && data.invoices && <FactureIcon number={data.invoices.length} onClick={() => (setfactureOpen(true))} className={classes.downloadIcon} />}
        </ListItem>
      </List>
      {step >= 2 && data.signedQuote &&
        <DownloadModal open={devisOpen}
          files={[data.signedQuote]}
          type={"devis"}
          setOpen={setDevisOpen}
        />}
      {step >= 4 && data.invoices &&
        <DownloadModal open={factureOpen}
          files={data.invoices.map((invoice) => invoice.attachment)}
          type={"facture"}
          setOpen={setfactureOpen}
        />}
      {/* Plus besoin de modale : on télécharge le brief directement en cliquant sur l'icône */}
      {/* { data?.briefSummary &&
                <DownloadModal open={briefOpen}
                               files={[{externalId: data.briefSummary.externalId, name: "Détails Brief"}]}
                               type={"brief"}
                               setOpen={setBriefOpen}
                />
            } */}
    </Grid>
  )
};

export default MissionSuivi;
