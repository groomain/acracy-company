import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, Typography, Grid, IconButton } from '@material-ui/core/';

import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';

export const CustomModal = ({ open, handleClose, title, text, children, ...props }) => {
  const classes = styles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle id="max-width-dialog-title" >
        <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
          <CloseIcon className={classes.iconLabel} />
        </IconButton>
        <br />
        <Typography variant='h1'>
          {title}
        </Typography>
      </DialogTitle>
      <Grid>{children}</Grid>
    </Dialog>
  );
}

export default CustomModal;