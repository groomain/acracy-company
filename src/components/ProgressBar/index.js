import React from 'react';
import styles from './styles'
import {useSelector} from "react-redux";

// utiliser les actions handleNextStep et handlePreviousStep de l'App reducer avec l'activeStep en props  pour faire évoluer la bar

const getWidth = (activeStep) => {
    switch (activeStep) {
        case 0:
            return {width : "0%"};
        case 1:
            return {width : "25%"};
        case 2:
            return {width : "75%"};
        case 3:
            return {width : "100%"};
        default:
            return {width : "0%"};
    }
};

export const ProgressBar = () => {
    const activeStep = useSelector(state => state.getIn(['app', 'activeStep']), null);

    const classes = styles(getWidth(activeStep));
    return (
        <div className={classes.progressBar}/>
    );
};

export default ProgressBar;
