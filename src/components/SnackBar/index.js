import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

export const CustomSnackBar = ({message, open, setOpen, ...props }) => {

  const handleClose = () => {
    setOpen({open: false});
  };

  return (
      <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal:'right'}}
          autoHideDuration={5000}
          open={open}
          onClose={handleClose}
          message={message}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="primary" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
      />
  );
};

export default CustomSnackBar;
