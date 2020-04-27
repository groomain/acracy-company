import React from 'react';
import { FirstLoginPage } from '../../pages/FirstLogin/';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
  component: FirstLoginPage
};

export const FirstLogin = () => (
  ProviderWrapper(<FirstLoginPage state="first_login" />)
);
