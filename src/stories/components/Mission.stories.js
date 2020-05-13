import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Mission from "../../components/Mission";

export default {
  title: 'Components|Mission',
  component: Mission,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true }
    ]
  },
};

export const withLogin = () => (
  ProviderWrapper(
      <Mission/>
  )
);
