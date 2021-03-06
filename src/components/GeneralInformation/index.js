import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import styles from './styles';
import CustomTab from "./CustomTab";
import {openSnackBar} from "../App/reducer";

const GeneralInformation = ({ ...props }) => {
  const classes = styles();
  const [value, setValue] = React.useState(2);
  const dispatch = useDispatch();

  const { missingInfosForm1, missingInfosForm2, missingInfosForm3, missingInfosForm4, missingInfosForm5, missingFilesForm } = useSelector(state => ({
    missingInfosForm1: state.getIn(['Administrative', 'missingInfosForm1']),
    missingInfosForm2: state.getIn(['Administrative', 'missingInfosForm2']),
    missingInfosForm3: state.getIn(['Administrative', 'missingInfosForm3']),
    missingInfosForm4: state.getIn(['Administrative', 'missingInfosForm4']),
    missingInfosForm5: state.getIn(['Administrative', 'missingInfosForm5']),
    missingFilesForm: state.getIn(['Administrative', 'missingFilesForm']),
  }));

  useEffect(() => {
    if (missingInfosForm1 === false || missingInfosForm2 === false || missingInfosForm3 === false || missingInfosForm4 === false || missingInfosForm5 === false || missingFilesForm === false) {
      dispatch(openSnackBar({ message: 'Avant d\'aller plus loin, nous avons besoin des informations administratives sur votre entreprise.' , error: false }));
    }
  }, [dispatch]);

  return (
    <Grid className={classes.container} justify={'center'} {...props}>
      <Typography className={classes.primaryTitle} variant="h1" component="span">
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
        <CustomTab label={'Siège social'} missingInfos={missingInfosForm2} to={3} setActive={setValue} selected={value === 3} />
        <CustomTab label={'Documents légaux'}  missingInfos={missingFilesForm} to={4} setActive={setValue} selected={value === 4} />
        <Typography variant="body2" className={classes.secondaryTitle}>Facturation</Typography>
        <CustomTab label={'Adresse de facturation'} missingInfos={missingInfosForm3} to={6} setActive={setValue} selected={value === 6} />
        <CustomTab label={'Reponsable de facturation'} missingInfos={missingInfosForm4} to={7} setActive={setValue} selected={value === 7} />
        <CustomTab label={'Détails facturation'} missingInfos={missingInfosForm5} to={8} setActive={setValue} selected={value === 8} />
      </Tabs>
    </Grid>
  );
};

export default GeneralInformation;
