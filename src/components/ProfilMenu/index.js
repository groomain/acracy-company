import React from 'react';
import styles from './styles';
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import ProfilIcon from "../../assets/icons/ProfilIcon";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { DecoIcon } from "../../assets/icons/DecoIcon";
import { ContactIcon } from "../../assets/icons/ContactIcon";
import { AdministratifIcon } from "../../assets/icons/AdministratifIcon";
import profilIcon from "../../assets/icons/profil-roll-out.svg";
import CustomIconButton from "../IconButton";
import ContactModale from "../ContactModale";
import { logoutLaunched } from "../App/reducer";
import { useDispatch } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

export const ProfilMenu = () => {
  const { t } = useTranslation();
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [hovered1, setOvered1] = React.useState(false);
  const [hovered2, setOvered2] = React.useState(false);
  const [hovered3, setOvered3] = React.useState(false);
  const [hovered4, setOvered4] = React.useState(false);
  const [hovered6, setOvered6] = React.useState(false);
  const [contactOpen, setContactModaleOpen] = React.useState(false);
  const dispatch = useDispatch();

  const logout = (payload) => {
    dispatch(logoutLaunched(payload));
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{ list: classes.list, paper: classes.paper }}
    >
      <Grid container item className={classes.container} direction={'column'} justify={'center'}>
        <Grid item container direction={'row'} justify={"flex-end"}>
          <CloseIcon hovered={hovered6} className={classes.closeIcon} onClick={handleMenuClose}
            onMouseEnter={() => setOvered6(true)}
            onMouseLeave={() => setOvered6(false)} />
        </Grid>
        <Grid item container direction={'row'} className={classes.row}>
          <NavLink className={classes.navLink} to={'/myProfile'}
            onMouseEnter={() => setOvered1(true)}
            onMouseLeave={() => setOvered1(false)}>
            <ProfilIcon hovered={hovered1} />
            {t('profilMenu.profil')}
          </NavLink>
        </Grid>
        <Grid item container direction={'row'} className={classes.row}>
          <NavLink className={classes.navLink} to={'/administrative'}
            onMouseEnter={() => setOvered2(true)}
            onMouseLeave={() => setOvered2(false)}>
            <AdministratifIcon hovered={hovered2} className={classes.icon} />
            {t('profilMenu.admin')}
                    </NavLink>
        </Grid>
        <Grid item container direction={'row'} className={classes.row}>
          <Typography className={classes.navLink} onClick={() => setContactModaleOpen(!contactOpen)}
            onMouseEnter={() => setOvered3(true)}
            onMouseLeave={() => setOvered3(false)}>
            <ContactIcon hovered={hovered3} className={classes.icon} />
            {t('profilMenu.contact')}
          </Typography>
        </Grid>
        <Grid item container direction={'row'} className={classes.row}>
          <Typography className={classes.navLink} onClick={() => logout()}
            onMouseEnter={() => setOvered4(true)}
            onMouseLeave={() => setOvered4(false)}>
            <DecoIcon hovered={hovered4} className={classes.icon} />
            {t('profilMenu.logout')}
                    </Typography>
        </Grid>
      </Grid>
    </Menu>
  );

  return (
    <div>
      <CustomIconButton
        icon={profilIcon}
        edge="end"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
      />
      {anchorEl && renderMenu}
      <ContactModale open={contactOpen} setOpen={setContactModaleOpen} interview={false} title="Contacter acracy" placeHolder="Donnez nous plus de détails" subtitle="Afin de pouvoir au mieux vous répondre, merci de préciser la raison de votre prise de contact." />
    </div>
  )
};

export default ProfilMenu;
