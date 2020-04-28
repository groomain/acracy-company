import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomTextField, { CustomPasswordField } from "../../components/CustomTextField";

export default {
  title: 'Components|TextField',
  component: CustomTextField,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true },
    ]
  },
};

export const withDefault = () => (
  ProviderWrapper(
    <CustomTextField label="Email" placeholder="Votre email" />
  )
);

export const withErrorMessage = () => (
  ProviderWrapper(
    <CustomTextField label="Email" placeholder="Votre email" error helperText="Veuillez entrer votre adresse email" />
  )
);

export const withPassword = () => (
  ProviderWrapper(
    <CustomPasswordField label="Mot de passe" placeholder="Votre mot de passe" />
  )
);
