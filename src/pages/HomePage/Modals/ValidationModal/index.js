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
import { formatDate } from '../../../../utils/services/format';
import { theme } from '../../../../utils/configureMaterialTheme';

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

  const invoice =
  {
    "externalId": "receAaY3M4RZHa8Z5",
    "status": "WAITING_FOR_VALIDATION",
    "briefId": "receAaY3M4RZHa8Z5",
    "missionId": "receAaY3M4RZHa8Z5",
    "numero": "string",
    "missionTitle": "Apollo XI",
    "companyName": "La pilule rouge",
    "averageDailyRate": 50,
    "amount": 100,
    "sentDate": "2020-07-15",
    "paymentDate": "2020-07-15",
    "attachment": {
      "externalId": "receAaY3M4RZHa8Z5",
      "link": "string",
      "name": "string"
    },
    "startDate": "2020-07-15T08:42:34.219Z",
    "endDate": "2020-07-16T08:42:34.219Z",
    "workedDays": 2,
    "comment": ""
  };

  const commissionAcracy = invoice?.amount * 0.15;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ root: classes.container, paper: invoice?.comment === "" ? classes.root : classes.bigModal }}
    >
      <Grid container>
        <Grid item>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item container direction={'row'} spacing={2}>
          <Grid item container md={invoice?.comment ? 8 : null}>
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
                    <Typography variant={'h4'}>{invoice?.missionTitle}</Typography>
                  </Box>
                </Grid>
                <Grid item container direction={'column'}>
                  <Box mt={2}>
                    <Grid item>
                      <Typography variant={'h4'}>Période de travail</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{`Du ${formatDate(invoice?.startDate)} au ${formatDate(invoice?.endDate)}`}</Typography
                      ></Grid>
                  </Box>
                </Grid>
                <Grid item container>
                  <Box mt={2}>
                    <Grid item>
                      <Typography variant={'h4'}>Cette facture</Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item md={3}>
                        <Typography>{invoice?.amount - commissionAcracy}€</Typography>
                      </Grid>
                      <Grid item md={9}>
                        <Typography>{invoice?.workedDays} jours travaillés, TJM</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography>{commissionAcracy}€</Typography>
                      </Grid>
                      <Grid item md={9}>
                        <Typography>15% de commission acracy</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item container>
                  <Box mt={2}>
                    <Typography variant={'h1'} style={{ color: '#ecf805' }}>{(invoice?.amount)}€ <span style={{ fontSize: '17px' }}>total HT</span></Typography>
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
          {invoice?.comment && (
            <Grid item container md={4}>
              <Box>
                <div className={classes.validationComment}>
                  <Typography variant={'subtitle1'} >Commentaire du freelance</Typography>
                  <Typography>{invoice?.comment}</Typography>
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

  const invoice =
  {
    "latestInvoice": false,
    "purchaseOrder": true
  };

  return (
    <>
      <Box>
        {/* <form onSubmit={handleSubmit}> */}
        {invoice?.purchaseOrder && (
          <CustomTextField
            label="Veuillez indiquer ici votre numéro de bon de commande*"
            placeholder="Numéro bon de commande"
            name="orderFormNumber"
            onChange={handleChange}
          />
        )}
        {invoice?.latestInvoice && (
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
        {/* </form> */}
      </Box>
    </>
  )
}

export default ValidationModal;
