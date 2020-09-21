import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
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
      <Grid item>
        <Box my={'40px'}>
          <Typography variant={"h1"}>
            {t('collaborators')}
          </Typography>
        </Box>
      </Grid>
      <Grid container>
        {logos.map((logo, i) => {
          return (
            <Grid item key={i}>
              <Box mr={'28px'} mb={'28px'}>
                <CircleImage theme='partner' alt='partner' src={logo} icon={'NONO'} />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
};

export default PartnersList;