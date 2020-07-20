import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import styles from './styles';

const Tip = ({ title, subtitle, description, linkTitle, Url }) => {
  const classes = styles();

  return (
    <Grid
      container
      direction='column'
      className={classes.root}
    >
      <Typography variant='subtitle1' >{title}</Typography>
      <Typography variant='subtitle2' className={classes.subtitle}>{subtitle}</Typography>
      <Typography variant='body1' className={classes.description}>{description}</Typography>

      {Url &&
        <Box>
          <span role="img" aria-label="pointe du doigt">👉</span>&nbsp;<a href={Url} target="_blank" className={classes.link}>{linkTitle}</a>
        </Box>}
    </Grid>
  );
};

export default Tip;