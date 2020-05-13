import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
      <MuiDialogTitle id="max-width-dialog-title" className={classes.dialog}>
        <IconButton aria-label="close" className={classes.iconButton} onClick={handleClose}>
          <CloseIcon className={classes.iconLabel} />
        </IconButton>
        <br />
        <Typography variant='h1'>
          {title}
        </Typography>
      </MuiDialogTitle>
      {children}
    </Dialog >
  );
}

export default CustomModal;