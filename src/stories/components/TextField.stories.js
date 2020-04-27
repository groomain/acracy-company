import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomTextField, {CustomPasswordField} from "../../components/CustomTextField";

export default {
  title: 'Components|TextField',
  component: CustomTextField,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#26a69a', default: true },
    ]
  },
};

export const withDefault = () => (
  ProviderWrapper(
    <CustomTextField label="Email" />
  )
);

export const withErrorMessage = () => (
  ProviderWrapper(
    <CustomTextField label="Email" error helperText="Veuillez entrer votre adresse email" />
  )
);

export const withPassword = () => (
  ProviderWrapper(
    <CustomPasswordField label={"Mot de passe"}/>
  )
);
