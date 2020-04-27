import React from 'react';
import MyAccount from '../../pages/MyAccount';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages'
};
export const myAccount = () => (
  ProviderWrapper(<MyAccount state="my_account" />)
);
