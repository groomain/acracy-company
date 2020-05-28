import React from 'react';
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
import {FactureIcon} from "../../assets/icons/FactureIcon";
import {BriefIcon} from "../../assets/icons/BriefIcon";
import {DevisIcon} from "../../assets/icons/DevisIcon";
import DownloadModal from "../DownloadModal";

export const MissionSuivi = ({briefData, ...props}) => {
    const classes = styles();
    const [devisOpen, setDevisOpen] = React.useState(false);
    const [factureOpen, setfactureOpen] = React.useState(false);
    const [briefOpen, setBriefOpen] = React.useState(false);
    const existingSteps = {
        "WAITING_FOR_ACCEPTANCE": 0,
        "WAITING_FOR_MATCHING": 1,
        "WAITING_FOR_QUOTES": 2,
        "WAITING_FOR_CUSTOMER_SELECTION": 3,
        "IN_PROGRESS": 4,
        "CLOSED": 5
    };
    const step = briefData ? existingSteps[briefData.status] : 0;

    return (
        <Grid container direction={'column'} className={classes.root} {...props}>
            <Typography variant={"h1"} className={classes.title}>Suivi</Typography>
            <Typography variant={"h1"} className={classes.title}>de la mission</Typography>
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatar}>
                        {step > 0 ? <img src={checkStatus} alt="Done"/> : <img src={missionEnCours} alt="Brief"/>}
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.textItem}
                        primaryTypographyProps={{className: clsx(classes.text, {[classes.textDone]: step >= 0})}}
                        secondaryTypographyProps={{className: clsx(classes.secondaryText, {[classes.textDone]: step >= 0})}}
                        primary="Brief"
                        secondary={step >= 0 && "Validation en cours"}/>
                    {step >= 0 && <BriefIcon number={1} onClick={() => setBriefOpen(true)} className={classes.downloadIcon}/>}
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatar}>
                        {step < 1 && <img className={classes.littleIcon} src={matching} alt="matching"/>}
                        {step === 1 && <img src={matchingEnCours} alt="matchingEnCours"/>}
                        {step > 1 && <img src={checkStatus} alt="checkStatus"/>}
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.textItem}
                        primaryTypographyProps={{className: clsx(classes.text, {[classes.textDone]: step >= 1})}}
                        secondaryTypographyProps={{className: clsx(classes.secondaryText, {[classes.textDone]: step >= 1})}}
                        primary="Matching"
                        secondary={step >= 1 && "Garanti en moins de 48h"}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatar}>
                        {step < 2 && <img className={classes.littleIcon} src={selectionProfil} alt="selectionProfil"/>}
                        {step === 2 && <img src={selectionProfilYellow} alt="selectionProfilYellow"/>}
                        {step > 2 && <img src={checkStatus} alt="checkStatus"/>}
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.textItem}
                        primaryTypographyProps={{className: clsx(classes.text, {[classes.textDone]: step >= 2})}}
                        secondaryTypographyProps={{className: clsx(classes.secondaryText, {[classes.textDone]: step >= 2})}}
                        primary="Sélection profil"
                        secondary={step >= 2 && ""}/>
                    {step >= 2 && <DevisIcon number={1} onClick={() => (setDevisOpen(true))} className={classes.downloadIcon}/>}
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatar}>
                        {step < 3 && <img className={classes.littleIcon} src={startMission} alt="startMission"/>}
                        {step === 3 && <img src={startMissionEnCours} alt="startMissionEnCours"/>}
                        {step > 3 && <img src={checkStatus} alt="checkStatus"/>}
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.textItem}
                        primaryTypographyProps={{className: clsx(classes.text, {[classes.textDone]: step >= 3})}}
                        secondaryTypographyProps={{className: clsx(classes.secondaryText, {[classes.textDone]: step >= 3})}}
                        primary="Début de la mission"
                        secondary={step >= 3 && briefData.missionContext.startDate}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatar}>
                        {step < 4 && <img className={classes.littleIcon} src={endMission} alt="endMission"/>}
                        {step === 4 && <img src={endMissionEnCours} alt="endMissionEnCours"/>}
                        {step > 4 && <img src={checkStatus} alt="checkStatus"/>}
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.textItem}
                        primaryTypographyProps={{className: clsx(classes.text, {[classes.textDone]: step >= 4})}}
                        secondaryTypographyProps={{className: clsx(classes.secondaryText, {[classes.textDone]: step >= 4})}}
                        primary="Fin de la mission"
                        secondary={step >= 4 && "XX factures à télécharger"}/>
                    {step >= 4 && <FactureIcon number={2} onClick={() => (setfactureOpen(true))} className={classes.downloadIcon}/>}
                </ListItem>
            </List>
            <DownloadModal open={devisOpen}
                           files={["Devis 20.05.2020", "Devis 05.04.2020", "Devis 14.02.2020"]}
                           type={"devis"}
                           setOpen={setDevisOpen}
            />
            <DownloadModal open={factureOpen}
                           files={["Facture 20.05.2020", "Facture 05.04.2020", "Facture 14.02.2020"]}
                           type={"factures"}
                           setOpen={setfactureOpen}
            />
            <DownloadModal open={briefOpen}
                           files={["Brief 20.05.2020"]}
                           type={"brief"}
                           setOpen={setBriefOpen}
            />
        </Grid>
    )
};

export default MissionSuivi;
