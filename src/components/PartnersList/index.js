import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import CircleImage from '../CircleImage';

const PartnersList = () => {
  const classes = styles();
  const { t } = useTranslation();

  const logos = ['', '', '', '', '', ''];

  return (
    <>
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
    </>
  )
};

export default PartnersList;