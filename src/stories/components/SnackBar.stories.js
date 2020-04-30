import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomSnackBar from "../../components/SnackBar";

export default {
  title: 'Components|SnackBar',
  component: CustomSnackBar,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true }
    ]
  },
};

export const withDefault = () => (
  ProviderWrapper(
      <CustomSnackBar open={true} message={"Ceci est une SnackBar"} />
  )
);

