import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import { CustomButton } from '../../components/Button/';

export default {
  title: 'Components|Button',
  component: CustomButton,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true }
    ]
  },
};

export const withWhiteTheme = () => (
  ProviderWrapper(
    <CustomButton title="Nous contacter" />
  )
);

export const withGreyTheme = () => (
  ProviderWrapper(
    <CustomButton theme='secondaryButton' title="Sauvegarder et fermer" />
  )
);

export const withColoredBorder = () => (
  ProviderWrapper(
    <CustomButton theme='primaryButton' title="Être rappelé.e." />
  )
);

export const withFilled = () => (
  ProviderWrapper(
    <CustomButton theme='filledButton' title="Finaliser le brief" />
  )
);

export const withDisabledRipple = () => (
  ProviderWrapper(
    <CustomButton theme='filledButton' title="Finaliser le brief" rippleDisabled />
  )
);

export const withLoading = () => (
  ProviderWrapper(
    <CustomButton color="secondary" loading rippleDisabled />
  )
);
