import React from 'react';
import Grid from '@material-ui/core/Grid';

const Main = ({ children }) => {
    return (
        <Grid item xs={7} container>
            <Grid item xs={3}></Grid>
            <Grid item xs={7} >
                {children}
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
};

export default Main;
