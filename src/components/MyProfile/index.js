import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import styles from './styles';
import CustomTab from "./CustomTab";

const MyProfileInformation = ({ ...props }) => {
  const classes = styles();
  const [value, setValue] = React.useState(1);

  return (
    <Grid className={classes.container} {...props}>
      <Typography variant="body2" className={classes.title}>
        Mon profil
      </Typography>
      <Tabs
        orientation="vertical"
        value={value}
        variant="scrollable"
        indicatorColor="primary"
        classes={{ indicator: classes.indicator }}
      >
        <div className={classes.indicatorShadow} />
        <CustomTab label={'Informations personnelles'} to={1} setActive={setValue} selected={value === 1} />
        <CustomTab label={'Mot de passe'} to={2} setActive={setValue} selected={value === 2} />
      </Tabs>
    </Grid>
  );
};

export default MyProfileInformation;