import React from 'react';
import SignUpPage from '../../pages/SignUp';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
  component: SignUpPage
};

export const SignUp = () => (
  ProviderWrapper(<SignUpPage state="signup" />)
);
