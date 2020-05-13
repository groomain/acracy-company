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
        // text='Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        // buttonTitle=''
        open="true"

      />
    </div>

  )
);