import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography } from '@material-ui/core';

import styles from './styles';
import Grid from "../../pages/ProfileSelection";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CustomTextArea from "../Inputs/CustomTextArea";
import CustomButton from "../Button";
import CloseIcon from '@material-ui/icons/Close';
import {contactAcracyLaunched} from "../../pages/ProfileSelection/reducer";

const ContactModale = ({...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { expansionPanelOpen } = useSelector(state => ({
    expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
  }));

  // Handle panels expansion individually
  const [contactOpen, setContactModaleOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const contactAcracy = (message, interview) => {
    dispatch(contactAcracyLaunched({ message: message, interview: interview }));
    handleContactOpen()
  };

  const handleContactOpen = () => {
    setContactModaleOpen(!contactOpen);
  };

  return (
      <Dialog open={contactOpen} onClose={handleContactOpen} classes={{ paper: classes.modale }}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleContactOpen}>
            <CloseIcon />
          </IconButton>
          <Typography variant={"h1"}>Faire une demande à acracy</Typography>
          <CustomTextArea style={{ height: 328 }} placeholder={"Dites nous comment on peut vous aider"} valueOut={contactMessage} handleChangeOut={setContactMessage} />
          <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Envoyé"} handleClick={() => contactAcracy(contactMessage, false)} loading={contactLoading} />
        </Grid>
      </Dialog>
  );
};

export default ContactModale;
