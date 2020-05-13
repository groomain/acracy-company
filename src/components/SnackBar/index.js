import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import {Collapse} from "@material-ui/core";

export const CustomSnackBar = ({message, open, setOpen, ...props}) => {
    const classes = styles();

    const handleClose = () => {
        setOpen( false);
    };

    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => setOpen(false), 5000)
    };

    return (
        <Collapse in={open}>
            <div className={classes.snackbar}>
                <Typography className={classes.typo}>{message}</Typography>
                <IconButton size="small" className={classes.iconButton} aria-label="close" color="secondary.medium" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Collapse>
    );
};

export default CustomSnackBar;
