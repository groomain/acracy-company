import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import CircleImage from '../CircleImage';

import publicis from '../../assets/icons/publicis.svg';
import bnp from '../../assets/icons/bnp.svg';
import romance from '../../assets/icons/romance.svg';
import accenture from '../../assets/icons/accenture.svg';
import ledger from '../../assets/icons/ledger.png';
import ratp from '../../assets/icons/ratp.svg';

const PartnersList = () => {
  const classes = styles();
  const { t } = useTranslation();

  const logos = [publicis, bnp, romance, accenture, ledger, ratp];

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
              <CircleImage theme='partner' alt='partner' src={logo} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
};

export default PartnersList;