import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from "./styles";
import {useTranslation} from "react-i18next";
import CustomButton from "../Button";
import CustomNavLink from "../CustomNavLink";
import {useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import profilIcon from '../../assets/icons/profil-roll-out.svg'
import notifIcon from '../../assets/icons/notificication-passive.svg'
import CustomIconButton from "../IconButton";

export const CustomAppBar = () => {
  const { t } = useTranslation();
  const classes = styles();
  const isAuthenticated = useSelector(state => state.getIn(['app', 'isAuthenticated']), null);

  return (
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" noWrap>
              accracy
            </Typography>
            <div className={classes.grow} />
            {isAuthenticated ?
            <div>
            <CustomNavLink to={'/login'} text={"Se Connecter"}/>
            <CustomButton title={"Nous contacter"}/>
            </div>
                :
            <div>
              <CustomButton theme={"filledButton"} title={"Nouveau brief"}/>
              <CustomIconButton icon={profilIcon} />
              <CustomIconButton icon={notifIcon}/>
            </div>
            }
          </Toolbar>
        </AppBar>
  );
};
export default CustomAppBar;
