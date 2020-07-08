import React from 'react';
import SignUpPage from '../../pages/SignUp';
import CustomAppBar from '../../components/AppBar'
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
  component: SignUpPage
};

export const SignUp = () => (
  ProviderWrapper(
    <>
      <CustomAppBar path="/createAccount"></CustomAppBar>
      <SignUpPage state="signup"
      />
    </>)
);
