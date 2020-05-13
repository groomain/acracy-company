import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import {Collapse} from "@material-ui/core";
import clsx from "clsx";

export const CustomSnackBar = ({message, open, setOpen, error, ...props}) => {
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
            <div className={clsx(classes.snackbar, {[classes.redSnack] : error})}>
                <Typography className={classes.typo}>{message}</Typography>
                <IconButton size="small" className={classes.iconButton} aria-label="close" color="secondary.medium" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Collapse>
    );
};

export default CustomSnackBar;
