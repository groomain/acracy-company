import React from 'react';
import styles from './styles';
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ProfilIcon from "../../assets/icons/ProfilIcon";
// import {CloseIcon} from "../../assets/icons/CloseIcon";

export const MenuBoutonIcon = (props) => {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [hovered1, setOvered1] = React.useState(false);
    const [hovered2, setOvered2] = React.useState(false);
    const [hovered3, setOvered3] = React.useState(false);
    const [hovered4, setOvered4] = React.useState(false);
    const [hovered6, setOvered6] = React.useState(false);

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
            classes={{list: classes.list, paper: classes.paper}}
        >
            <Grid container item className={classes.container} direction={'column'} justify={'center'}>
                <Grid item container direction={'row'} justify={"flex-end"}>
                    {/*<CloseIcon hovered={hovered6} className={classes.closeIcon} onClick={() => props.setOpen(false)}*/}
                    {/*onMouseEnter={() => setOvered6(true)}*/}
                    {/*onMouseLeave={() => setOvered6(false)}/>*/}
                </Grid>
                <Grid item container direction={'row'} className={classes.row}>
                    <NavLink className={classes.navLink} to={'/'}
                             onMouseEnter={() => setOvered1(true)}
                             onMouseLeave={() => setOvered1(false)}>
                        <ProfilIcon hovered={hovered1}/>
                        Déclarer un incident
                    </NavLink>
                </Grid>
                <Grid item container direction={'row'} className={classes.row}>
                    <NavLink className={classes.navLink} to={'/'}
                             onMouseEnter={() => setOvered2(true)}
                             onMouseLeave={() => setOvered2(false)}>
                        {/*<AdresseIcon hovered={hovered2} className={classes.icon}/>*/}
                        Voir coordonées freelence
                    </NavLink>
                </Grid>
                <Grid item container direction={'row'} className={classes.row}>
                    <NavLink className={classes.navLink} to={'/'}
                             onMouseEnter={() => setOvered3(true)}
                             onMouseLeave={() => setOvered3(false)}>
                        {/*<DownloadIcon hovered={hovered3} className={classes.icon}/>*/}
                        Télécharger facture
                    </NavLink>
                </Grid>
                <Grid item container direction={'row'} className={classes.row}>
                    <NavLink className={classes.navLink} to={'/'}
                             onMouseEnter={() => setOvered4(true)}
                             onMouseLeave={() => setOvered4(false)}>
                        {/*<DownloadIcon hovered={hovered4} className={classes.icon}/>*/}
                        Télécharger facture
                    </NavLink>
                </Grid>
            </Grid>
        </Menu>
    );

    return (
        <div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"           >
                <AccountCircle />
            </IconButton>
            {anchorEl && renderMenu}
        </div>
    )
};

export default MenuBoutonIcon;
