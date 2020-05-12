import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import styles from './styles';
import Typography from '@material-ui/core/Typography';

const SlideTransition = (props) => {
    return <Slide {...props} direction="down"/>;
};

export const CustomSnackBar = ({message, open, setOpen, ...props}) => {
    const classes = styles();

    const handleClose = () => {
        setOpen( false);
    };

    return (
        <Snackbar
            className={classes.root}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            autoHideDuration={5000}
            TransitionComponent={SlideTransition}
            open={open}
            onClose={handleClose}
            children={
                <div className={classes.snackbar}>
                    <Typography className={classes.typo}>{message}</Typography>
                    <IconButton size="small" className={classes.iconButton} aria-label="close" color="secondary.medium" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>}
            {...props}
        />
    );
};

export default CustomSnackBar;
