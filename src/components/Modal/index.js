import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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