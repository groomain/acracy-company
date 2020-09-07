import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import CustomTextArea from '../Inputs/CustomTextArea';
import CustomButton from '../Button';
import { contactAcracyLaunched } from './reducer';
import CustomSelect from '../Inputs/CustomSelect';

const ContactModale = ({
  open, setOpen, interview, title, placeHolder, subtitle, ...props
}) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { contactLoading } = useSelector(state => ({
    contactLoading: state.getIn(['Contact', 'contactLoading']),
  }));

  // Handle panels expansion individually
  const [contactMessage, setContactMessage] = useState('');
  const [contactSelect, setContactSelect] = useState('Sélectionner raison');

  const contactAcracy = (message, reason, interview) => {
    dispatch(contactAcracyLaunched({ message, reason, interview }));
    handleContactOpen();
    setContactMessage('');
    setContactSelect('');
  };

  const handleContactOpen = () => {
    setOpen(!open);
  };

  const reasons = ['Sélectionner raison', 'Question sur un brief', 'Question/remarque sur une mission', 'Question sur mon profil / l’administratif', 'Question sur une facture', 'Un souci ou une remarque sur le site', 'Déclarer votre amour', 'Autre chose'];

  return (
    <Dialog open={open} onClose={handleContactOpen} classes={{ paper: classes.modale }} {...props}>
      <Grid item container direction="column" justify="center" className={classes.modaleContainer}>
        <IconButton aria-label="close" className={classes.iconButton} onClick={handleContactOpen}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h1">{title}</Typography>
        {subtitle && <Typography variant="body1" style={{ marginTop: 8 }}>{subtitle}</Typography>}
        <div style={{ marginTop: 24 }} />
        <CustomSelect placeholder="Sélectionner raison" label="Raison*" optionsValues={reasons} value={contactSelect} handleChangeOut={setContactSelect} withDisabledValue />
        <CustomTextArea placeholder={placeHolder} valueOut={contactMessage} handleChangeOut={setContactMessage} />
        <CustomButton theme="filledButton" style={{ width: 122 }} title="Envoyer"
          disabled={contactSelect === reasons[0]}
          handleClick={() => contactAcracy(contactMessage, contactSelect, interview)} loading={contactLoading} />
      </Grid>
    </Dialog>
  );
};

export default ContactModale;
