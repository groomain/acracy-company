import React from 'react';
import SignInPage from '../../pages/SignIn';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
};
export const signin = () => (
  ProviderWrapper(<SignInPage state="signin" />)
);
