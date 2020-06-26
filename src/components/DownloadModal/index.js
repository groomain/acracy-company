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
import {useDispatch} from "react-redux";
import {downloadFileLaunched} from "./reducer";

export const DownloadModal = ({ open, setOpen, handleClose, files, type, ...props }) => {
  const classes = styles();
  const filesName = files.map((file, index) => file.name);
  const filesId = files.map((file, index) => file.externalId);
  const [file, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const downloadFile = (payload) => {
    dispatch(downloadFileLaunched(payload));
  };

  const handleSetFile = (fileName) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].name === fileName){
        setFile(files[i])
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: classes.root }}
    >
      <Grid container direction={"column"}>
        <Grid item container justify={'end'}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography variant='h1' className={classes.title}>
          Télécharger {type}
        </Typography>
        <Typography>
          {type === "devis" && "Choisir mon devis à télécharger"}
          {type === "facture" && "Choisir ma facture à télécharger"}
          {type === "brief" && "Choisir mon brief à télécharger"}
        </Typography>
        <CustomSelect label={""} optionsValues={filesName} onChange={(event) => handleSetFile(event.target.value)}/>
        <Grid item container directtion={"row"}>
          <CustomButton title={"Télécharger"} theme={"filledButton"} style={{position: "relative", bottom: 40}} handleClick={() => downloadFile({type: type, attachmentId: file.externalId})}/>
          <Typography onClick={() => downloadFile({type: type, attachmentId: filesId})} className={classes.navLink}>
            {type === "devis" && "Télécharger tout les devis"}
            {type === "facture" && "Télécharger toutes les factures"}
            {type === "brief" && "Télécharger tout les briefs"}
          </Typography>
        </Grid>
      </Grid>
    </Dialog >
  );
};

export default DownloadModal;
