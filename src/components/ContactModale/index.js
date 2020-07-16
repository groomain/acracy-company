import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography } from '@material-ui/core';
import styles from './styles';
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CustomTextArea from "../Inputs/CustomTextArea";
import CustomButton from "../Button";
import CloseIcon from '@material-ui/icons/Close';
import { contactAcracyLaunched } from "../../components/ContactModale/reducer";
import Grid from "@material-ui/core/Grid";
import CustomSelect from "../Inputs/CustomSelect";

const ContactModale = ({ open, setOpen, interview, title, placeHolder, ...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { contactLoading } = useSelector(state => ({
    contactLoading: state.getIn(['Contact', 'contactLoading']),
  }));

  // Handle panels expansion individually
  const [contactMessage, setContactMessage] = useState('');
  const [contactSelect, setContactSelect] = useState('');

  const contactAcracy = (message, reason, interview) => {
    dispatch(contactAcracyLaunched({ message: message, reason: reason, interview: interview }));
    handleContactOpen()
  };

  const handleContactOpen = () => {
    setOpen(!open);
  };

  const reasons = ["Question sur un brief", "Question/remarque sur une mission", "Question sur mon profil / l’administratif", "Question sur une facture", "Un souci ou une remarque sur le site", "Déclarer votre amour", "Autre chose"]

  return (
    <Dialog open={open} onClose={handleContactOpen} classes={{ paper: classes.modale }} {...props}>
      <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
        <IconButton aria-label="close" className={classes.iconButton} onClick={handleContactOpen}>
          <CloseIcon />
        </IconButton>
        <Typography variant={"h1"}>{title}</Typography>
        <CustomSelect placeholder={"Sélectionner raison"} label={"Raison"} optionsValues={reasons} value={contactSelect} handleChangeOut={setContactSelect} />
        <CustomTextArea placeholder={placeHolder} valueOut={contactMessage} handleChangeOut={setContactMessage} />
        <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Envoyer"} handleClick={() => contactAcracy(contactMessage, contactSelect, interview)} loading={contactLoading} />
      </Grid>
    </Dialog>
  );
};

export default ContactModale;
