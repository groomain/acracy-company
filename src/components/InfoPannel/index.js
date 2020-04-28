import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@material-ui/core/Icon';
import styles from '../../utils/styles';

const InfoPannel = (props) => {
    const classes = styles();
    const logos = [{ src: 'add_circle' }, { src: 'add_circle' }, { src: 'add_circle' }, { src: 'add_circle' }, { src: 'add_circle' }, { src: 'add_circle' }];

    const searchedTerms = "Social Media Strategist";

    return (
        <Grid container direction="column"
            justify="center" alignItems="center"
        >
            <Typography className={classes.title}>
                Votre recherche a bien été sauvegardée
            </Typography>
            <Typography className={classes.searchedTerms}>
                <SearchIcon />{searchedTerms}
            </Typography>
            <Typography className={classes.title}>
                Ils collaborent déjà avec nous
            </Typography>
            <br />
            <Grid container>
                {logos.map((logo, i) => {
                    return (
                        < Grid key={i} item xs={4} >
                            <Icon>{logo.src} </Icon>
                        </Grid>
                    )
                })}
            </Grid>

        </Grid >
    );
}

export default InfoPannel;