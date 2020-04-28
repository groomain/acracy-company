import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../utils/styles';

const Sidebar = ({ children }) => {
    const classes = styles();

    return (
        <Grid item xs={5} className={classes.sidebarDiv}>

            {children}
        </Grid>
    );
};

export default Sidebar;