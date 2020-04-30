import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomSnackBar from "../../components/SnackBar";

export default {
  title: 'Components|SnackBar',
  component: CustomSnackBar
};

export const withDefault = () => (
  ProviderWrapper(
      <CustomSnackBar open={true} message={"Ceci est une SnackBar"} />
  )
);

