import React from 'react';
import { HomePage } from '../../pages/HomePage/';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
  component: HomePage
};

export const homepage = () => (
  ProviderWrapper(<HomePage state="homepage" />)
);
