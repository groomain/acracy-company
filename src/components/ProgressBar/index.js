import React from 'react';
import styles from './styles'
import { useSelector } from "react-redux";

// utiliser les actions handleCurrentStep de l'App reducer pour faire évoluer la bar

const getWidth = (activeStep) => {
  switch (activeStep) {
    case 0:
      return { width: "0%" };
    case 1:
      return { width: "15%" };
    case 2:
      return { width: "45%" };
    case 3:
      return { width: "58.33%" }; // => 100% of the left panel
    case 4:
      return { width: "100%" }; // not used for now
    default:
      return { width: "0%" };
  }
};

export const ProgressBar = ({ step }) => {
  const activeStep = useSelector(state => state.getIn(['app', 'activeStep']), null);

  const classes = styles(getWidth(step ? step : activeStep));
  return (
    <div className={classes.progressBar} />
  );
};

export default ProgressBar;
