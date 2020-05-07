import React from 'react';
import styles from './styles';
import Grid from "@material-ui/core/Grid";
import {IncidentIcon} from "../../../assets/icons/IncidentIcon";
import {AdresseIcon} from "../../../assets/icons/AdresseIcon";
import {DownloadIcon} from "../../../assets/icons/DownloadIcon";
import {NavLink} from "react-router-dom";
import {CloseIcon} from "../../../assets/icons/CloseIcon";
export const LeftOverlay = (props) => {
    const classes = styles();
    const [hovered1, setOvered1] = React.useState(false);
    const [hovered2, setOvered2] = React.useState(false);
    const [hovered3, setOvered3] = React.useState(false);
    const [hovered4, setOvered4] = React.useState(false);
    const [hovered5, setOvered5] = React.useState(false);
    const [hovered6, setOvered6] = React.useState(false);

    console.log("hovered1", hovered1);
    console.log("hovered2", hovered2);
    return (
        <Grid container item className={classes.container} direction={'column'} justify={'center'}>
            <Grid item container direction={'row'} justify={"flex-end"}>
                <CloseIcon hovered={hovered6} className={classes.closeIcon} onClick={() => props.setOpen(false)}
                           onMouseEnter={() => setOvered6(true)}
                           onMouseLeave={() => setOvered6(false)}/>
            </Grid>
            <Grid item container direction={'row'} className={classes.row}>
                <NavLink className={classes.navLink} to={'/'}
                         onMouseEnter={() => setOvered1(true)}
                         onMouseLeave={() => setOvered1(false)}>
                    <IncidentIcon hovered={hovered1} className={classes.icon}/>
                        Déclarer un incident
                </NavLink>
            </Grid>
            <Grid item container direction={'row'} className={classes.row}>
                <NavLink className={classes.navLink} to={'/'}
                         onMouseEnter={() => setOvered2(true)}
                         onMouseLeave={() => setOvered2(false)}>
                    <AdresseIcon hovered={hovered2} className={classes.icon}/>
                        Voir coordonées freelence
                </NavLink>
            </Grid>
            <Grid item container direction={'row'} className={classes.row}>
                <NavLink className={classes.navLink} to={'/'}
                         onMouseEnter={() => setOvered3(true)}
                         onMouseLeave={() => setOvered3(false)}>
                    <DownloadIcon hovered={hovered3} className={classes.icon}/>
                        Télécharger facture
                </NavLink>
            </Grid>
            <Grid item container direction={'row'} className={classes.row}>
                <NavLink className={classes.navLink} to={'/'}
                         onMouseEnter={() => setOvered4(true)}
                         onMouseLeave={() => setOvered4(false)}>
                    <DownloadIcon hovered={hovered4} className={classes.icon}/>
                        Télécharger facture
                </NavLink>
            </Grid>
            <Grid item container direction={'row'} className={classes.row}>
                <NavLink className={classes.navLink} to={'/'}
                         onMouseEnter={() => setOvered5(true)}
                         onMouseLeave={() => setOvered5(false)}>
                    <DownloadIcon hovered={hovered5} className={classes.icon}/>
                        Télécharger facture
                </NavLink>
            </Grid>
        </Grid>
    )
};

export default LeftOverlay;
