import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import DarkWrapper from '../../components/Layout/DarkWrapper';

export default {
  title: 'Components|Dark Wrapper',
  component: DarkWrapper
};

const styles = {
  padding: '3rem'
};

export const withDefault = () => (
  ProviderWrapper(
    <div style={styles}>
      <DarkWrapper>
        Ceci est un composant stylisé réutilisable
    </DarkWrapper>
    </div>
  )
);
