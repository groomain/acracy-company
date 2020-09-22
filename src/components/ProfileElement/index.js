import React from 'react';
import langues from '../../assets/icons/langues.svg';
import sensibilite from '../../assets/icons/sensibilite.svg';
import seniorite from '../../assets/icons/seniorite.svg';
import { Grid, Typography } from '@material-ui/core';
import styles from './styles';
import clsx from "clsx";
// Format
import { formatLanguagesValues } from '../../utils/services/format';

const ProfileElement = ({ category, items, modeMission }) => {
  const classes = styles();

  const renderItems = () => {
    switch (category) {
      case 'Sensibilité':
        return {
          icon: <img src={sensibilite} alt="Sensibilité" />,
          list: items?.map((item, key) => `${item?.sensitivity?.text} ${key + 1 !== items.length ? ' ; ' : ''}`)
        }
      case 'Langues':
        return {
          icon: <img src={langues} alt="Langues" />,
          list: items?.map((item, key) => `${formatLanguagesValues(item)} ${key + 1 !== items.length ? ' ; ' : ''}`)
        }
      case 'Séniorité':
        return {
          icon: <img src={seniorite} alt="Séniorité" />,
          list: items
        }
      default:
    };
  }

  return (
    <Grid container className={classes.root}>
      <Grid item container xs={3}>
        {renderItems().icon}
      </Grid>
      <Grid item xs={9} container direction='column' className={clsx(classes.text, { [classes.textSmallSize]: modeMission })}>
        <Grid item>
          <Typography variant='h4'>{category}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2' className={clsx({ [classes.smallSize]: modeMission })}>
            {renderItems().list}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileElement;
