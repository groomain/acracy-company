import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomAppBar from "../../components/AppBar";

export default {
  title: 'Components|AppBar',
  component: CustomAppBar
};

export const withDefault = () => (
  ProviderWrapper(
      <CustomAppBar/>
  )
);

