import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './style';
import retard from '../../assets/icons/retard2.svg';
import chevronOk from '../../assets/icons/small-check-copy-2.svg';

const GeneralInformation = ({ children, justify, ...props }) => {
  const classes = styles();
  const [value, setValue] = React.useState(null);
  const test = true;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getIcon = (isOk) => {
    if (isOk) {
      return <img alt="chevronOK" src={chevronOk} style={{ position: 'absolute', right: -10 }}/>
    } else {
      return <img alt="retard" src={retard} style={{ position: 'absolute', right: -10 }}/>
    }
  };

  return (

      <Grid container className={classes.container} justify={'center'}>
          <Typography variant="body2" className={classes.title}>
            L'administratif
          </Typography>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            variant="scrollable"
            className={classes.tabs}
            indicatorColor="primary"
            classes={{ indicator: classes.indicator, labelIcon: classes.labelIcon }}
          >
            <div className={classes.indicatorShadow} />
            <Typography variant="body2" className={classes.secondaryTitle}>
              Données de l'entreprise
            </Typography>
            <Tab className={classes.underSecondaryTitle} variant="body2" label="Informations générales" icon={getIcon(test)}
                 classes={{ wrapper: classes.wrapper, labelIcon: classes.labelIcon, selected: classes.selected }}/>
            <Tab className={classes.underSecondaryTitle} variant="body2" label="Siège social" icon={getIcon(test)}
                 classes={{ wrapper: classes.wrapper, labelIcon: classes.labelIcon, selected: classes.selected }}/>
                 <Tab className={classes.underSecondaryTitle} variant="body2" label="Documents légaux" icon={getIcon(test)}
                 classes={{ root: classes.root, wrapper: classes.wrapper, labelIcon: classes.labelIcon, selected: classes.selected }}/>
            <Typography variant="body2" className={classes.secondaryTitle}>
              Facturation
            </Typography>
            <Tab className={classes.underSecondaryTitle} variant="body2" label={'Adresse de facturation'} icon={getIcon(test)}
                 classes={{ wrapper: classes.wrapper, labelIcon: classes.labelIcon, selected: classes.selected }}/>
            <Tab className={classes.underSecondaryTitle} variant="body2" label="Reponsable de facturation" icon={getIcon(test)}
                 classes={{ wrapper: classes.wrapper, labelIcon: classes.labelIcon, selected: classes.selected }}/>
            <Tab className={classes.underSecondaryTitle} variant="body2" label="Détails facturation" icon={getIcon(!test)}
                 classes={{ wrapper: classes.wrapper, labelIcon: classes.labelIcon, selected: classes.selected }}/>
          </Tabs>
    </Grid>
  );
};

export default GeneralInformation;
