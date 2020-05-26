import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../../assets/icons/searchIcon';
import CircleImage from '../CircleImage';
import styles from './styles';

const SearchResultPannel = ({ searchValue, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  const logos = ['', '', '', '', '', ''];

  // const queryString = windows.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const searchType = urlParams.get('searchType');
  // const searchValue = urlParams.get('searchValue'); 
  //   

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
              <SearchIcon color='#ecf805' className={classes.searchIcon} />
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
      <Grid container className={classes.iconContainer}>
        {logos.map((logo, i) => {
          return (
            <Grid key={i} item xs={4} >
              <CircleImage theme='partner' alt='partner' />
            </Grid>
          )
        })}
      </Grid>
    </Grid >
  );
}

export default SearchResultPannel;