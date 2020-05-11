import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import ProgressBar from "../../components/ProgressBar";
import CustomButton from "../../components/Button";

export default {
  title: 'Components|ProgressBar',
  component: ProgressBar
};

export const withDefault = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
    } else {
      return null
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > -1) {
      setActiveStep(activeStep - 1)
    } else {
      return null
    }
  };

  return (
    ProviderWrapper(
      <div>
        <ProgressBar step={activeStep} />
        <CustomButton title={"Previous Step"} handleClick={() => handlePreviousStep()} />
        <CustomButton title={"Next Step"} handleClick={() => handleNextStep()} />
      </div>
    )
  )
};

