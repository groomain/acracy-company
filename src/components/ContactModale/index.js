import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography } from '@material-ui/core';
import styles from './styles';
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CustomTextArea from "../Inputs/CustomTextArea";
import CustomButton from "../Button";
import CloseIcon from '@material-ui/icons/Close';
import {contactAcracyLaunched} from "../../components/ContactModale/reducer";
import Grid from "@material-ui/core/Grid";

const ContactModale = ({open, setOpen, interview, title, placeHolder, ...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { contactLoading } = useSelector(state => ({
    contactLoading: state.getIn(['Contact', 'contactLoading']),
  }));

  // Handle panels expansion individually
  const [contactMessage, setContactMessage] = useState('');

  const contactAcracy = (message, interview) => {
    dispatch(contactAcracyLaunched({ message: message, interview: interview }));
    handleContactOpen()
  };

  const handleContactOpen = () => {
    setOpen(!open);
  };

  return (
      <Dialog open={open} onClose={handleContactOpen} classes={{ paper: classes.modale }} {...props}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleContactOpen}>
            <CloseIcon />
          </IconButton>
          <Typography variant={"h1"}>{title}</Typography>
          <CustomTextArea placeholder={placeHolder} valueOut={contactMessage} handleChangeOut={setContactMessage} />
          <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Envoyé"} handleClick={() => contactAcracy(contactMessage, interview)} loading={contactLoading} />
        </Grid>
      </Dialog>
  );
};

export default ContactModale;
