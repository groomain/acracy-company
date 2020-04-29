import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomIconButton from "../../components/IconButton";
import profilIcon from '../../assets/icons/profil-roll-out.svg'

export default {
  title: 'Components|IconButton',
  component: CustomIconButton
};

export const withDefault = () => (
  ProviderWrapper(
      <CustomIconButton icon={profilIcon}/>
  )
);

