import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import styles from './style';
import CustomTab from "./CustomTab";

const GeneralInformation = ({...props}) => {
    const classes = styles();
    const [value, setValue] = React.useState(2);
    const test = true;

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
                classes={{indicator: classes.indicator}}
            >
                <div className={classes.indicatorShadow}/>
                <Typography variant="body2" className={classes.secondaryTitle}>Données de l'entreprise</Typography>
                <CustomTab label={'Informations générales'} missingInfos={test} to={2} setActive={setValue}/>
                <CustomTab label={'Siège social'} missingInfos={test} to={3} setActive={setValue}/>
                <CustomTab label={'Documents légaux'} missingInfos={test} to={4} setActive={setValue}/>
                <Typography variant="body2" className={classes.secondaryTitle}>Facturation</Typography>
                <CustomTab label={'Adresse de facturation'} missingInfos={test} to={6} setActive={setValue}/>
                <CustomTab label={'Reponsable de facturation'} missingInfos={!test} to={7} setActive={setValue}/>
                <CustomTab label={'Détails facturation'} missingInfos={!test} to={8} setActive={setValue}/>
            </Tabs>
        </Grid>
    );
};

export default GeneralInformation;
