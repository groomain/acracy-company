import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import { CustomButton } from '../../components/Button/';

export default {
  title: 'Components|Button',
  component: CustomButton,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#26a69a', default: true },
      { name: 'light-theme', value: '#f5f5f5', default: true },
    ]
  },
};

export const withDefault = () => (
  ProviderWrapper(
    <>
      <h4>Change Storybook's background color to see the colored theme button color</h4>
      <CustomButton variant="outlined" color="secondary" title="Envoyer" />
    </>
  )
);

export const withLightBackground = () => (
  ProviderWrapper(
    <>
      <h4>Change Storybook's background color to see the light theme button color</h4>
      <CustomButton variant="outlined" color="primary" title="Envoyer" />
    </>
  )
);

export const withLoading = () => (
  ProviderWrapper(
    <CustomButton variant="outlined" color="primary" loading />
  )
);
