import React from 'react';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import styles from './styles';
import CustomTab from "./CustomTab";

const GeneralInformation = ({ ...props }) => {
  const classes = styles();
  const [value, setValue] = React.useState(2);
  const test = true;

  const { missingInfosForm1, missingInfosForm2, missingInfosForm3, missingInfosForm4, missingInfosForm5 } = useSelector(state => ({
    missingInfosForm1: state.getIn(['Administrative', 'missingInfosForm1']),
    missingInfosForm2: state.getIn(['Administrative', 'missingInfosForm2']),
    missingInfosForm3: state.getIn(['Administrative', 'missingInfosForm3']),
    missingInfosForm4: state.getIn(['Administrative', 'missingInfosForm4']),
    missingInfosForm5: state.getIn(['Administrative', 'missingInfosForm5']),
  }));

  return (
    <Grid container className={classes.container} justify={'center'} {...props}>
      <Typography variant="body2" className={classes.title}>
        L'administratif
      </Typography>
      <Tabs
        orientation="vertical"
        value={value}
        variant="scrollable"
        indicatorColor="primary"
        classes={{ indicator: classes.indicator }}
      >
        <div className={classes.indicatorShadow} />
        <Typography variant="body2" className={classes.secondaryTitle}>Données de l'entreprise</Typography>
        <CustomTab label={'Informations générales'} missingInfos={missingInfosForm1} to={2} setActive={setValue} selected={value === 2} />
        <CustomTab label={'Siège social'} missingInfos={missingInfosForm2} to={'3'} setActive={setValue} selected={value === 3} />
        <CustomTab label={'Documents légaux'} // missingInfos={test} 
          to={'4'} setActive={setValue} selected={value === 4} />
        <Typography variant="body2" className={classes.secondaryTitle}>Facturation</Typography>
        <CustomTab label={'Adresse de facturation'} missingInfos={missingInfosForm3} to={'6'} setActive={setValue} selected={value === 6} />
        <CustomTab label={'Reponsable de facturation'} missingInfos={missingInfosForm4} to={'7'} setActive={setValue} selected={value === 7} />
        <CustomTab label={'Détails facturation'} missingInfos={missingInfosForm5} to={'8'} setActive={setValue} selected={value === 8} />
      </Tabs>
    </Grid>
  );
};

export default GeneralInformation;
