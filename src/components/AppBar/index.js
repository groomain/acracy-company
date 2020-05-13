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
import notifIcon from '../../assets/icons/notificication-passive.svg'
import CustomIconButton from "../IconButton";
import { useLocation, withRouter } from "react-router";
import clsx from "clsx";
import MenuBoutonIcon from "../Menu";

export const CustomAppBar = (props) => {
    let location = useLocation();
    const { t } = useTranslation();
    const classes = styles();

    const isAuthenticated = useSelector(state => state.getIn(['app', 'isAuthenticated']), null);

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
                        <MenuBoutonIcon />

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
    }

    return (
        <AppBar position="fixed" className={classes.appbar}>
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
