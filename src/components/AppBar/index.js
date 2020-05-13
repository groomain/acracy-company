import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../Button";
import CustomNavLink from "../CustomNavLink";
import { useSelector } from "react-redux";
import profilIcon from '../../assets/icons/profil-roll-out.svg'
import CustomIconButton from "../IconButton";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {Collapse} from "@material-ui/core";

export const CustomAppBar = (props) => {
    let location = useLocation();
    const { t } = useTranslation();
    const classes = styles();
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => setOpen(false), 5000)
    };

    const renderButtons = () => {
        switch (props.path || location.pathname) {
            case '/login':
                return (
                    <div className={clsx(classes.div, classes.login)}>
                        <CustomButton theme={"filledButton"} title={t('signUp')} />
                        <CustomButton title={t('contactUs')} />
                    </div>
                );
            case '/signup':
                return (
                    <div className={clsx(classes.div, classes.signup)}>
                        <CustomNavLink to={'/login'} text={t('login')} />
                        <CustomButton title={t('contactUs')} />
                    </div>
                );
            case '/home':
                return (
                    <div className={clsx(classes.div, classes.home)}>
                        <CustomButton theme={"filledButton"} title={"Nouveau brief"} />
                        <CustomIconButton icon={profilIcon} />
                    </div>
                );
            case '/password':
                return (
                    <div className={clsx(classes.div, classes.password)}>
                        <CustomNavLink to={'/login'} text={t('login')} />
                        <CustomButton theme={"filledButton"} title={t('signUp')} />
                        <CustomButton title={t('contactUs')} />
                    </div>
                );
            default:
                break;
        }
    };

    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Collapse in={open}>
            <div className={classes.snackbar}>
                <Typography className={classes.typo}>Test de snackbar</Typography>
                <IconButton size="small" className={classes.iconButton} aria-label="close" color="secondary.medium" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
            </Collapse>
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.title} variant="h1" noWrap>
                    acracy
            </Typography>
                <div className={classes.grow} />
                {renderButtons()}
            </Toolbar>
        </AppBar>
    );
};
export default withRouter(CustomAppBar);
