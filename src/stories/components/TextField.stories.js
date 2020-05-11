import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomTextField, { CustomPasswordField } from "../../components/Inputs/CustomTextField";
import CustomSelect from '../../components/Inputs/CustomSelect';

export default {
  title: 'Components|Inputs',
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

export const withSelect = () => (
  ProviderWrapper(
    <div style={{ width: '200px' }}>
      <CustomSelect label="Numéro de téléphone" optionsValues={optionsValues} />
    </div>
  )
);

const optionsValues = [
  'Fr : +33',
  'Blg : +32',
  'It : +39'
];

export const selectWithMulti = () => (
  ProviderWrapper(
    <div style={{ width: '50%' }}>
      <CustomSelect label="Numéro de téléphone" isMulti optionsValues={optionsValues} />
    </div>
  )
);
