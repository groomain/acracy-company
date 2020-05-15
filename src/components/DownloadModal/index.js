import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import CustomSelect from "../Inputs/CustomSelect";
import Grid from "@material-ui/core/Grid";
import CustomButton from "../Button";
import {NavLink} from "react-router-dom";

export const DownloadModal = ({ open, handleClose, files, ...props }) => {
  const classes = styles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <Grid container direction={"column"}>
        <Grid item container justify={'end'}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography variant='h1' className={classes.title}>
          Télécharger devis
        </Typography>
        <Typography>Choisir mon devis à télécharger</Typography>
        <CustomSelect label={""} optionsValues={files}/>
        <Grid item container directtion={"row"}>
          <CustomButton title={"Télécharger"} theme={"filledButton"} style={{position: "relative", bottom: 40}}/>
          <NavLink to={"/"} className={classes.navLink}>Télécharger tout les devis</NavLink>
        </Grid>
      </Grid>
    </Dialog >
  );
};

export default DownloadModal;
