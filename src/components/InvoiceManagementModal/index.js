import React from 'react';
import { NavLink } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Box, Dialog, Typography, IconButton, Grid } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import CustomSelect from "../Inputs/CustomSelect";
import CustomButton from "../Button";
import CustomTextField from '../Inputs/CustomTextField';
import CustomCheckBox from '../CheckBox';

import { getPath } from '../../utils/services/validationChecks';

export const InvoiceManagementModal = ({ open, handleClose, files, ...props }) => {
  const invoicesNames = files.map(name => name.missionTitle);
  const classes = styles();

  const initialValues = {
    selectedFile: '',
    orderFormNumber: '',
    workDone: false
  }
  const ValidationSchema = Yup.object().shape({
    selectedFile: Yup.string().required(),
    orderFormNumber: Yup.string().required(),
    workDone: Yup.bool().required(),
  });

  const updateInvoice = (data) => {
    console.log('updateInvoice -> data', data)

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
  const classes = styles();

  const { selectedFile, orderFormNumber, workDone } = values;
  const invoiceFile = files.filter(x => x.missionTitle === selectedFile);
  const [extractedFile] = invoiceFile;
  const PAID = "PAID";
  const WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT";
  const WAITING_FOR_VALIDATION = "WAITING_FOR_VALIDATION";

  const renderInvoicesContent = () => {
    if (extractedFile?.status === WAITING_FOR_PAYMENT) {
      if (!extractedFile?.attachment || getPath(extractedFile?.attachment).length !== 0) {
        return <Typography>La facture est en cours de préparation, elle vous sera envoyée par mail dans quelques minutes</Typography>
      } else {
        return (
          <>
            <Typography>{extractedFile?.paymentDate}</Typography>
            <Typography>{extractedFile?.amount}€ TTC</Typography>
            <Typography>{extractedFile?.numero}</Typography>
          </>
        )
      }
    } else if (extractedFile?.status === WAITING_FOR_VALIDATION) {
      return (
        <>
          <Typography>{extractedFile?.comment}</Typography>
          <Typography>{extractedFile?.workedDays} jours travaillés</Typography>
          <Typography>{extractedFile?.startDate}</Typography>
          <Typography>{extractedFile?.endDate}</Typography>
          <Box my={3}>
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Numéro de Bon de Commande"
                placeholder="Indiquez le BDC"
                name="orderFormNumber"
                onChange={handleChange}
              />
              <Grid container alignItems='center'>
                <Typography>Le travail est terminé ?</Typography>
                <CustomCheckBox
                  name="workDone"
                  onChange={handleChange}
                />
              </Grid>
              <Grid>
                <CustomButton title="Valider" theme="filledButton" type="submit" />
              </Grid>
            </form>
          </Box>
        </>
      )
    }
  }

  return (
    <>
      <CustomSelect
        name="selectedFile"
        onChange={handleChange}
        optionsValues={options}
        value={selectedFile}
      />
      {renderInvoicesContent()}
      {extractedFile?.status === PAID || extractedFile?.status === WAITING_FOR_PAYMENT ? (
        <Grid item container directtion={"row"} alignItems='center'>
          <CustomButton
            title={"Télécharger"}
            theme={"filledButton"}
            onClick={() => window.open(extractedFile?.attachment?.link)}
          />
          <NavLink to={"/"} className={classes.navLink}>Télécharger toutes les factures</NavLink>
        </Grid>
      ) : null}
    </>
  )
}

export default InvoiceManagementModal;
