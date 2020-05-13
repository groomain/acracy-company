import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import CustomIconButton from '../IconButton';
import CircleImage from '../CircleImage';
import styles from './styles';

const SearchResultPannel = (props) => {
    const classes = styles();
    const { t } = useTranslation();

    const logos = [{ src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }];

    // const queryString = windows.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const searchType = urlParams.get('searchType');
    // const searchValue = urlParams.get('searchValue'); 
    //                                             =>  TO BE USED INSTEAD OF THE CURRENT VALUE OF {searchValue} 
    const searchValue = 'Social Media Strategist'; /// USED AS A PLACEHOLDER FOR NOW

    return (
        <Grid container direction="column"
            justify='space-between' className={classes.pannel}
        >
            {searchValue && (
                <>
                    <Grid item>
                        <Typography variant={"h1"}>
                            {t('savedResearch')}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.researchGridItem} container>
                        <Grid item>
                            <SearchIcon className={classes.searchIcon} /> &nbsp;
                        </Grid>
                        <Grid item>
                            <Typography variant={"subtitle1"}>
                                {searchValue}
                            </Typography>
                        </Grid>
                    </Grid>
                </>
            )}
            <Grid item className={classes.collaboratorsGridItem}>
                <Typography variant={"h1"}>
                    {t('collaborators')}
                </Typography>
            </Grid>
            <br />
            <Grid item >
                <Grid container className={classes.iconContainer}>
                    {logos.map((logo, i) => {
                        return (
                            < Grid key={i} item xs={4} >
                                <CircleImage theme='partner' alt='partner' />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid container style={{ marginTop: 40 }}>
                    <Grid item xs={2} style={{ height: 2, backgroundColor: '#ecf805' }}></Grid>
                    <Grid item xs={6} style={{ height: 1, backgroundColor: '#565e56' }}></Grid>
                </Grid>
            </Grid>
        </Grid >
    );
}

export default SearchResultPannel;