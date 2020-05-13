import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomModal from '../../components/Modal';

export default {
  title: 'Components|Modal',
  component: CustomModal
};

export const WithDefault = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <CustomModal
        title='Validez vos informations entreprise'
        open="true"
      />
    </div>
  )
);