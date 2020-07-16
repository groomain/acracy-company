import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Box, Dialog, Typography, IconButton, Grid } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles';
import CustomButton from "../../../../components/Button";
import CustomTextField from '../../../../components/Inputs/CustomTextField';
import CustomCheckBox from '../../../../components/CheckBox';

import { updateMissionLaunched } from '../../reducer';
import { formatDate } from '../../../../utils/services/format';;

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

  const commission = preselectedFile?.amount * 0.15;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ root: classes.container, paper: preselectedFile?.comment === "" ? classes.root : classes.bigModal }}
    >
      <Grid container>
        <Grid item>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item container direction={'row'} spacing={2}>
          <Grid item container xs={preselectedFile?.comment ? 8 : null}>
            <Grid item className={classes.title}>
              <Typography Typography variant={'h1'}>Contrôle du compte rendu d’activité</Typography>
            </Grid>
            <Grid item container>
              <Grid item container>
                <Box mt={2}>
                  <Typography >Merci de bien vouloir vérifier les informations ci-dessous et valider le compte rendu d’activité.</Typography>
                </Box>
                <Grid item>
                  <Box mt={2}>
                    <Typography variant={'h4'}>{preselectedFile?.missionTitle}</Typography>
                  </Box>
                </Grid>
                <Grid item container direction={'column'}>
                  <Box mt={2}>
                    <Grid item>
                      <Typography variant={'h4'}>Période de travail</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{`Du ${formatDate(preselectedFile?.startDate)} au ${formatDate(preselectedFile?.endDate)}`}</Typography
                      ></Grid>
                  </Box>
                </Grid>
                <Grid item container>
                  <Box mt={2}>
                    <Grid item>
                      <Typography variant={'h4'}>Cette facture</Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item xs={3}>
                        <Typography>{preselectedFile?.amount - commission}€</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography>{preselectedFile?.workedDays} jours travaillés, TJM</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>{commission}€</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography>15% de commission acracy</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item container>
                  <Box mt={2}>
                    <Typography variant={'h1'} style={{ color: '#ecf805' }}>{(preselectedFile?.amount)}€ <span style={{ fontSize: '17px' }}>total HT</span></Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box mt={2}>
                    <Formik
                      render={props => <InvoicesDownloadForm {...props} options={invoicesNames} files={files} />}
                      initialValues={initialValues}
                      validationSchema={ValidationSchema}
                      onSubmit={updateInvoice}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {preselectedFile?.comment && (
            <Grid item container xs={4}>
              <Box>
                <div className={classes.validationComment}>
                  <Typography variant={'subtitle1'} >Commentaire du freelance</Typography>
                  <Typography>{preselectedFile?.comment}</Typography>
                </div>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Dialog >
  );
};

const InvoicesDownloadForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, files, options }) => {

  const { updateMissionLoading, companiesData } = useSelector(state => ({
    updateMissionLoading: state.getIn(['dashboard', 'updateMissionLoading']),
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
  }, [companiesData, extractedFile, orderFormNumber, workDone]);


  return (
    <>
      <Box>
        {companiesData?.administrativeProfile?.purchaseOrder && (
          <CustomTextField
            label="Veuillez indiquer ici votre numéro de bon de commande*"
            placeholder="Numéro bon de commande"
            name="orderFormNumber"
            onChange={handleChange}
          />
        )}
        {extractedFile?.latestInvoice && (
          <Grid container alignItems={'center'}>
            <Grid item>
              <Typography variant={'h2'}>Cette facture clôture la mission*</Typography>
            </Grid>
            <Grid item container alignItems={'center'}>
              <Grid item>
                <CustomCheckBox
                  name="workDone"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Typography>Je confirme la fin de mission</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2}>
          <Grid item>
            <CustomButton
              title="Refuser"
              theme='primaryButton'
              onClick={() => alert('Ouvre une modal Contact')}
            />
          </Grid>
          <Grid item>
            <CustomButton
              title="Confirmer"
              theme={disabled ? 'disabledFilled' : 'filledButton'}
              handleClick={() => handleSubmit({ orderFormNumber, workDone })}
              type="submit"
              loading={updateMissionLoading}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ValidationModal;
