import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Grid, Typography } from "@material-ui/core";
import { IncidentIcon } from "../../../../assets/icons/IncidentIcon";
import { AdresseIcon } from "../../../../assets/icons/AdresseIcon";
import { DownloadIcon } from "../../../../assets/icons/DownloadIcon";
import { CloseIcon } from "../../../../assets/icons/CloseIcon";
import CustomModal from '../../../Modal';
import CircleImage from '../../../CircleImage';
import IncidentMessageForm from './IncidentMessageForm';
import InvoiceManagementModal from '../../../InvoiceManagementModal';

import { sendIncidentMessageLaunched } from '../../../../pages/HomePage/reducer';

export const LeftOverlay = ({ matching, mission, ...props }) => {
  const { t } = useTranslation();
  const classes = styles();
  const dispatch = useDispatch();

  const { sendMessageLoading } = useSelector(state => ({
    sendMessageLoading: state.getIn(['dashboard', 'sendMessageLoading']),
  }));

  const [freelanceInfosOpen, setFreelanceInfosOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [invoicesOpen, setInvoicesOpen] = useState(false);

  useEffect(() => {
    if (!sendMessageLoading) {
      setIncidentOpen(false)
    }
  }, [sendMessageLoading]);

  const initialValues = {
    message: ''
  }
  const ValidationSchema = Yup.object().shape({
    message: Yup.string().required(),
  });

  const sendIncidentMessage = ({ message }) => {
    dispatch(sendIncidentMessageLaunched(message));
  }

  const renderMenuLinks = () => {
    const today = new Date(Date.now()).toISOString();

    return (
      <>
        <a href={matching?.briefSummary}
          rel="noopener noreferrer"
          target='_blank'
          className={classes.row}>
          <DownloadIcon />
             Télécharger brief
        </a>
        {mission && (
          <>
            <a href={mission?.brief?.signedQuotes?.link}
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
            {mission?.dateStart < today ? (
              <>
                <Grid item container direction={'row'} className={classes.row}
                  onClick={() => setIncidentOpen(true)}>
                  <IncidentIcon />
                  Déclarer un incident
              </Grid>
                {mission?.invoices?.length > 0 && (
                  <Grid item container direction={'row'} className={classes.row}
                    onClick={() => setInvoicesOpen(true)}>
                    <DownloadIcon />
                  Télécharger facture
                  </Grid>
                )}
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
      {incidentOpen && (
        <CustomModal
          title={t('dashboard.missions.incidentModalTitle')}
          open={incidentOpen}
          handleClose={() => setIncidentOpen(false)}
        >
          <Grid container>
            <Formik
              render={props => <IncidentMessageForm {...props} loading={sendMessageLoading} />}
              onSubmit={sendIncidentMessage}
              initialValues={initialValues}
              validationSchema={ValidationSchema}>
            </Formik>
          </Grid>
        </CustomModal>
      )}
      {invoicesOpen && (
        <InvoiceManagementModal
          open={invoicesOpen}
          handleClose={() => setInvoicesOpen(false)}
          files={mission?.invoices}
        />
      )}
    </>
  )
};

export default LeftOverlay;
