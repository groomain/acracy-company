import React from 'react';
import styles from './styles';
import { Grid } from "@material-ui/core";
import { IncidentIcon } from "../../../../assets/icons/IncidentIcon";
import { AdresseIcon } from "../../../../assets/icons/AdresseIcon";
import { DownloadIcon } from "../../../../assets/icons/DownloadIcon";
import { CloseIcon } from "../../../../assets/icons/CloseIcon";

export const LeftOverlay = ({ matching, mission, ...props }) => {

  const classes = styles();

  const renderMenuLinks = () => {
    const today = Date.now() / 1000;
    if (matching) {
      return (
        <Grid item container direction={'row'} className={classes.row}>
          <DownloadIcon />
             Télécharger PDF
        </Grid>
      )
    }
    if (mission) {
      return (
        <>
          <Grid item container direction={'row'} className={classes.row} onClick={() => console.log('toto')}>
            <DownloadIcon />
              Télécharger facture
          </Grid>
          <Grid item container direction={'row'} className={classes.row}>
            <AdresseIcon />
              Voir coordonées freelance
          </Grid>
          {mission?.brief.missionContext.startDate < today ? (
            <>
              <Grid item container direction={'row'} className={classes.row}>
                <IncidentIcon />
                  Déclarer un incident
              </Grid>

              <Grid item container direction={'row'} className={classes.row}>
                <DownloadIcon />
                  Télécharger facture
              </Grid>
            </>
          ) : null}
        </>
      )
    }
  };

  return (
    <Grid container className={classes.container} direction={'column'}>
      <Grid item container direction={'row'} justify={"flex-end"} className={classes.row}>
        <CloseIcon className={classes.closeIcon} onClick={() => props.setOpen(false)} />
      </Grid>
      {renderMenuLinks()}
    </Grid>
  )
};

export default LeftOverlay;
