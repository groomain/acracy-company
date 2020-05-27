import React from 'react';
import langues from '../../assets/icons/langues.svg';
import sensibilite from '../../assets/icons/sensibilite.svg';
import seniorite from '../../assets/icons/seniorite.svg';
import { Grid, Typography } from '@material-ui/core';
import styles from './styles';
import clsx from "clsx";

const ProfileElement = ({ category, item1, item2, modeMission }) => {
  const classes = styles();

  const renderIcon = () => {
    switch (category) {
      case 'Sensibilité':
        return <img src={sensibilite} alt="Sensibilité" />
      case 'Langues':
        return <img src={langues} alt="Langues" />
      case 'Séniorité':
        return <img src={seniorite} alt="Séniorité" />
      default:
    };
  }

  return (
    <Grid container className={classes.root}>
      <Grid item container xs={3}>
        {renderIcon()}
      </Grid>
      <Grid item xs={9} container direction='column' className={clsx(classes.text, {[classes.textSmallSize]: modeMission})}>
        <Grid item>
          <Typography variant='h4'>{category}</Typography>
        </Grid>
        <Grid item>
          <Typography vrariant='body2' className={clsx({[classes.smallSize]: modeMission})}>
            {item1}
            {item2 && ` ; ${item2}`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileElement;
