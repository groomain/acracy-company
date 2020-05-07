import React from 'react';
import styles from './styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircleImage from "../CircleImage";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from '@material-ui/icons/MoreVert';
import {basierMedium, basierRegular} from "../../utils/configureMaterialTheme";
import {IncidentIcon} from "../../assets/icons/IncidentIcon";
import {AdresseIcon} from "../../assets/icons/AdresseIcon";
import {DownloadIcon} from "../../assets/icons/DownloadIcon";
import {NavLink} from "react-router-dom";
import LeftOverlay from "./LeftOverlay";
import {CloseIcon} from "../../assets/icons/CloseIcon";

export const Mission = ({...props}) => {
    const classes = styles();
    const [open, setOpen] = React.useState(false);

    return (
        <Grid container direction={'row'} className={classes.container}>
            <Grid container className={classes.gridLeft} direction={'column'}>
                <Grid container item style={{height: '14%', padding: 12}} direction={'row'}>
                    <Typography
                        style={{fontSize: 14, fontFamily: basierRegular, color: '#ecf805',}}>Mission</Typography>
                    <div style={{flexGrow: 1,}}/>
                    <IconButton style={{width: 25, height: 25, marginRight: 5}} aria-label="display more actions"
                                onClick={() => setOpen(true)} color="secondary">
                        <MoreIcon/>
                    </IconButton>
                </Grid>
                <Grid item style={{height: '43%', paddingTop: '13%', paddingLeft: 30, paddingRight: 38}}>
                    <Typography>Mon titre décrivant ma mission en trois lignes et lorem ipsum</Typography>
                </Grid>
                <Grid item style={{height: '43%', paddingLeft: 30, paddingRight: 38}}>
                    <Typography>Livrable 01 - Livrable 02 Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.</Typography>
                </Grid>
                {open && <LeftOverlay setOpen={setOpen}/>}
            </Grid>
            <Grid container direction={'row'} className={classes.gridCenter}>
                <Grid container item xs={4} direction={'column'} alignItems={'center'}>
                    <Grid item className={classes.blocAvatar}>
                        <CircleImage theme={'avatarLarge'}/>
                    </Grid>
                    <Grid item className={classes.blocTypoDownAvatar}>
                        <Typography variant={"h4"} className={classes.typo}>Anh-Dao Lépinaux</Typography>
                        <Typography variant={"body1"} className={classes.typo}>Télétravail uniquement</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={4} direction={'column'} alignItems={'center'}>
                    <Grid item className={classes.blocTypoUp}>
                        <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                        <Typography variant={"body1"} className={classes.typo}>Télétravail uniquement</Typography>
                    </Grid>
                    <Grid item className={classes.blocTypoDown}>
                        <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                        <Typography variant={"body1"} className={classes.typo}>Plein temps (5 jours)</Typography>
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
            <Grid container className={classes.gridRight} alignItems={'center'} justify={'center'}>
                <Grid item>
                    <Typography className={classes.button}>Confirmer la fin de la mission</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default Mission;
