import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomAppBar from "../../components/AppBar";

export default {
  title: 'Components|AppBar',
  component: CustomAppBar,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true }
    ]
  },
};

export const withLogin = () => (
  ProviderWrapper(
      <CustomAppBar path={"/login"}/>
  )
);

export const withSignUp = () => (
  ProviderWrapper(
      <CustomAppBar path={"/signup"}/>
  )
);

export const withHome = () => (
  ProviderWrapper(
      <CustomAppBar path={"/home"}/>
  )
);

export const withForgotPassword = () => (
  ProviderWrapper(
      <CustomAppBar path={"/password"}/>
  )
);

