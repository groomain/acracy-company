import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { formatDate } from '../../../../utils/services/format';

export const ValidationModal = ({ open, handleClose, files, missionId, preselectedFile, ...props }) => {
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
          Contrôler les comptes rendus d'activité
        </Typography>
        <Typography>Choisir le compte rendu d'activité à valider</Typography>
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

  return (
    <>
      <CustomSelect
        name="selectedFile"
        onChange={handleChange}
        optionsValues={options}
        value={selectedFile}
      />
      <Typography>{extractedFile?.workedDays} jours travaillés</Typography>
      <Typography>Du {formatDate(extractedFile?.startDate)} au {formatDate(extractedFile?.endDate)}</Typography>
      {extractedFile?.comment && <Typography>"{extractedFile?.comment}"</Typography>}
      <Box my={3}>
        <form onSubmit={handleSubmit}>
          {companiesData?.administrativeProfile?.purchaseOrder && (
            <CustomTextField
              label="Numéro de Bon de Commande"
              placeholder="Indiquez le BDC"
              name="orderFormNumber"
              onChange={handleChange}
            />
          )}
          {extractedFile?.latestInvoice && (
            <Grid container alignItems='center'>
              <CustomCheckBox
                name="workDone"
                onChange={handleChange}
              />
              <Typography>Mission terminée</Typography>
            </Grid>
          )}
          <Grid>
            <CustomButton
              title="Valider"
              theme={disabled ? 'disabledFilled' : 'filledButton'}
              type="submit"
              loading={updateMissionLoading}
              disabled={disabled}
            />
          </Grid>
          <Typography>{updateMissionSent ? 'La mission a bien été mise à jour !' : null}</Typography>
        </form>
      </Box>
    </>
  )
}

export default ValidationModal;
