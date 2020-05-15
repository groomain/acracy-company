import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import RevealProfil from "../../components/RevealProfil";

export default {
  title: 'Components|RevealProfil',
  component: RevealProfil,
};

export const withDefault = () => (
  ProviderWrapper(
      <div style={{ margin: '3rem' }}>
      <RevealProfil/>
      </div>
  )
);

