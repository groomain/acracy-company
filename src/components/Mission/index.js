import React from 'react';
import styles from './styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircleImage from "../CircleImage";
import IconButton from "@material-ui/core/IconButton";
import LeftOverlay from "./LeftOverlay";
import {MenuIcon} from "../../assets/icons/MenuIcon";
import {AValiderIcon} from "../../assets/icons/AValiderIcon";
import {MatchingIcon} from "../../assets/icons/MatchingIcon";
import {DemarreIcon} from "../../assets/icons/DemarreIcon";
import {EnCoursIcon} from "../../assets/icons/EnCoursIcon";
import {TravailIcon} from "../../assets/icons/TravailIcon";
import {RetardIcon} from "../../assets/icons/RetardIcon";
import {MissionHistoIcon} from "../../assets/icons/MissionHistoIcon";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Mission = ({...props}) => {
    const classes = styles();
    const [open, setOpen] = React.useState(false);
    const [hoveredMenu, setOveredMenu] = React.useState(false);

    const getStatusIcon = (status) => {
        switch (status) {
            case 0:
                return <AValiderIcon className={classes.icon}/>;
            case 1:
                return <MatchingIcon className={classes.icon}/>;
            case 2:
                return <DemarreIcon className={classes.icon}/>;
            case 3:
                return <EnCoursIcon className={classes.icon}/>;
            case 4:
                return <TravailIcon className={classes.icon}/>;
            case 5:
                return <RetardIcon className={classes.icon}/>;
            case 6:
                return <MissionHistoIcon className={classes.icon}/>;
        }
    };

    return (
        <Grid container direction={'column'}>
            {
                !props.isLoading ?
                <Grid container direction={'row'} className={classes.container}>
                    <Grid container className={clsx(classes.gridLeft, {[classes.gridLeftFinished]: props.status === 6})}
                          direction={'column'}>
                        <Grid container item className={classes.statusContainer} direction={'row'}>
                            {getStatusIcon(props.status)}
                            <Typography
                                className={clsx(classes.statusTitle, {[classes.statusTitleRed]: props.status === 5})}>MISSION
                                EN COURS</Typography>
                            <div style={{flexGrow: 1}}/>
                            <IconButton className={classes.buttonIcon} aria-label="display more actions"
                                        onClick={() => setOpen(true)} color="secondary">
                                <MenuIcon className={classes.menuIcon} hovered={hoveredMenu}
                                          onMouseEnter={() => setOveredMenu(true)}
                                          onMouseLeave={() => setOveredMenu(false)}/>
                            </IconButton>
                        </Grid>
                        <Grid item className={classes.titleContainer}>
                            <Typography className={classes.title}>Mon titre décrivant ma mission en trois lignes et
                                lorem ipsum</Typography>
                        </Grid>
                        <Grid item className={classes.description}>
                            <Typography variant="body2">Livrable 01 - Livrable 02 Lorem ipsum dolor sit amet,
                                consectetur adipisicing
                                elit.</Typography>
                        </Grid>
                        {open && <LeftOverlay setOpen={setOpen}/>}
                    </Grid>
                    <Grid container direction={'row'}
                          className={clsx(classes.gridCenter, {[classes.gridCenterFinished]: props.status === 6})}>
                        <Grid container item xs={4} direction={'column'} alignItems={'center'}>
                            <Grid item className={classes.blocAvatar}>
                                <CircleImage theme={'avatarLarge'}/>
                            </Grid>
                            <Grid item className={classes.blocTypoDownAvatar}>
                                <Typography variant={"h4"} className={classes.typo}>Anh-Dao Lépinaux</Typography>
                                <Typography variant={"body1"} className={classes.typo}>Télétravail
                                    uniquement</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} direction={'column'} alignItems={'center'}>
                            <Grid item className={classes.blocTypoUp}>
                                <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                                <Typography variant={"body1"} className={classes.typo}>Télétravail
                                    uniquement</Typography>
                            </Grid>
                            <Grid item className={classes.blocTypoDown}>
                                <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                                <Typography variant={"body1"} className={classes.typo}>Plein temps (5
                                    jours)</Typography>
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
                          className={clsx(classes.gridRight, {[classes.withoutButton]: props.status === 6}, {[classes.rightRed]: props.status === 5})}
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
                    <CircleImage/>
                    <Typography variant="body2" className={classes.outsideTypo}>Severine est en charge de votre
                        dossier</Typography>
                </Grid>
                }
            </Grid>
    )
};

export default Mission;
