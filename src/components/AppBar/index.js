import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../Button";
import CustomNavLink from "../CustomNavLink";
import profilIcon from '../../assets/icons/profil-roll-out.svg'
import CustomIconButton from "../IconButton";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import CustomSnackBar from "../SnackBar";
import MenuBoutonIcon from "../ProfilMenu";

export const CustomAppBar = (props) => {
    let location = useLocation();
    const { t } = useTranslation();
    const classes = styles();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

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
                        <MenuBoutonIcon />
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
            <CustomSnackBar message={"Test de snackBar"} open={open} setOpen={setOpen}/>
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
