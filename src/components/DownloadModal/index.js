import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import CustomSelect from "../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import CustomButton from "../Button";
import { NavLink } from "react-router-dom";

export const DownloadModal = ({ open, handleClose, files, ...props }) => {
  const invoicesNames = files.map(name => name.attachment.name);
  const classes = styles();
  const invoiceFile = files.filter(x => x.attachment.name === '1').map(x => x.attachment.link);
  const [extractedFile] = invoiceFile;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <Grid container direction={"column"}>
        <Grid item container justify={'flex-end'}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography variant='h1' className={classes.title}>
          Télécharger factures
        </Typography>
        <Typography>Choisir ma facture à télécharger</Typography>
        <CustomSelect label={""} optionsValues={invoicesNames} />
        <Grid item container directtion={"row"}>
          <CustomButton
            title={"Télécharger"}
            theme={"filledButton"}
            style={{ position: "relative", bottom: 40 }}
            onClick={() => window.open(extractedFile)}
          />
          <NavLink to={"/"} className={classes.navLink}>Télécharger toutes les factures</NavLink>
        </Grid>
      </Grid>
    </Dialog >
  );
};

export default DownloadModal;
