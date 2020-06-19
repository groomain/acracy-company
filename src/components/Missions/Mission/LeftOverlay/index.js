import React, { useState } from 'react';
import styles from './styles';
import { useTranslation } from "react-i18next";

import { Grid } from "@material-ui/core";
import { IncidentIcon } from "../../../../assets/icons/IncidentIcon";
import { AdresseIcon } from "../../../../assets/icons/AdresseIcon";
import { DownloadIcon } from "../../../../assets/icons/DownloadIcon";
import { CloseIcon } from "../../../../assets/icons/CloseIcon";
import CustomModal from '../../../Modal';

export const LeftOverlay = ({ matching, mission, ...props }) => {
  const { t } = useTranslation();
  const classes = styles();

  const [freelanceInfosOpen, setFreelanceInfosOpen] = useState(false);

  const renderMenuLinks = () => {
    const today = Date.now() / 1000;
    if (matching) {
      return (
        <a href={matching?.briefSummary}
          rel="noopener noreferrer"
          target='_blank'
          className={classes.row}>
          <DownloadIcon />
             Télécharger PDF
        </a>
      )
    }

    if (mission) {
      return (
        <>
          <Grid item container direction={'row'} className={classes.row}>
            <DownloadIcon />
              Télécharger devis
          </Grid>
          <Grid item container direction={'row'} className={classes.row}
            onClick={() => setFreelanceInfosOpen(true)}>
            <AdresseIcon />
              Voir coordonnées freelance
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
    <>
      <Grid container className={classes.container} direction={'column'}>
        <Grid item container direction={'row'} justify={"flex-end"} className={classes.row}>
          <CloseIcon className={classes.closeIcon} onClick={() => props.setOpen(false)} />
        </Grid>
        {renderMenuLinks()}
      </Grid>

      {freelanceInfosOpen && (
        <CustomModal
          title={t('dashboard.missions.freelanceInfosModal')}
          open={freelanceInfosOpen}
          handleClose={() => setFreelanceInfosOpen(false)}
        >
          {/* get /serviceProviders/${serviceProviderId} <-- quel id depuis mission ?}


          <Typography variant="subtitle1">{mission?.serviceProviderProfile.firstName}</Typography>
          <Typography>{mission?.serviceProviderProfile.linkedinLink}</Typography>
          <Typography>{mission?.serviceProviderProfile.linkedinLink}</Typography> */}
        </CustomModal>
      )}
    </>
  )
};

export default LeftOverlay;
