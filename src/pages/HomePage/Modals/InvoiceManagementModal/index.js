import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Box, Dialog, Typography, IconButton, Grid } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles';
import CustomSelect from "../../../../components/Inputs/CustomSelect";
import CustomButton from "../../../../components/Button";
import CustomTextField from '../../../../components/Inputs/CustomTextField';
import CustomCheckBox from '../../../../components/CheckBox';

import { updateMissionLaunched } from '../../reducer';
import { getPath } from '../../../../utils/services/validationChecks';
import { formatDate } from '../../../../utils/services/format';
import { PAID, WAITING_FOR_PAYMENT, WAITING_FOR_VALIDATION } from '../../../../components/Missions/constants';

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
  const classes = styles();

  const { updateMissionLoading, updateMissionSent, companiesData } = useSelector(state => ({
    updateMissionLoading: state.getIn(['dashboard', 'updateMissionLoading']),
    updateMissionSent: state.getIn(['dashboard', 'updateMissionSent']),
    companiesData: state.getIn(['dashboard', 'companiesData'])
  }));

  const { selectedFile, orderFormNumber, workDone } = values;
  const invoiceFile = files?.filter(x => `${x.numero} du ${formatDate(x.paymentDate)}` === selectedFile);
  const [extractedFile] = invoiceFile;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (companiesData?.administrativeProfile?.purchaseOrder || extractedFile?.latestInvoice) {
      if (companiesData?.administrativeProfile?.purchaseOrder && !extractedFile?.latestInvoice) {
        if (orderFormNumber.trim().length < 1) {
          setDisabled(false)
        }
      } else if (!companiesData?.administrativeProfile?.purchaseOrder && extractedFile?.latestInvoice) {
        if (!workDone) {
          setDisabled(false);
        }
      }
      setDisabled(false)
    } else if (!companiesData?.administrativeProfile?.purchaseOrder && !extractedFile?.latestInvoice) {
      setDisabled(false)
    }
  }, [companiesData, extractedFile]);

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
      {extractedFile?.status === PAID || (extractedFile?.status === WAITING_FOR_PAYMENT && (extractedFile?.attachment && getPath(extractedFile?.attachment, 'attachment').length === 0)) ? (
        <Grid item container directtion={"row"} alignItems='center'>
          <CustomButton
            title={"Télécharger"}
            theme={"filledButton"}
            onClick={() => window.open(extractedFile?.attachment?.link)}
          />
          {/* <NavLink to={"/"} className={classes.navLink}>Télécharger toutes les factures</NavLink> */}
        </Grid>
      ) : null}
    </>
  )
}

export default InvoiceManagementModal;
