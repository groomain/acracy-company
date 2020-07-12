import React from 'react';
import { useDispatch } from 'react-redux';
// import { NavLink } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Dialog, Typography, IconButton, Grid } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles';
import CustomSelect from "../../../../components/Inputs/CustomSelect";
import CustomButton from "../../../../components/Button";

import { updateMissionLaunched } from '../../reducer';
import { downloadFileLaunched } from '../../../../components/DownloadModal/reducer';
import { getPath } from '../../../../utils/services/validationChecks';
import { formatDate } from '../../../../utils/services/format';
import { PAID, WAITING_FOR_PAYMENT } from '../../../../components/Missions/constants';

/**
 * Duplicated from a component that used Formik, can be simplified
 */
export const InvoiceManagementModal = ({ open, handleClose, files, missionId, preselectedFile, ...props }) => {
  const dispatch = useDispatch();
  const invoicesNames = files?.map(file => `${file.numero} du ${formatDate(file.paymentDate)}`);
  const classes = styles();

  const initialValues = {
    selectedFile: `${preselectedFile?.numero} du ${formatDate(preselectedFile?.paymentDate)}` ?? '',
    orderFormNumber: '',
    workDone: false
  }
  const ValidationSchema = Yup.object().shape({
    selectedFile: Yup.string(),
    orderFormNumber: Yup.string(),
    workDone: Yup.boolean(),
  });

  const updateInvoice = (data) => {
    const allData = {
      id: missionId,
      ...data
    }
    dispatch(updateMissionLaunched(allData))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ root: classes.container, paper: classes.root }}
    >
      <Grid container direction={"column"}>
        <Grid item container justify={'flex-end'}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography variant='h1' className={classes.title}>
          Gérer mes factures
        </Typography>
        <Typography>Choisir ma facture</Typography>
        <Formik
          render={props => <InvoicesDownloadForm {...props} options={invoicesNames} files={files} />}
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={updateInvoice}
        >
        </Formik>
      </Grid>
    </Dialog>
  );
};

const InvoicesDownloadForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, files, options }) => {
  const dispatch = useDispatch();

  const { selectedFile } = values;
  const invoiceFile = files?.filter(x => `${x.numero} du ${formatDate(x.paymentDate)}` === selectedFile);
  const [extractedFile] = invoiceFile;

  const renderInvoicesContent = () => {
    if (extractedFile?.status === WAITING_FOR_PAYMENT) {
      if (!extractedFile?.attachment || getPath(extractedFile?.attachment).length !== 0) {
        return <Typography>La facture est en cours de préparation, elle vous sera envoyée par mail dans quelques minutes</Typography>
      } else {
        return (
          <>
            <Typography>Numéro : {extractedFile?.numero}</Typography>
            <Typography>Date : {formatDate(extractedFile?.sentDate)}</Typography>
            <Typography>Echéance : {formatDate(extractedFile?.paymentDate)}</Typography>
            <Typography>Montant : {extractedFile?.amount}€</Typography>
          </>
        )
      }
    }
  }

  const handleInvoiceDownload = (id) => {
    dispatch(downloadFileLaunched({ attachmentId: id }));
  };

  return (
    <>
      <CustomSelect
        name="selectedFile"
        onChange={handleChange}
        optionsValues={options}
        value={selectedFile}
      />
      {renderInvoicesContent()}
      {extractedFile?.status === PAID || (extractedFile?.status === WAITING_FOR_PAYMENT && (extractedFile?.attachment && getPath(extractedFile?.attachment, 'attachment').length === 0)) ? (
        <Grid item container directtion={"row"} alignItems='center'>
          <CustomButton
            title={"Télécharger"}
            theme={"filledButton"}
            onClick={() => handleInvoiceDownload(extractedFile?.attachment?.externalId)}
          />
          {/* <NavLink to={"/"} className={classes.navLink}>Télécharger toutes les factures</NavLink> */}
        </Grid>
      ) : null}
    </>
  )
}

export default InvoiceManagementModal;
