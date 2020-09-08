import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Dialog, Typography, IconButton, Grid, Snackbar } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import { updateMissionLaunched, sendRefusalMessageLaunched, closeRefusalSnackBar } from '../../reducer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomSelect from "../../../../components/Inputs/CustomSelect";
import CustomTextField from '../../../../components/Inputs/CustomTextField';
import CustomButton from "../../../../components/Button";
import CustomCheckBox from '../../../../components/CheckBox';
import CustomModal from '../../../../components/Modal';
import { formatDate } from '../../../../utils/services/format';
import smallCheck from "../../../../assets/icons/small-check.svg";
import styles from '../styles';

export const ValidationModal = ({ open, handleClose, files, missionId, preselectedFile, setValidationModalOpen, setRefusalModalOpen, ...props }) => {
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
      id: preselectedFile?.externalId,
      ...data
    }
    dispatch(updateMissionLaunched(allData))
  }

  const commission = preselectedFile?.amount * process.env.REACT_APP_COMMISSION_RATE;

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
                      render={props => <InvoicesDownloadForm {...props} options={invoicesNames} files={files} setValidationModalOpen={setValidationModalOpen} setRefusalModalOpen={setRefusalModalOpen} handleClose={handleClose} />}
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

const InvoicesDownloadForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, files, options, setValidationModalOpen, setRefusalModalOpen }) => {

  const { updateMissionLoading, companiesData } = useSelector(state => ({
    updateMissionLoading: state.getIn(['dashboard', 'updateMissionLoading']),
    companiesData: state.getIn(['dashboard', 'companiesData'])
  }));

  const { selectedFile, orderFormNumber, workDone } = values;
  const invoiceFile = files?.filter(x => `${x.numero} du ${formatDate(x.paymentDate)}` === selectedFile);
  const [extractedFile] = invoiceFile;

  const [disabled, setDisabled] = useState(false);

  const openRefusalModal = () => {
    setValidationModalOpen(false);
    setRefusalModalOpen(true);
  };

  useEffect(() => {
    if (companiesData?.administrativeProfile?.purchaseOrder && orderFormNumber.trim().length === 0) {
      setDisabled(true);
    } else if (extractedFile?.latestInvoice && !workDone) {
      setDisabled(true);
    } else {
      setDisabled(false);
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
            value={orderFormNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.orderFormNumber && !!errors.orderFormNumber}
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
              onClick={() => openRefusalModal()}
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

export const RefusalModal = ({ refusalModalOpen, setRefusalModalOpen, ...props }) => {

  const dispatch = useDispatch();

  const initialValues = {
    refusalReason: '',
    refusalDetails: ''
  };

  const ValidationSchema = Yup.object().shape({
    refusalReason: Yup.string().required(),
    refusalDetails: Yup.string().required()
  });

  const sendRefusalMessage = ({ refusalReason, refusalDetails }) => {
    dispatch(sendRefusalMessageLaunched({ refusalReason, refusalDetails, setRefusalModalOpen }));
  };

  return (
    <CustomModal
      open={refusalModalOpen}
      handleClose={() => setRefusalModalOpen(false)}
      title="Refus compte rendu d’activité"
    >
      <Formik
        render={props => <RefusalMessageForm {...props} setRefusalModalOpen={setRefusalModalOpen} />}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        setRefusalModalOpen={setRefusalModalOpen}
        onSubmit={sendRefusalMessage}
      />
    </CustomModal >
  );
};

const RefusalMessageForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, setRefusalModalOpen }) => {

  const dispatch = useDispatch();
  const classes = styles();

  const { refusalReason, refusalDetails } = values;

  const [refusalDisabled, setRefusalDisabled] = useState(true);

  const { sendMessageLoading, refusalSnackBarOpen, refusalSnackBarMessage, refusalSnackBarError } = useSelector(state => ({
    sendMessageLoading: state.getIn(['dashboard', 'sendMessageLoading']),
    refusalSnackBarOpen: state.getIn(['dashboard', 'refusalSnackBarOpen']),
    refusalSnackBarMessage: state.getIn(['dashboard', 'refusalSnackBarMessage']),
    refusalSnackBarError: state.getIn(['dashboard', 'refusalSnackBarError'])
  }));

  useEffect(() => {
    if (refusalReason !== '' && refusalDetails.trim() !== '') {
      setRefusalDisabled(false);
    };
  }, [refusalReason, refusalDetails]);

  const refusalOptionsValues = [
    'Ereur de calcul',
    'Problème avec la mission',
    'Autre'
  ];

  const closeSnackBar = () => {
    dispatch(closeRefusalSnackBar());
  };

  const sendRefusalMessage = () => {
    setRefusalDisabled(true);
    handleSubmit({ refusalReason, refusalDetails, setRefusalModalOpen });
  }

  return (
    <>
      <CustomSelect className={classes.textfield}
        label={'Liste des raisons* : '}
        optionsValues={refusalOptionsValues}
        placeholder={'Raison'}
        name={'refusalReason'}
        value={refusalReason}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.refusalReason && !!errors.refusalReason}
      />
      <CustomTextField className={classes.textfield}
        label={'Donnez nous plus de détails*'}
        placeholder={'Détails'}
        name={'refusalDetails'}
        value={refusalDetails}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.refusalDetails && !!errors.refusalDetails}
      />
      <CustomButton
        theme={refusalDisabled ? 'disabledFilled' : 'filledButton'}
        disabled={refusalDisabled}
        title="Envoyer"
        loading={sendMessageLoading}
        type='submit'
        handleClick={() => sendRefusalMessage()}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={refusalSnackBarOpen}
        onClose={() => closeSnackBar()}
        children={
          <Grid container alignItems={'center'} justify={'space-between'} className={classes.snackBar}>
            {refusalSnackBarError ?
              <CloseIcon fontSize="small" />
              :
              <img alt={'smallCheck'} src={smallCheck} />
            }
            <Typography className={classes.typoSnackBar}>{refusalSnackBarMessage}</Typography>
          </Grid>
        }
      />
    </>
  )
}

export default ValidationModal;
