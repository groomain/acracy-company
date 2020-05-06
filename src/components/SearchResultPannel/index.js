import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import CustomIconButton from '../IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from '../../utils/styles';

const SearchResultPannel = (props) => {
    const classes = styles();
    const logos = [{ src: AddCircleOutlineIcon }, { src: AddCircleOutlineIcon }, { src: AddCircleOutlineIcon }, { src: AddCircleOutlineIcon }, { src: AddCircleOutlineIcon }, { src: AddCircleOutlineIcon }];

    const searchedTerms = "Social Media Strategist";

    return (
        <Grid container direction="column"
            justify="center"
        >
            <Grid item>
                <Typography className={classes.title}>
                    Votre recherche a bien été sauvegardée
                </Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.searchedTerms}>
                    <SearchIcon />{searchedTerms}
                </Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.title}>
                    Ils collaborent déjà avec nous
                </Typography>
            </Grid>
            <br />
            <Grid item>
                <Grid container>
                    {logos.map((logo, i) => {
                        return (
                            < Grid key={i} item xs={4} >
                                <CustomIconButton icon={logo.src} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid >
    );
}

export default SearchResultPannel;