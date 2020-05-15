import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import MissionSuivi from "../../components/MissionSuivi";
import CustomButton from "../../components/Button";

export default {
  title: 'Components|MissionSuivi',
  component: MissionSuivi
};

export const WithDefault = () => {
    const [step, setStep] = React.useState(0);
    return (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
        <MissionSuivi step={step}/>
        <CustomButton title={"PreviousStep"} handleClick={() => step !== 0 && setStep(step - 1)}/>
        <CustomButton title={"NextStep"} handleClick={() => step !== 5 && setStep(step + 1)}/>
    </div>
  )
)};
