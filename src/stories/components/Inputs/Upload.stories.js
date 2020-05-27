import React from 'react';
import ProviderWrapper from '../../../utils/Provider';
import Upload from '../../../components/Inputs/Upload';

export default {
  title: 'Components|Inputs'
};

const styles = {
  padding: '3rem'
}

export const upload = () => (
  ProviderWrapper(
    <div style={styles}>
      <Upload />
    </div>
  )
);
