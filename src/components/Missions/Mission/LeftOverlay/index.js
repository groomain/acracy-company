import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Grid, Typography } from "@material-ui/core";
import { IncidentIcon } from "../../../../assets/icons/IncidentIcon";
import { CoordonneesIcon } from "../../../../assets/icons/Coordonnees";
import { DownloadIcon } from "../../../../assets/icons/DownloadIcon";
import { CloseIcon } from "../../../../assets/icons/CloseIcon";
import CustomModal from '../../../Modal';
import CircleImage from '../../../CircleImage';
import IncidentMessageForm from './IncidentMessageForm';
import InvoiceManagementModal from '../../../../pages/HomePage/Modals/InvoiceManagementModal';

import { sendIncidentMessageLaunched } from '../../../../pages/HomePage/reducer';
import { downloadFileLaunched } from '../../../../components/DownloadModal/reducer';
import { WAITING_FOR_VALIDATION, FINISHED } from '../../constants';

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

  const handleDownload = (id) => {
    dispatch(downloadFileLaunched({ attachmentId: id }));
  };

  const renderMenuLinks = () => {
    const today = new Date(Date.now()).toISOString();

    return (
      <>
        <span
          onClick={() => handleDownload(matching?.briefSummary?.externalId || mission?.brief?.briefSummary?.externalId)}
          className={classes.row}>
          <DownloadIcon />
             Télécharger brief
        </span>
        {mission && (
          <>
            <span
              onClick={() => handleDownload(mission?.signedQuote?.externalId)}
              className={classes.row}>
              <DownloadIcon />
              Télécharger devis
          </span>
            {mission.status !== FINISHED && (
              <Grid item container direction={'row'} className={classes.row}
                onClick={() => setFreelanceInfosOpen(true)}>
                <CoordonneesIcon />
              Voir coordonnées freelance
              </Grid>
            )}
            {mission?.dateStart < today ? (
              <>
                <Grid item container direction={'row'} className={classes.row}
                  onClick={() => setIncidentOpen(true)}>
                  <IncidentIcon />
                  Déclarer un incident
              </Grid>
                {mission?.invoices?.length > 0 && mission?.invoices?.find(x => x.status !== WAITING_FOR_VALIDATION) && (
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
            <Grid item xs={3} alignItems='center'>
              <CircleImage theme="avatarMedium" src={mission?.serviceProviderProfile.linkedinAvatar} />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">{mission?.serviceProviderProfile.firstName}</Typography>
              <Typography>{mission?.serviceProviderProfile?.email}</Typography>
              <Typography>(+{mission?.serviceProviderProfile?.phone?.code}) {mission?.serviceProviderProfile?.phone?.number.match(/.{2}/g).join(' ').substring(1)}</Typography>
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
          files={mission?.invoices?.filter(x => x.status !== WAITING_FOR_VALIDATION)}
        />
      )}
    </>
  )
};

export default LeftOverlay;
