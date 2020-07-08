import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Mission from "../../components/Missions/Mission";
import ProfilMenu from "../../components/ProfilMenu";

export default {
  title: 'Components|ProfilMenu',
  component: ProfilMenu,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true }
    ]
  },
};

export const withdefault = () => (
  ProviderWrapper(
    <ProfilMenu />
  )
);
