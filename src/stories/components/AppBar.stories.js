import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomAppBar from "../../components/AppBar";

export default {
  title: 'Components|AppBar',
  component: CustomAppBar,
};

export const withLogin = () => (
  ProviderWrapper(
    <CustomAppBar path={"/login"} />
  )
);

export const withSignUp = () => (
  ProviderWrapper(
    <CustomAppBar path={"/createAccount"} />
  )
);

export const withHome = () => (
  ProviderWrapper(
    <CustomAppBar path={"/home"} />
  )
);

export const withForgotPassword = () => (
  ProviderWrapper(
    <CustomAppBar path={"/forgotPassword"} />
  )
);

