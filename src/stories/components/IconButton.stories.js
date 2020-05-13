import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomIconButton from "../../components/IconButton";
import profilIcon from '../../assets/icons/profil-roll-out.svg';
import eyeOpened from '../../assets/icons/eye-opened.svg';
import eyeClosed from '../../assets/icons/eye-closed.svg';

export default {
  title: 'Components|IconButton',
  component: CustomIconButton
};

export const withDefault = () => (
  ProviderWrapper(
    <CustomIconButton icon={profilIcon} />
  )
);

export const withEyeOpened = () => (
  ProviderWrapper(
    <CustomIconButton icon={eyeOpened} />
  )
);

export const withEyeClosed = () => (
  ProviderWrapper(
    <CustomIconButton icon={eyeClosed} />
  )
);
