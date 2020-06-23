import React, { useState } from 'react';
import styles from './styles';
import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@material-ui/core";
import { IncidentIcon } from "../../../../assets/icons/IncidentIcon";
import { AdresseIcon } from "../../../../assets/icons/AdresseIcon";
import { DownloadIcon } from "../../../../assets/icons/DownloadIcon";
import { CloseIcon } from "../../../../assets/icons/CloseIcon";
import CustomModal from '../../../Modal';
import CircleImage from '../../../CircleImage';

export const LeftOverlay = ({ matching, mission, ...props }) => {
  const { t } = useTranslation();
  const classes = styles();

  const [freelanceInfosOpen, setFreelanceInfosOpen] = useState(false);

  const renderMenuLinks = () => {
    const today = Date.now() / 1000;

    return (
      <>
        <a href={matching?.briefSummary}
          rel="noopener noreferrer"
          target='_blank'
          className={classes.row}>
          <DownloadIcon />
             Télécharger PDF
        </a>
        {mission && (
          <>
            <a href={mission?.brief?.signedQuotes?.name}
              rel="noopener noreferrer"
              target='_blank'
              className={classes.row}>
              <DownloadIcon />
              Télécharger devis
          </a>
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
        )}
      </>
    )
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
          <Grid container>
            <Grid item container xs={4} alignItems='center'>
              <CircleImage theme="avatarMedium" src={mission?.serviceProviderProfile.linkedinAvatar} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{mission?.serviceProviderProfile.firstName}</Typography>
              <Typography>{mission?.serviceProviderProfile?.email}</Typography>
              <Typography>(+{mission?.serviceProviderProfile?.phoneNumber?.code}) {mission?.serviceProviderProfile?.phoneNumber?.number.match(/.{2}/g).join(' ').substring(1)}</Typography>
            </Grid>
          </Grid>
        </CustomModal>
      )}
    </>
  )
};

export default LeftOverlay;
